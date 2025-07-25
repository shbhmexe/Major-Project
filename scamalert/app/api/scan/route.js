import { NextResponse } from 'next/server';
import {
  analyzeTextWithAdvancedAI,
  performComprehensiveUrlAnalysis,
  validatePhoneNumber,
  analyzeEmailAddress,
  analyzeTextQuality,
  analyzeWithMLModel
} from './mock-services.js'; // Using mock services for testing

// Enhanced scam-related keywords database with categories and weights
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

// Suspicious URL patterns and domains
const SUSPICIOUS_DOMAINS = [
  // URL shorteners (often used to hide malicious links)
  'bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd',
  'buff.ly', 'short.link', 'tiny.cc', 'rebrand.ly',
  
  // Commonly spoofed domains
  'paypaI.com', 'arnazon.com', 'microsof.com', 'gmai1.com',
  'app1e.com', 'bank0famerica.com', 'we11sfargo.com',
  
  // Suspicious keywords in domains
  'freemoney', 'instant-cash', 'win-prize', 'lottery-winner',
  'verify-account', 'secure-login', 'update-info', 'claim-reward',
  'tax-refund', 'government-grant', 'covid-relief', 'stimulus-check',
  
  // Generic suspicious patterns
  'login', 'secure', 'verify', 'update', 'confirm', 'validation'
];

// URL regex pattern
const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

// Phone number patterns (often used in scams)
const PHONE_REGEX = /(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/g;

// Email patterns
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

/**
 * Analyzes text for scam-related keywords
 * @param {string} text - Text to analyze
 * @returns {object} Analysis result with found keywords and score
 */
function analyzeKeywords(text) {
  const lowerText = text.toLowerCase();
  const foundKeywords = [];
  const foundByCategory = {};
  let score = 0;

  // Iterate through each category
  Object.entries(SCAM_KEYWORDS).forEach(([category, {keywords, weight}]) => {
    foundByCategory[category] = [];
    
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword.toLowerCase())) {
        foundKeywords.push(keyword);
        foundByCategory[category].push(keyword);
        score += weight;
      }
    });
  });

  return { 
    foundKeywords, 
    foundByCategory,
    score 
  };
}

/**
 * Analyzes URLs in the text for suspicious domains and patterns
 * @param {string} text - Text to analyze
 * @returns {object} URL analysis result
 */
function analyzeUrls(text) {
  const urls = text.match(URL_REGEX) || [];
  const suspiciousUrls = [];
  let urlScore = 0;

  urls.forEach(url => {
    const domain = url.replace(/https?:\/\/(www\.)?/, '').split('/')[0].toLowerCase();
    
    // Check against suspicious domains
    const isSuspicious = SUSPICIOUS_DOMAINS.some(suspDomain => 
      domain.includes(suspDomain.toLowerCase())
    );

    if (isSuspicious) {
      suspiciousUrls.push(url);
      urlScore += 2;
    }

    // Check for additional suspicious patterns
    if (domain.includes('login') || domain.includes('verify') || domain.includes('secure')) {
      if (!suspiciousUrls.includes(url)) {
        suspiciousUrls.push(url);
      }
      urlScore += 1;
    }

    // Check for URL shorteners
    if (['bit.ly', 'tinyurl.com', 't.co', 'goo.gl'].some(shortener => 
      domain.includes(shortener))) {
      urlScore += 1;
    }
  });

  return { urls, suspiciousUrls, urlScore };
}

/**
 * Analyzes contact information patterns
 * @param {string} text - Text to analyze
 * @returns {object} Contact analysis result
 */
function analyzeContactInfo(text) {
  const phones = text.match(PHONE_REGEX) || [];
  const emails = text.match(EMAIL_REGEX) || [];
  let contactScore = 0;

  // Multiple contact methods can be suspicious
  if (phones.length > 0 && emails.length > 0) {
    contactScore += 1;
  }

  // Suspicious email domains
  const suspiciousEmailDomains = ['tempmail', 'guerrillamail', '10minutemail', 'mailinator'];
  emails.forEach(email => {
    const domain = email.split('@')[1];
    if (suspiciousEmailDomains.some(susDomain => domain.includes(susDomain))) {
      contactScore += 2;
    }
  });

  return { phones, emails, contactScore };
}

