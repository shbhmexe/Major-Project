/**
 * External API Integration Utilities
 * This file contains functions for integrating with external services
 * like VirusTotal, OpenAI, URLVoid, etc.
 */

/**
 * VirusTotal API Integration
 * Scans URLs for malicious content using VirusTotal API
 * @param {string} url - URL to scan
 * @returns {Promise<object>} Scan results
 */
export async function scanUrlWithVirusTotal(url) {
  const apiKey = process.env.VIRUSTOTAL_API_KEY;
  
  if (!apiKey) {
    console.warn('VirusTotal API key not found');
    return { available: false, error: 'API key not configured' };
  }

  try {
    // Submit URL for scanning
    const submitResponse = await fetch('https://www.virustotal.com/vtapi/v2/url/scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'apikey': apiKey,
        'url': url,
      }),
    });

    const submitResult = await submitResponse.json();
    
    if (!submitResult.scan_id) {
      return { available: false, error: 'Failed to submit URL for scanning' };
    }

    // Wait a moment for scan to process (in production, you might want to implement polling)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get scan report
    const reportResponse = await fetch(
      `https://www.virustotal.com/vtapi/v2/url/report?apikey=${apiKey}&resource=${url}`,
      { method: 'GET' }
    );

    const reportResult = await reportResponse.json();

    return {
      available: true,
      malicious: reportResult.positives > 0,
      detections: reportResult.positives || 0,
      totalScans: reportResult.total || 0,
      scanDate: reportResult.scan_date,
      permalink: reportResult.permalink,
    };

  } catch (error) {
    console.error('VirusTotal API error:', error);
    return { available: false, error: error.message };
  }
}

/**
 * OpenAI API Integration
 * Uses GPT model to analyze text for scam indicators
 * @param {string} text - Text to analyze
 * @returns {Promise<object>} Analysis results
 */
export async function analyzeTextWithOpenAI(text) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.warn('OpenAI API key not found');
    return { available: false, error: 'API key not configured' };
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a scam detection expert. Analyze the following text and respond with a JSON object containing:
            - "isScam": boolean indicating if this is likely a scam
            - "confidence": number from 0-100 indicating confidence level
            - "indicators": array of specific scam indicators found
            - "explanation": brief explanation of the assessment
            - "category": type of scam if detected (phishing, lottery, romance, etc.)
            
            Focus on common scam patterns like urgency tactics, requests for personal information, too-good-to-be-true offers, suspicious links, poor grammar, etc.`
          },
          {
            role: 'user',
            content: text.substring(0, 2000) // Limit text length to stay within token limits
          }
        ],
        max_tokens: 500,
        temperature: 0.1,
      }),
    });

    const result = await response.json();
    
    if (!result.choices || !result.choices[0]) {
      return { available: false, error: 'No response from OpenAI' };
    }

    const analysis = JSON.parse(result.choices[0].message.content);
    
    return {
      available: true,
      ...analysis,
      tokensUsed: result.usage?.total_tokens || 0,
    };

  } catch (error) {
    console.error('OpenAI API error:', error);
    return { available: false, error: error.message };
  }
}

/**
 * URLVoid API Integration
 * Checks URL reputation using URLVoid service
 * @param {string} url - URL to check
 * @returns {Promise<object>} Reputation check results
 */
export async function checkUrlReputationWithURLVoid(url) {
  const apiKey = process.env.URLVOID_API_KEY;
  
  if (!apiKey) {
    console.warn('URLVoid API key not found');
    return { available: false, error: 'API key not configured' };
  }

  try {
    const hostname = new URL(url).hostname;
    const response = await fetch(
      `https://api.urlvoid.com/v1/pay-as-you-go/?key=${apiKey}&host=${hostname}`,
      { method: 'GET' }
    );

    const result = await response.json();
    
    return {
      available: true,
      suspicious: result.detections > 0,
      detections: result.detections || 0,
      engines: result.engines || {},
      reputation: result.reputation || 'unknown',
    };

  } catch (error) {
    console.error('URLVoid API error:', error);
    return { available: false, error: error.message };
  }
}

/**
 * PhishTank API Integration
 * Checks if URL is in PhishTank database
 * @param {string} url - URL to check
 * @returns {Promise<object>} PhishTank check results
 */
