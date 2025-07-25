import { NextResponse } from 'next/server';
import {
  analyzeTextWithAdvancedAI,
  performComprehensiveUrlAnalysis,
  validatePhoneNumber,
  analyzeEmailAddress,
  analyzeTextQuality,
  analyzeWithMLModel
} from './services.js';

/**
 * Enhanced keyword analysis with categorized scoring
 */
function analyzeEnhancedKeywords(text) {
  const lowerText = text.toLowerCase();
  const foundKeywords = {};
  let totalScore = 0;
  
  const SCAM_KEYWORDS = {
    urgency: {
      keywords: [
        'urgent', 'immediate', 'expires today', 'limited time', 'act now', 'hurry',
        'last chance', 'expires soon', 'don\'t miss out', 'time sensitive',
        'deadline', 'final notice', 'act fast', 'don\'t delay', 'expires midnight',
        'only today', 'limited offer', 'while supplies last', 'don\'t wait'
      ],
      weight: 2
    },
    
    financial: {
      keywords: [
        'win', 'winner', 'won', 'prize', 'lottery', 'jackpot', 'million',
        'cash prize', 'free money', 'instant cash', 'reward', 'congratulations',
        'selected', 'lucky', 'bonus', 'gift card', 'voucher', 'sweepstakes',
        'inheritance', 'beneficiary', 'compensation', 'refund', 'tax refund'
      ],
      weight: 2
    },
    
    authentication: {
      keywords: [
        'otp', 'verify', 'confirm', 'validate', 'update', 'suspend', 'blocked',
        'security alert', 'account locked', 'verify account', 'click here',
        'login', 'password', 'pin', 'cvv', 'ssn', 'social security',
        'two-factor', 'authentication', 'security code', 'verification code'
      ],
      weight: 3
    },
    
    action: {
      keywords: [
        'click here', 'download now', 'install', 'call now', 'text back',
        'reply stop', 'send money', 'wire transfer', 'bitcoin', 'cryptocurrency',
        'western union', 'moneygram', 'paypal', 'venmo', 'zelle', 'cashapp'
      ],
      weight: 2
    },
    
    emotional: {
      keywords: [
        'help', 'emergency', 'sick', 'hospital', 'stranded', 'need money',
        'family emergency', 'accident', 'arrest', 'legal trouble', 'desperate',
        'please help', 'urgent help', 'life or death', 'dying', 'cancer'
      ],
      weight: 2
    },
    
    authority: {
      keywords: [
        'irs', 'fbi', 'police', 'government', 'tax', 'refund', 'debt collector',
        'court', 'lawsuit', 'legal action', 'warrant', 'fine', 'medicare',
        'social security administration', 'department of', 'federal', 'official'
      ],
      weight: 3
    }
  };

  Object.entries(SCAM_KEYWORDS).forEach(([category, {keywords, weight}]) => {
    foundKeywords[category] = [];
    
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword.toLowerCase())) {
        foundKeywords[category].push(keyword);
        totalScore += weight;
      }
    });
  });

  return {
    foundKeywords,
    totalScore,
    categoryScores: Object.entries(foundKeywords).map(([category, keywords]) => ({
      category,
      count: keywords.length,
      score: keywords.length * SCAM_KEYWORDS[category].weight
    }))
  };
}

/**
 * Enhanced POST handler with full AI integration
 */
