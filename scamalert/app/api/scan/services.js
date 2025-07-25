/**
 * Real API Services for Scam Detection
 * This file contains actual implementations for various external services
 */

// Google Safe Browsing API Integration
export async function checkUrlWithGoogleSafeBrowsing(url) {
  const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
  
  if (!apiKey) {
    return { available: false, error: 'Google Safe Browsing API key not configured' };
  }

  try {
    const response = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client: {
          clientId: "scamalert",
          clientVersion: "1.0.0"
        },
        threatInfo: {
          threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
          platformTypes: ["ANY_PLATFORM"],
          threatEntryTypes: ["URL"],
          threatEntries: [{ url: url }]
        }
      })
    });

    const result = await response.json();
    
    return {
      available: true,
      isMalicious: result.matches && result.matches.length > 0,
      threats: result.matches?.map(match => ({
        threatType: match.threatType,
        platformType: match.platformType,
        cacheDuration: match.cacheDuration
      })) || [],
      scanDate: new Date().toISOString()
    };

  } catch (error) {
    console.error('Google Safe Browsing API error:', error);
    return { available: false, error: error.message };
  }
}

// Twilio Phone Number Validation
export async function validatePhoneNumber(phoneNumber) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  
  if (!accountSid || !authToken) {
    return { available: false, error: 'Twilio credentials not configured' };
  }

  try {
    const response = await fetch(`https://lookups.twilio.com/v1/PhoneNumbers/${encodeURIComponent(phoneNumber)}?Type=carrier`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64')
      }
    });

    if (!response.ok) {
      return { available: false, error: 'Invalid phone number' };
    }

    const result = await response.json();
    
    return {
      available: true,
      isValid: true,
      countryCode: result.country_code,
      phoneNumber: result.phone_number,
      nationalFormat: result.national_format,
      carrier: result.carrier?.name || 'Unknown',
      type: result.carrier?.type || 'Unknown'
    };

  } catch (error) {
    console.error('Twilio validation error:', error);
    return { available: false, error: error.message };
  }
}

// WhoisXML API for Domain Information
export async function getDomainInfo(domain) {
  const apiKey = process.env.WHOISXML_API_KEY;
  
  if (!apiKey) {
    return { available: false, error: 'WhoisXML API key not configured' };
  }

  try {
    const response = await fetch(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${domain}&outputFormat=JSON`);
    const result = await response.json();
    
    if (result.ErrorMessage) {
      return { available: false, error: result.ErrorMessage.msg };
    }

    const whoisRecord = result.WhoisRecord;
    const registryData = whoisRecord?.registryData;
    const registrarData = whoisRecord?.registrarData;
    
    // Calculate domain age
    const createdDate = new Date(registryData?.createdDate || registrarData?.createdDate);
    const ageInDays = Math.floor((new Date() - createdDate) / (1000 * 60 * 60 * 24));
    
    return {
      available: true,
      domain: whoisRecord?.domainName,
      registrar: registrarData?.registrarName,
      createdDate: createdDate.toISOString(),
      updatedDate: registryData?.updatedDate || registrarData?.updatedDate,
      expiresDate: registryData?.expiresDate || registrarData?.expiresDate,
      ageInDays,
      nameServers: registryData?.nameServers?.hostNames || [],
      registrantCountry: registryData?.registrant?.country,
      isNewDomain: ageInDays < 30, // Flag domains less than 30 days old
      isSuspiciousAge: ageInDays < 90 // Flag domains less than 90 days old
    };

  } catch (error) {
    console.error('WhoisXML API error:', error);
    return { available: false, error: error.message };
  }
}

// Enhanced OpenAI Analysis with better prompts
export async function analyzeTextWithAdvancedAI(text) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    return { available: false, error: 'OpenAI API key not configured' };
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using latest GPT model
        messages: [
          {
            role: 'system',
            content: `You are an expert cybersecurity analyst specializing in scam detection. Analyze the provided text for scam indicators and respond with a JSON object containing:

            {
              "isScam": boolean,
              "confidence": number (0-100),
              "riskLevel": "low" | "medium" | "high" | "critical",
              "scamType": "phishing" | "lottery" | "romance" | "tech_support" | "financial" | "fake_job" | "advance_fee" | "social_engineering" | "other" | "none",
              "indicators": [
                {
                  "type": "urgency" | "financial_request" | "personal_info_request" | "suspicious_link" | "grammar_issues" | "emotional_manipulation" | "authority_impersonation" | "too_good_to_be_true",
                  "description": "specific indicator found",
                  "severity": "low" | "medium" | "high"
                }
              ],
              "redFlags": ["list of major red flags"],
              "legitimacyScore": number (0-100),
              "recommendation": "block" | "caution" | "investigate" | "likely_safe",
              "explanation": "detailed explanation of analysis"
            }

            Consider:
            1. Language patterns (urgency, pressure tactics)
            2. Requests for personal/financial information
            3. Grammar and spelling quality
            4. Emotional manipulation techniques
            5. Authority impersonation
            6. Unrealistic promises or threats
            7. Contact information requests
            8. Link patterns and domains`
          },
          {
            role: 'user',
            content: text.substring(0, 3000) // Limit to stay within token limits
          }
        ],
        max_tokens: 800,
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
      model: 'gpt-4o-mini'
    };

  } catch (error) {
    console.error('OpenAI API error:', error);
    return { available: false, error: error.message };
  }
}

// IP Geolocation and Reputation Check
export async function checkIPReputation(ip) {
  try {
    // Using a free IP API service
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query,proxy,hosting`);
    const result = await response.json();
    
    if (result.status === 'fail') {
      return { available: false, error: result.message };
    }

    return {
      available: true,
      ip: result.query,
      country: result.country,
      region: result.regionName,
      city: result.city,
      isp: result.isp,
      organization: result.org,
      isProxy: result.proxy || false,
      isHosting: result.hosting || false,
      isSuspicious: result.proxy || result.hosting, // VPNs/hosting providers can be suspicious
      location: {
        lat: result.lat,
        lon: result.lon,
        timezone: result.timezone
      }
    };

  } catch (error) {
    console.error('IP reputation check error:', error);
    return { available: false, error: error.message };
  }
}

