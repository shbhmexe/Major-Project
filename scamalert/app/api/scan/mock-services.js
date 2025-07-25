/**
 * Mock API Services for Development and Testing
 * This file provides mock implementations when external APIs are not available
 */

// Mock OpenAI Analysis
export async function analyzeTextWithAdvancedAI(text) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const lowerText = text.toLowerCase();
  let confidence = 30;
  let isScam = false;
  let scamType = 'none';
  const indicators = [];
  const redFlags = [];
  
  // Simple rule-based mock analysis
  if (lowerText.includes('urgent') || lowerText.includes('immediate')) {
    confidence += 20;
    indicators.push({
      type: 'urgency',
      description: 'Uses urgency tactics',
      severity: 'medium'
    });
  }
  
  if (lowerText.includes('win') || lowerText.includes('prize') || lowerText.includes('lottery')) {
    confidence += 25;
    scamType = 'lottery';
    indicators.push({
      type: 'too_good_to_be_true',
      description: 'Promises unrealistic rewards',
      severity: 'high'
    });
    redFlags.push('Lottery/prize scam indicators');
  }
  
  if (lowerText.includes('verify') || lowerText.includes('account') || lowerText.includes('suspend')) {
    confidence += 30;
    scamType = 'phishing';
    indicators.push({
      type: 'personal_info_request',
      description: 'Requests account verification',
      severity: 'high'
    });
    redFlags.push('Phishing attempt detected');
  }
  
  if (lowerText.includes('click') || lowerText.includes('download')) {
    confidence += 15;
    indicators.push({
      type: 'suspicious_link',
      description: 'Contains suspicious action requests',
      severity: 'medium'
    });
  }
  
  if (lowerText.includes('money') || lowerText.includes('payment') || lowerText.includes('bitcoin')) {
    confidence += 20;
    scamType = 'financial';
    indicators.push({
      type: 'financial_request',
      description: 'Requests money or payment',
      severity: 'high'
    });
    redFlags.push('Financial request detected');
  }
  
  // Grammar and quality check
  const exclamationCount = (text.match(/!/g) || []).length;
  if (exclamationCount > 2) {
    confidence += 10;
    indicators.push({
      type: 'grammar_issues',
      description: 'Excessive punctuation usage',
      severity: 'low'
    });
  }
  
  isScam = confidence >= 60;
  
  let recommendation = 'likely_safe';
  if (confidence >= 80) recommendation = 'block';
  else if (confidence >= 60) recommendation = 'caution';
  else if (confidence >= 40) recommendation = 'investigate';
  
  return {
    available: true,
    isScam,
    confidence,
    riskLevel: confidence >= 80 ? 'high' : confidence >= 60 ? 'medium' : 'low',
    scamType,
    indicators,
    redFlags,
    legitimacyScore: 100 - confidence,
    recommendation,
    explanation: `Mock AI analysis detected ${indicators.length} suspicious indicators with ${confidence}% confidence.`,
    tokensUsed: Math.floor(text.length / 4),
    model: 'mock-gpt-4'
  };
}

// Mock URL Analysis
export async function performComprehensiveUrlAnalysis(url) {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.toLowerCase();
    
    let riskScore = 0;
    const risks = [];
    
    // Check for suspicious patterns
    if (domain.includes('bit.ly') || domain.includes('tinyurl') || domain.includes('t.co')) {
      riskScore += 3;
      risks.push('URL shortener detected');
    }
    
    if (domain.includes('verify') || domain.includes('secure') || domain.includes('login')) {
      riskScore += 4;
      risks.push('Suspicious domain keywords');
    }
    
    if (!urlObj.protocol.includes('https')) {
      riskScore += 2;
      risks.push('Non-secure connection');
    }
    
    if (domain.split('.').length > 3) {
      riskScore += 2;
      risks.push('Complex subdomain structure');
    }
    
    // Mock external service results
    const mockGoogleSafeBrowsing = {
      available: true,
      isMalicious: riskScore >= 6,
      threats: riskScore >= 6 ? [{ threatType: 'SOCIAL_ENGINEERING' }] : [],
      scanDate: new Date().toISOString()
    };
    
    const mockDomainInfo = {
      available: true,
      domain: domain,
      registrar: 'Mock Registrar Inc.',
      createdDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      ageInDays: Math.floor(Math.random() * 365),
      isNewDomain: Math.random() > 0.7,
      isSuspiciousAge: Math.random() > 0.8
    };
    
    if (mockDomainInfo.isNewDomain) {
      riskScore += 3;
      risks.push('Domain is less than 30 days old');
    }
    
    return {
      url,
      domain,
      riskScore,
      risks,
      urlAnalysis: {
        hasSubdomain: domain.split('.').length > 2,
        hasPort: urlObj.port !== '',
        usesHTTPS: urlObj.protocol === 'https:',
        pathLength: urlObj.pathname.length,
        hasQueryParams: urlObj.search !== ''
      },
      googleSafeBrowsing: mockGoogleSafeBrowsing,
      domainInfo: mockDomainInfo,
      recommendation: riskScore >= 8 ? 'block' : riskScore >= 4 ? 'caution' : 'investigate'
    };
    
  } catch (error) {
    return {
      url,
      error: 'Invalid URL format',
      riskScore: 1,
      recommendation: 'investigate'
    };
  }
}