export async function POST(request) {
  try {
    const startTime = Date.now();
    const body = await request.json();
    const { text, options = {} } = body;

    // Enhanced input validation
    if (!text || typeof text !== 'string') {
      return NextResponse.json({
        error: 'Invalid input',
        message: 'Text field is required and must be a string'
      }, { status: 400 });
    }

    if (text.trim().length === 0) {
      return NextResponse.json({
        error: 'Empty input',
        message: 'Text cannot be empty'
      }, { status: 400 });
    }

    if (text.length > 10000) {
      return NextResponse.json({
        error: 'Text too long',
        message: 'Text must be less than 10,000 characters'
      }, { status: 400 });
    }

    // Initialize analysis results
    const analysisResults = {
      basic: {},
      enhanced: {},
      metadata: {
        processingTime: 0,
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        features: []
      }
    };

    // 1. Basic Analysis (always performed)
    const keywordAnalysis = analyzeEnhancedKeywords(text);
    const textQuality = analyzeTextQuality(text);
    
    // Extract URLs, emails, phones
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const phoneRegex = /(\+?1[-.\s]?)?(\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})/g;
    
    const urls = text.match(urlRegex) || [];
    const emails = text.match(emailRegex) || [];
    const phones = text.match(phoneRegex) || [];

    analysisResults.basic = {
      keywordAnalysis,
      textQuality,
      urls: urls.length,
      emails: emails.length,
      phones: phones.length,
      textLength: text.length
    };

    // Calculate basic score
    let basicScore = keywordAnalysis.totalScore;
    if (textQuality.hasPoorQuality) basicScore += 2;
    if (urls.length > 0) basicScore += 1;
    if (emails.length > 0) basicScore += 1;
    if (phones.length > 0) basicScore += 1;

    // 2. Enhanced Analysis (with external APIs)
    const enhancedPromises = [];
    
    // AI Text Analysis
    if (options.useAI !== false) {
      analysisResults.metadata.features.push('AI Text Analysis');
      enhancedPromises.push(
        analyzeTextWithAdvancedAI(text).then(result => ({type: 'ai', result}))
      );
    }

    // URL Analysis
    if (urls.length > 0 && options.analyzeUrls !== false) {
      analysisResults.metadata.features.push('URL Analysis');
      const urlPromises = urls.slice(0, 3).map(url => 
        performComprehensiveUrlAnalysis(url).then(result => ({url, result}))
      );
      enhancedPromises.push(
        Promise.all(urlPromises).then(results => ({type: 'urls', result: results}))
      );
    }

    // Phone Validation
    if (phones.length > 0 && options.validatePhones !== false) {
      analysisResults.metadata.features.push('Phone Validation');
      const phonePromises = phones.slice(0, 2).map(phone => 
        validatePhoneNumber(phone).then(result => ({phone, result}))
      );
      enhancedPromises.push(
        Promise.all(phonePromises).then(results => ({type: 'phones', result: results}))
      );
    }

    // Email Analysis
    if (emails.length > 0 && options.analyzeEmails !== false) {
      analysisResults.metadata.features.push('Email Analysis');
      const emailPromises = emails.slice(0, 2).map(email => 
        analyzeEmailAddress(email).then(result => ({email, result}))
      );
      enhancedPromises.push(
        Promise.all(emailPromises).then(results => ({type: 'emails', result: results}))
      );
    }

    // ML Model Analysis (if available)
    if (options.useML !== false) {
      const features = {
        textLength: text.length,
        keywordScore: keywordAnalysis.totalScore,
        qualityScore: textQuality.qualityScore,
        urlCount: urls.length,
        emailCount: emails.length,
        phoneCount: phones.length,
        capsRatio: textQuality.capsRatio,
        exclamationCount: textQuality.exclamationCount
      };
      
      enhancedPromises.push(
        analyzeWithMLModel(features).then(result => ({type: 'ml', result}))
      );
    }

    // Wait for all enhanced analyses
    if (enhancedPromises.length > 0) {
      const enhancedResults = await Promise.allSettled(enhancedPromises);
      
      enhancedResults.forEach(({status, value}) => {
        if (status === 'fulfilled' && value) {
          analysisResults.enhanced[value.type] = value.result;
        }
      });
    }

    // 3. Calculate Enhanced Score
    let enhancedScore = basicScore;
    let confidence = 60; // Base confidence
    const riskFactors = [];
    const recommendations = [];

    // AI Analysis Impact
    if (analysisResults.enhanced.ai?.available) {
      const aiResult = analysisResults.enhanced.ai;
      if (aiResult.isScam) {
        enhancedScore += Math.floor(aiResult.confidence / 20);
        confidence = Math.max(confidence, aiResult.confidence);
        riskFactors.push(`AI detected ${aiResult.scamType} scam with ${aiResult.confidence}% confidence`);
        
        if (aiResult.recommendation === 'block') {
          recommendations.push('Block this message immediately');
        }
      }
    }

    // URL Analysis Impact
    if (analysisResults.enhanced.urls) {
      analysisResults.enhanced.urls.forEach(({url, result}) => {
        if (result.riskScore >= 8) {
          enhancedScore += 5;
          riskFactors.push(`High-risk URL detected: ${url}`);
          recommendations.push('Do not click on any links');
        } else if (result.riskScore >= 4) {
          enhancedScore += 2;
          riskFactors.push(`Suspicious URL found: ${url}`);
        }
      });
    }

    // Phone Analysis Impact
    if (analysisResults.enhanced.phones) {
      analysisResults.enhanced.phones.forEach(({phone, result}) => {
        if (!result.available || !result.isValid) {
          enhancedScore += 2;
          riskFactors.push(`Invalid or suspicious phone number: ${phone}`);
        }
      });
    }

    // Email Analysis Impact
    if (analysisResults.enhanced.emails) {
      analysisResults.enhanced.emails.forEach(({email, result}) => {
        if (result.riskScore >= 5) {
          enhancedScore += 3;
          riskFactors.push(`High-risk email address: ${email}`);
        } else if (result.isDisposable) {
          enhancedScore += 1;
          riskFactors.push(`Disposable email detected: ${email}`);
        }
      });
    }

    // ML Model Impact
    if (analysisResults.enhanced.ml?.available) {
      const mlResult = analysisResults.enhanced.ml;
      if (mlResult.prediction === 'scam') {
        enhancedScore += Math.floor(mlResult.confidence * 5);
        confidence = Math.max(confidence, mlResult.confidence * 100);
        riskFactors.push(`ML model detected scam with ${Math.round(mlResult.confidence * 100)}% confidence`);
      }
    }

    // 4. Final Assessment
    let finalResult, threatLevel, explanation;
    
    if (enhancedScore >= 15) {
      finalResult = "Scam Detected";
      threatLevel = "Critical";
      explanation = "Multiple high-confidence indicators detected. This is very likely a scam.";
      recommendations.push("Do not respond or engage", "Report to authorities if applicable");
    } else if (enhancedScore >= 10) {
      finalResult = "Scam Detected";
      threatLevel = "High";
      explanation = "Several strong scam indicators found. Highly suspicious content.";
      recommendations.push("Avoid responding", "Verify through official channels if claimed to be from a known organization");
    } else if (enhancedScore >= 6) {
      finalResult = "Potential Scam";
      threatLevel = "Medium";
      explanation = "Multiple suspicious elements detected. Exercise significant caution.";
      recommendations.push("Be very cautious", "Verify independently before taking any action");
    } else if (enhancedScore >= 3) {
      finalResult = "Potential Scam";
      threatLevel = "Low";
      explanation = "Some suspicious elements found. Be cautious.";
      recommendations.push("Verify sender authenticity", "Be cautious with personal information");
    } else {
      finalResult = "Likely Safe";
      threatLevel = "Low";
      explanation = "No significant scam indicators detected.";
      recommendations.push("Standard caution advised");
    }

    // Processing time
    const processingTime = Date.now() - startTime;
    analysisResults.metadata.processingTime = processingTime;

    // 5. Build Final Response
    const response = {
      result: finalResult,
      threatLevel,
      confidence: Math.min(95, confidence),
      score: enhancedScore,
      explanation,
      riskFactors,
      recommendations,
      
      analysis: {
        basic: {
          keywordMatches: keywordAnalysis.foundKeywords,
          textQuality: {
            score: textQuality.qualityScore,
            issues: textQuality.issues
          },
          contactInfo: {
            urls: urls.length,
            emails: emails.length,
            phones: phones.length
          }
        },
        enhanced: options.includeEnhanced !== false ? analysisResults.enhanced : undefined
      },
      
      metadata: analysisResults.metadata
    };

    // Add debug information if requested
    if (options.debug) {
      response.debug = {
        basicScore,
        enhancedScore,
        allUrls: urls,
        allEmails: emails,
        allPhones: phones,
        textStats: {
          length: text.length,
          wordCount: text.split(/\s+/).length,
          capsRatio: textQuality.capsRatio,
          exclamationCount: textQuality.exclamationCount
        }
      };
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Enhanced Scan API Error:', error);
    
    return NextResponse.json({
      error: 'Internal server error',
      message: 'An error occurred during analysis',
      timestamp: new Date().toISOString(),
      details: options.debug ? error.message : undefined
    }, { status: 500 });
  }
}