// Email Analysis and Validation
export async function analyzeEmailAddress(email) {
  try {
    const [localPart, domain] = email.split('@');
    
    // Check domain reputation
    const domainInfo = await getDomainInfo(domain);
    
    // Common disposable email domains
    const disposableDomains = [
      '10minutemail.com', 'guerrillamail.com', 'mailinator.com', 'tempmail.org',
      'temp-mail.org', 'throwaway.email', 'yopmail.com', 'getnada.com'
    ];
    
    const isDisposable = disposableDomains.some(d => domain.toLowerCase().includes(d));
    
    // Analyze local part for suspicious patterns
    const suspiciousPatterns = [
      /\d{8,}/, // Long sequences of numbers
      /^(noreply|no-reply|donotreply)/i, // No-reply addresses
      /^(admin|support|info|contact)(\d+)?$/i, // Generic admin emails
      /^[a-z]{1,3}\d{4,}$/i // Short letters followed by many numbers
    ];
    
    const hasSuspiciousPattern = suspiciousPatterns.some(pattern => pattern.test(localPart));
    
    return {
      available: true,
      email,
      domain,
      isDisposable,
      hasSuspiciousPattern,
      domainAge: domainInfo.available ? domainInfo.ageInDays : null,
      isNewDomain: domainInfo.available ? domainInfo.isNewDomain : false,
      riskScore: (isDisposable ? 3 : 0) + (hasSuspiciousPattern ? 2 : 0) + (domainInfo.available && domainInfo.isNewDomain ? 2 : 0)
    };

  } catch (error) {
    console.error('Email analysis error:', error);
    return { available: false, error: error.message };
  }
}