export async function checkUrlWithPhishTank(url) {
  const apiKey = process.env.PHISHTANK_API_KEY;
  
  if (!apiKey) {
    console.warn('PhishTank API key not found');
    return { available: false, error: 'API key not configured' };
  }

  try {
    const response = await fetch('https://checkurl.phishtank.com/checkurl/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'ScamAlert/1.0',
      },
      body: new URLSearchParams({
        'url': url,
        'format': 'json',
        'app_key': apiKey,
      }),
    });

    const result = await response.json();
    
    return {
      available: true,
      isPhishing: result.results?.in_database || false,
      verified: result.results?.verified || false,
      submissionDate: result.results?.submission_date,
      phishId: result.results?.phish_id,
    };

  } catch (error) {
    console.error('PhishTank API error:', error);
    return { available: false, error: error.message };
  }
}

/**
 * Enhanced analysis combining multiple external services
 * @param {string} text - Text to analyze
 * @param {Array<string>} urls - URLs found in text
 * @returns {Promise<object>} Combined analysis results
 */
export async function performEnhancedAnalysis(text, urls) {
  const results = {
    textAnalysis: null,
    urlAnalysis: [],
    timestamp: new Date().toISOString(),
  };

  // Analyze text with OpenAI if available
  try {
    results.textAnalysis = await analyzeTextWithOpenAI(text);
  } catch (error) {
    console.error('Enhanced text analysis failed:', error);
  }

  // Analyze URLs with multiple services
  for (const url of urls.slice(0, 3)) { // Limit to first 3 URLs to avoid API limits
    const urlResult = {
      url,
      virusTotal: null,
      urlVoid: null,
      phishTank: null,
    };

    try {
      // Run all URL checks in parallel
      const [vtResult, uvResult, ptResult] = await Promise.allSettled([
        scanUrlWithVirusTotal(url),
        checkUrlReputationWithURLVoid(url),
        checkUrlWithPhishTank(url),
      ]);

      if (vtResult.status === 'fulfilled') urlResult.virusTotal = vtResult.value;
      if (uvResult.status === 'fulfilled') urlResult.urlVoid = uvResult.value;
      if (ptResult.status === 'fulfilled') urlResult.phishTank = ptResult.value;

    } catch (error) {
      console.error(`Enhanced URL analysis failed for ${url}:`, error);
    }

    results.urlAnalysis.push(urlResult);
  }

  return results;
}

/**
 * Utility function to calculate enhanced threat score
 * @param {object} basicAnalysis - Results from basic analysis
 * @param {object} enhancedAnalysis - Results from external APIs
 * @returns {object} Enhanced threat assessment
 */
export function calculateEnhancedThreatScore(basicAnalysis, enhancedAnalysis) {
  let enhancedScore = basicAnalysis.score || 0;
  const additionalFactors = [];

  // Add OpenAI analysis score
  if (enhancedAnalysis.textAnalysis?.available) {
    const aiAnalysis = enhancedAnalysis.textAnalysis;
    if (aiAnalysis.isScam) {
      enhancedScore += Math.floor(aiAnalysis.confidence / 20); // Convert 0-100 to 0-5 score
      additionalFactors.push(`AI detected scam with ${aiAnalysis.confidence}% confidence`);
    }
  }

  // Add URL analysis scores
  enhancedAnalysis.urlAnalysis?.forEach(urlResult => {
    if (urlResult.virusTotal?.malicious) {
      enhancedScore += 3;
      additionalFactors.push(`VirusTotal flagged URL as malicious`);
    }
    
    if (urlResult.phishTank?.isPhishing) {
      enhancedScore += 4;
      additionalFactors.push(`PhishTank identified URL as phishing`);
    }
    
    if (urlResult.urlVoid?.suspicious) {
      enhancedScore += 2;
      additionalFactors.push(`URLVoid marked URL as suspicious`);
    }
  });

  // Determine enhanced threat level
  let threatLevel, result;
  if (enhancedScore >= 12) {
    result = "Scam Detected";
    threatLevel = "High";
  } else if (enhancedScore >= 8) {
    result = "Potential Scam";
    threatLevel = "Medium";
  } else if (enhancedScore >= 4) {
    result = "Potential Scam";
    threatLevel = "Low";
  } else {
    result = "Safe";
    threatLevel = "Low";
  }

  return {
    enhancedScore,
    result,
    threatLevel,
    additionalFactors,
    confidence: Math.min(95, enhancedScore * 8), // Convert to confidence percentage
  };
}