/**
 * GET handler with comprehensive API information
 */
export async function GET() {
  return NextResponse.json({
    name: "ScamAlert Enhanced Detection API",
    version: "2.0.0",
    description: "Advanced AI-powered scam detection service",
    
    endpoints: {
      "POST /api/scan": "Analyze text for scam indicators with AI enhancement"
    },
    
    features: [
      "AI-powered text analysis using GPT models",
      "Comprehensive URL reputation checking",
      "Phone number validation and carrier lookup",
      "Email address reputation analysis",
      "Domain age and registration checking",
      "Machine learning model integration",
      "Multi-layered keyword analysis",
      "Text quality assessment",
      "Real-time threat scoring"
    ],
    
    usage: {
      method: "POST",
      contentType: "application/json",
      body: {
        text: "string (required) - Text to analyze",
        options: {
          useAI: "boolean (optional, default: true) - Enable AI analysis",
          analyzeUrls: "boolean (optional, default: true) - Enable URL analysis",
          validatePhones: "boolean (optional, default: true) - Enable phone validation",
          analyzeEmails: "boolean (optional, default: true) - Enable email analysis",
          useML: "boolean (optional, default: true) - Enable ML model",
          includeEnhanced: "boolean (optional, default: true) - Include enhanced results",
          debug: "boolean (optional, default: false) - Include debug information"
        }
      }
    },
    
    response: {
      result: "string - Final assessment (Scam Detected, Potential Scam, Likely Safe)",
      threatLevel: "string - Risk level (Critical, High, Medium, Low)",
      confidence: "number - Confidence percentage (0-95)",
      score: "number - Total risk score",
      explanation: "string - Human-readable explanation",
      riskFactors: "array - List of identified risk factors",
      recommendations: "array - Suggested actions",
      analysis: "object - Detailed analysis results",
      metadata: "object - Processing information"
    },
    
    externalServices: [
      "OpenAI GPT-4 for advanced text analysis",
      "Google Safe Browsing for URL checking",
      "Twilio for phone number validation",
      "WhoisXML for domain information",
      "VirusTotal for malware detection",
      "URLVoid for reputation checking",
      "PhishTank for phishing detection"
    ],
    
    rateLimit: {
      requests: 100,
      window: "15 minutes",
      note: "Higher limits available with API key"
    }
  });
}