// Text Language and Quality Analysis
export function analyzeTextQuality(text) {
  const issues = [];
  let qualityScore = 100;
  
  // Check for excessive capitalization
  const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length;
  if (capsRatio > 0.3) {
    issues.push('Excessive capitalization');
    qualityScore -= 15;
  }
  
  // Check for excessive punctuation
  const exclamationCount = (text.match(/!/g) || []).length;
  if (exclamationCount > 3) {
    issues.push('Excessive exclamation marks');
    qualityScore -= 10;
  }
  
  // Check for suspicious word patterns
  const suspiciousPatterns = [
    /\b(ur|u|pls|plz|thx)\b/gi, // Text speak
    /\b\w*(\w)\1{2,}\w*\b/g, // Repeated letters (like "hellooooo")
    /\$\$+|\$[0-9,]+\$+/g, // Dollar sign patterns
  ];
  
  suspiciousPatterns.forEach((pattern, index) => {
    const matches = text.match(pattern);
    if (matches && matches.length > 0) {
      const patternNames = ['Text speak', 'Repeated letters', 'Money emphasis'];
      issues.push(patternNames[index]);
      qualityScore -= 5 * matches.length;
    }
  });
  
  // Check spelling (basic implementation)
  const commonMisspellings = {
    'recieve': 'receive',
    'occured': 'occurred',
    'seperate': 'separate',
    'definately': 'definitely',
    'alot': 'a lot',
    'congradulations': 'congratulations',
    'priviledge': 'privilege'
  };
  
  let misspellingCount = 0;
  Object.keys(commonMisspellings).forEach(misspelling => {
    const regex = new RegExp(`\\b${misspelling}\\b`, 'gi');
    const matches = text.match(regex);
    if (matches) {
      misspellingCount += matches.length;
    }
  });
  
  if (misspellingCount > 0) {
    issues.push(`${misspellingCount} common misspellings`);
    qualityScore -= misspellingCount * 5;
  }
  
  return {
    qualityScore: Math.max(0, qualityScore),
    issues,
    capsRatio,
    exclamationCount,
    misspellingCount,
    hasPoorQuality: qualityScore < 70
  };
}

// Comprehensive URL Analysis
export async function performComprehensiveUrlAnalysis(url) {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    
    // Run multiple checks in parallel
    const [
      googleSafeBrowsing,
      domainInfo,
      ipInfo
    ] = await Promise.allSettled([
      checkUrlWithGoogleSafeBrowsing(url),
      getDomainInfo(domain),
      checkIPReputation(urlObj.hostname)
    ]);
    
    // Analyze URL structure
    const urlAnalysis = {
      hasSubdomain: domain.split('.').length > 2,
      hasPort: urlObj.port !== '',
      hasNonStandardPort: urlObj.port !== '' && !['80', '443'].includes(urlObj.port),
      pathLength: urlObj.pathname.length,
      hasQueryParams: urlObj.search !== '',
      usesHTTPS: urlObj.protocol === 'https:',
      isShortened: ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly'].some(shortener => domain.includes(shortener))
    };
    
    // Calculate risk score
    let riskScore = 0;
    if (googleSafeBrowsing.status === 'fulfilled' && googleSafeBrowsing.value.isMalicious) riskScore += 10;
    if (domainInfo.status === 'fulfilled' && domainInfo.value.isNewDomain) riskScore += 3;
    if (ipInfo.status === 'fulfilled' && ipInfo.value.isSuspicious) riskScore += 2;
    if (!urlAnalysis.usesHTTPS) riskScore += 2;
    if (urlAnalysis.hasNonStandardPort) riskScore += 2;
    if (urlAnalysis.isShortened) riskScore += 3;
    
    return {
      url,
      domain,
      riskScore,
      urlAnalysis,
      googleSafeBrowsing: googleSafeBrowsing.status === 'fulfilled' ? googleSafeBrowsing.value : null,
      domainInfo: domainInfo.status === 'fulfilled' ? domainInfo.value : null,
      ipInfo: ipInfo.status === 'fulfilled' ? ipInfo.value : null,
      recommendation: riskScore >= 8 ? 'block' : riskScore >= 4 ? 'caution' : 'investigate'
    };
    
  } catch (error) {
    console.error('Comprehensive URL analysis error:', error);
    return { error: error.message };
  }
}

// Machine Learning Model Integration (placeholder for custom models)
export async function analyzeWithMLModel(features) {
  const endpoint = process.env.ML_MODEL_ENDPOINT;
  const apiKey = process.env.ML_MODEL_API_KEY;
  
  if (!endpoint || !apiKey) {
    return { available: false, error: 'ML model endpoint not configured' };
  }
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ features })
    });
    
    const result = await response.json();
    
    return {
      available: true,
      prediction: result.prediction,
      confidence: result.confidence,
      features: result.feature_importance || {}
    };
    
  } catch (error) {
    console.error('ML model error:', error);
    return { available: false, error: error.message };
  }
}