// Mock Phone Validation
export async function validatePhoneNumber(phoneNumber) {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Simple validation
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const isValid = cleanPhone.length >= 10 && cleanPhone.length <= 11;
  
  if (!isValid) {
    return {
      available: false,
      error: 'Invalid phone number format'
    };
  }
  
  // Mock carrier data
  const carriers = ['Verizon', 'AT&T', 'T-Mobile', 'Sprint', 'Unknown'];
  const types = ['mobile', 'landline', 'voip'];
  
  return {
    available: true,
    isValid: true,
    countryCode: 'US',
    phoneNumber: `+1${cleanPhone.slice(-10)}`,
    nationalFormat: `(${cleanPhone.slice(-10, -7)}) ${cleanPhone.slice(-7, -4)}-${cleanPhone.slice(-4)}`,
    carrier: carriers[Math.floor(Math.random() * carriers.length)],
    type: types[Math.floor(Math.random() * types.length)]
  };
}

// Mock Email Analysis
export async function analyzeEmailAddress(email) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const [localPart, domain] = email.split('@');
    
    if (!localPart || !domain) {
      return { available: false, error: 'Invalid email format' };
    }
    
    // Check for disposable domains
    const disposableDomains = [
      '10minutemail.com', 'guerrillamail.com', 'mailinator.com', 
      'tempmail.org', 'temp-mail.org', 'throwaway.email'
    ];
    
    const isDisposable = disposableDomains.some(d => domain.toLowerCase().includes(d));
    
    // Check for suspicious patterns
    const suspiciousPatterns = [
      /\d{6,}/, // Long number sequences
      /^(noreply|no-reply|donotreply)/i,
      /^(admin|support|info|contact)\d+$/i
    ];
    
    const hasSuspiciousPattern = suspiciousPatterns.some(pattern => pattern.test(localPart));
    
    // Mock domain age
    const mockDomainAge = Math.floor(Math.random() * 1000);
    const isNewDomain = mockDomainAge < 30;
    
    let riskScore = 0;
    if (isDisposable) riskScore += 3;
    if (hasSuspiciousPattern) riskScore += 2;
    if (isNewDomain) riskScore += 2;
    
    return {
      available: true,
      email,
      domain,
      isDisposable,
      hasSuspiciousPattern,
      domainAge: mockDomainAge,
      isNewDomain,
      riskScore
    };
    
  } catch (error) {
    return { available: false, error: 'Email analysis failed' };
  }
}

// Mock Text Quality Analysis
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
  
  // Check for suspicious patterns
  const textSpeakPattern = /\b(ur|u|pls|plz|thx)\b/gi;
  const textSpeakMatches = text.match(textSpeakPattern);
  if (textSpeakMatches && textSpeakMatches.length > 0) {
    issues.push('Text speak detected');
    qualityScore -= 5 * textSpeakMatches.length;
  }
  
  // Check for repeated letters
  const repeatedLettersPattern = /\b\w*(\w)\1{2,}\w*\b/g;
  const repeatedMatches = text.match(repeatedLettersPattern);
  if (repeatedMatches && repeatedMatches.length > 0) {
    issues.push('Repeated letters pattern');
    qualityScore -= 5 * repeatedMatches.length;
  }
  
  // Simple spelling check (basic)
  const commonMisspellings = {
    'recieve': 'receive',
    'occured': 'occurred',
    'seperate': 'separate',
    'definately': 'definitely',
    'congradulations': 'congratulations'
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

// Mock ML Model Analysis
export async function analyzeWithMLModel(features) {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Simple scoring based on features
  let score = 0;
  
  if (features.keywordScore > 5) score += 0.3;
  if (features.qualityScore < 70) score += 0.2;
  if (features.urlCount > 0) score += 0.1;
  if (features.phoneCount > 0) score += 0.1;
  if (features.emailCount > 0) score += 0.1;
  if (features.capsRatio > 0.3) score += 0.15;
  if (features.exclamationCount > 3) score += 0.1;
  
  const prediction = score >= 0.5 ? 'scam' : 'legitimate';
  const confidence = Math.min(0.95, Math.max(0.1, score));
  
  return {
    available: true,
    prediction,
    confidence,
    features: {
      text_quality: features.qualityScore / 100,
      keyword_density: Math.min(1, features.keywordScore / 10),
      contact_info_present: (features.urlCount + features.phoneCount + features.emailCount) > 0 ? 1 : 0,
      caps_ratio: features.capsRatio,
      exclamation_ratio: Math.min(1, features.exclamationCount / 10)
    }
  };
}