/**
 * Determines threat level and result based on total score
 * @param {number} totalScore - Combined score from all analyses
 * @param {object} analysisResults - Detailed analysis results
 * @returns {object} Final assessment
 */
function assessThreat(totalScore, analysisResults) {
  let result, threatLevel, explanation;

  if (totalScore >= 8) {
    result = "Scam Detected";
    threatLevel = "High";
    explanation = "Multiple high-risk indicators detected. This appears to be a scam.";
  } else if (totalScore >= 4) {
    result = "Potential Scam";
    threatLevel = "Medium";
    explanation = "Several suspicious elements found. Exercise caution.";
  } else if (totalScore >= 1) {
    result = "Potential Scam";
    threatLevel = "Low";
    explanation = "Some suspicious elements detected. Be cautious.";
  } else {
    result = "Safe";
    threatLevel = "Low";
    explanation = "No significant scam indicators detected.";
  }

  // Generate detailed explanation based on findings
  const details = [];
  if (analysisResults.keywords.foundKeywords.length > 0) {
    details.push(`Found ${analysisResults.keywords.foundKeywords.length} suspicious keywords`);
  }
  if (analysisResults.urls.suspiciousUrls.length > 0) {
    details.push(`Detected ${analysisResults.urls.suspiciousUrls.length} suspicious URLs`);
  }
  if (analysisResults.contact.phones.length > 0 || analysisResults.contact.emails.length > 0) {
    details.push("Contains contact information requests");
  }

  if (details.length > 0) {
    explanation += ` Details: ${details.join(', ')}.`;
  }

  return { result, threatLevel, explanation };
}

/**
 * Main POST handler for the scan API
 */
export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    const { text, options = {} } = body;

    // Validate input
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { 
          error: 'Invalid input', 
          message: 'Text field is required and must be a string' 
        },
        { status: 400 }
      );
    }

    if (text.length > 10000) {
      return NextResponse.json(
        { 
          error: 'Text too long', 
          message: 'Text must be less than 10,000 characters' 
        },
        { status: 400 }
      );
    }

    // Perform analysis
    const keywordAnalysis = analyzeKeywords(text);
    const urlAnalysis = analyzeUrls(text);
    const contactAnalysis = analyzeContactInfo(text);

    // Calculate total score
    const totalScore = keywordAnalysis.score + urlAnalysis.urlScore + contactAnalysis.contactScore;

    // Prepare analysis results
    const analysisResults = {
      keywords: keywordAnalysis,
      urls: urlAnalysis,
      contact: contactAnalysis
    };

    // Get final assessment
    const assessment = assessThreat(totalScore, analysisResults);

    // Prepare response
    const response = {
      result: assessment.result,
      threatLevel: assessment.threatLevel,
      explanation: assessment.explanation,
      score: totalScore,
      details: {
        keywordsFound: keywordAnalysis.foundKeywords.slice(0, 10), // Limit to first 10
        suspiciousUrls: urlAnalysis.suspiciousUrls,
        contactInfo: {
          hasPhones: contactAnalysis.phones.length > 0,
          hasEmails: contactAnalysis.emails.length > 0
        }
      },
      timestamp: new Date().toISOString(),
      version: "1.0.0"
    };

    // Add debug info if requested
    if (options.debug) {
      response.debug = {
        totalScore,
        keywordScore: keywordAnalysis.score,
        urlScore: urlAnalysis.urlScore,
        contactScore: contactAnalysis.contactScore,
        allKeywords: keywordAnalysis.foundKeywords,
        allUrls: urlAnalysis.urls,
        allPhones: contactAnalysis.phones,
        allEmails: contactAnalysis.emails
      };
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Scan API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: 'An error occurred while processing your request',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

/**
 * GET handler for API information
 */
export async function GET() {
  return NextResponse.json({
    message: "Scam Detection API",
    version: "1.0.0",
    endpoints: {
      POST: "/api/scan - Analyze text for scam indicators"
    },
    usage: {
      method: "POST",
      body: {
        text: "Text to analyze (required)",
        options: {
          debug: "Include debug information (optional)"
        }
      }
    },
    features: [
      "Keyword analysis for scam indicators",
      "URL analysis for suspicious domains",
      "Contact information pattern detection",
      "Threat level assessment",
      "Detailed explanations"
    ]
  });
}
