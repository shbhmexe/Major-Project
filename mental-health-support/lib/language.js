'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Language translations
const translations = {
  en: {
    // Navigation
    home: 'Home',
    resources: 'Resources',
    chat: 'AI Chat',
    booking: 'Book Session',
    forum: 'Peer Support',
    profile: 'My Profile',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    backToHome: 'Back to Home',
    
    // Home page
    appName: 'Manoध्यान',
    heroTitle: 'Your Mental Wellbeing Matters',
    heroSubtitle: 'A safe space for students to seek support, learn coping strategies, and connect with others',
    exploreResources: 'Explore Resources',
    talkToAI: 'Talk to AI Assistant',
    
    // Features
    featuresTitle: 'How We Can Help',
    feature1Title: 'AI Chat Support',
    feature1Desc: 'Talk to our AI assistant for immediate support and guidance',
    feature2Title: 'Educational Resources',
    feature2Desc: 'Browse resources and guides on mental health topics',
    feature3Title: 'Professional Counseling',
    feature3Desc: 'Book confidential sessions with qualified counselors',
    feature4Title: 'Peer Community',
    feature4Desc: 'Connect with others in a moderated, supportive environment',
    
    // Profile
    profileTitle: 'Your Profile',
    name: 'Name',
    email: 'Email',
    emailCannotChange: 'Email cannot be changed',
    updateProfile: 'Update Profile',
    changePhoto: 'Change Photo',
    clickToChangePhoto: 'Click on the image to change your profile photo',
    
    // Messages
    profileUpdated: 'Profile updated successfully',
    photoUpdated: 'Profile photo updated successfully',
    errorSavingFile: 'Error saving file',
    selectImageFile: 'Please select an image file',
    imageSizeLimit: 'Image size should be less than 5MB',
    
    // Language
    language: 'Language',
    selectLanguage: 'Select Language',
    
    // Guest Mode
    anonymousMode: 'Anonymous Mode',
    browssingAnonymously: 'You\'re browsing anonymously. Create an account to save your progress.',
    signUpNow: 'Sign Up Now'
  },
  hi: {
    // Navigation
    home: 'होम',
    resources: 'संसाधन',
    chat: 'AI चैट',
    booking: 'सत्र बुक करें',
    forum: 'साथियों का सहयोग',
    profile: 'मेरी प्रोफ़ाइल',
    login: 'लॉगिन',
    signup: 'साइन अप',
    logout: 'लॉगआउट',
    backToHome: 'होम पर वापस',
    
    // Home page
    appName: 'Manoध्यान',
    heroTitle: 'आपका मानसिक स्वास्थ्य महत्वपूर्ण है',
    heroSubtitle: 'छात्रों के लिए सहायता लेने, सामना करने की रणनीति सीखने और दूसरों से जुड़ने के लिए एक सुरक्षित स्थान',
    exploreResources: 'संसाधन देखें',
    talkToAI: 'AI सहायक से बात करें',
    
    // Features
    featuresTitle: 'हम कैसे मदद कर सकते हैं',
    feature1Title: 'AI चैट सहायता',
    feature1Desc: 'तत्काल सहायता और मार्गदर्शन के लिए हमारे AI सहायक से बात करें',
    feature2Title: 'शैक्षणिक संसाधन',
    feature2Desc: 'मानसिक स्वास्थ्य विषयों पर संसाधन और गाइड देखें',
    feature3Title: 'पेशेवर परामर्श',
    feature3Desc: 'योग्य सलाहकारों के साथ गोपनीय सत्र बुक करें',
    feature4Title: 'साथियों का समुदाय',
    feature4Desc: 'एक नियंत्रित, सहायक वातावरण में दूसरों से जुड़ें',
    
    // Profile
    profileTitle: 'आपकी प्रोफ़ाइल',
    name: 'नाम',
    email: 'ईमेल',
    emailCannotChange: 'ईमेल बदला नहीं जा सकता',
    updateProfile: 'प्रोफ़ाइल अपडेट करें',
    changePhoto: 'फोटो बदलें',
    clickToChangePhoto: 'अपनी प्रोफ़ाइल फोटो बदलने के लिए इमेज पर क्लिक करें',
    
    // Messages
    profileUpdated: 'प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई',
    photoUpdated: 'प्रोफ़ाइल फोटो सफलतापूर्वक अपडेट हो गई',
    errorSavingFile: 'फ़ाइल सहेजने में त्रुटि',
    selectImageFile: 'कृपया एक इमेज फ़ाइल चुनें',
    imageSizeLimit: 'इमेज का आकार 5MB से कम होना चाहिए',
    
    // Language
    language: 'भाषा',
    selectLanguage: 'भाषा चुनें',
    
    // Guest Mode
    anonymousMode: 'गुमनाम मोड',
    browssingAnonymously: 'आप गुमनाम रूप से ब्राउज़ कर रहे हैं। अपनी प्रगति सहेजने के लिए खाता बनाएं।',
    signUpNow: 'अभी साइन अप करें'
  },
  ta: {
    // Navigation
    home: 'முகப்பு',
    resources: 'வளங்கள்',
    chat: 'AI அரட்டை',
    booking: 'அமர்வு முன்பதிவு',
    forum: 'சகாக்களின் ஆதரவு',
    profile: 'என் சுயவிவரம்',
    login: 'உள்நுழைவு',
    signup: 'பதிவு',
    logout: 'வெளியேறு',
    backToHome: 'முகப்புக்கு திரும்பு',
    
    // Home page
    appName: 'Manoध्यान',
    heroTitle: 'உங்கள் மன நலம் முக்கியமானது',
    heroSubtitle: 'மாணவர்கள் ஆதரவு பெற, சமாளிக்கும் உத்திகளை கற்றுக்கொள்ள மற்றும் பிறருடன் இணைவதற்கான பாதுகாப்பான இடம்',
    exploreResources: 'வளங்களை ஆராயுங்கள்',
    talkToAI: 'AI உதவியாளரிடம் பேசுங்கள்',
    
    // Features
    featuresTitle: 'நாங்கள் எப்படி உதவ முடியும்',
    feature1Title: 'AI அரட்டை ஆதரவு',
    feature1Desc: 'உடனடி ஆதரவு மற்றும் வழிகாட்டலுக்காக எங்கள் AI உதவியாளரிடம் பேசுங்கள்',
    feature2Title: 'கல்வி வளங்கள்',
    feature2Desc: 'மன நல தலைப்புகளில் வளங்கள் மற்றும் வழிகாட்டிகளை பாருங்கள்',
    feature3Title: 'தொழில்முறை ஆலோசனை',
    feature3Desc: 'தகுதிவாய்ந்த ஆலோசகர்களுடன் ரகசிய அமர்வுகளை முன்பதிவு செய்யுங்கள்',
    feature4Title: 'சக சமுதாயம்',
    feature4Desc: 'கட்டுப்படுத்தப்பட்ட, ஆதரவான சூழலில் மற்றவர்களுடன் இணைந்துகொள்ளுங்கள்',
    
    // Profile
    profileTitle: 'உங்கள் சுயவிவரம்',
    name: 'பெயர்',
    email: 'மின்னஞ்சல்',
    emailCannotChange: 'மின்னஞ்சலை மாற்ற முடியாது',
    updateProfile: 'சுயவிவரத்தை புதுப்பிக்கவும்',
    changePhoto: 'புகைப்படம் மாற்றவும்',
    clickToChangePhoto: 'உங்கள் சுயவிவர புகைப்படத்தை மாற்ற படத்தில் கிளிக் செய்யவும்',
    
    // Messages
    profileUpdated: 'சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது',
    photoUpdated: 'சுயவிவர புகைப்படம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது',
    errorSavingFile: 'கோப்பை சேமிப்பதில் பிழை',
    selectImageFile: 'தயவுசெய்து ஒரு படக் கோப்பைத் தேர்ந்தெடுக்கவும்',
    imageSizeLimit: 'படத்தின் அளவு 5MB க்கும் குறைவாக இருக்க வேண்டும்',
    
    // Language
    language: 'மொழி',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்'
  },
  kn: {
    // Navigation
    home: 'ಮುಖ್ಯ',
    resources: 'ಸಂಪನ್ಮೂಲಗಳು',
    chat: 'AI ಚಾಟ್',
    booking: 'ಸೆಷನ್ ಬುಕ್ ಮಾಡಿ',
    forum: 'ಸಹೋದ್ಯೋಗಿಗಳ ಬೆಂಬಲ',
    profile: 'ನನ್ನ ಪ್ರೊಫೈಲ್',
    login: 'ಲಾಗಿನ್',
    signup: 'ಸೈನ್ ಅಪ್',
    logout: 'ಲಾಗೌಟ್',
    backToHome: 'ಮುಖ್ಯಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    
    // Home page
    appName: 'Manoध्यान',
    heroTitle: 'ನಿಮ್ಮ ಮಾನಸಿಕ ಯೋಗಕ್ಷೇಮ ಮುಖ್ಯ',
    heroSubtitle: 'ವಿದ್ಯಾರ್ಥಿಗಳು ಬೆಂಬಲ ಪಡೆಯಲು, ನಿಭಾಯಿಸುವ ತಂತ್ರಗಳನ್ನು ಕಲಿಯಲು ಮತ್ತು ಇತರರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಲು ಸುರಕ್ಷಿತ ಸ್ಥಳ',
    exploreResources: 'ಸಂಪನ್ಮೂಲಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    talkToAI: 'AI ಸಹಾಯಕರೊಂದಿಗೆ ಮಾತನಾಡಿ',
    
    // Features
    featuresTitle: 'ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು',
    feature1Title: 'AI ಚಾಟ್ ಬೆಂಬಲ',
    feature1Desc: 'ತಕ್ಷಣದ ಬೆಂಬಲ ಮತ್ತು ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ನಮ್ಮ AI ಸಹಾಯಕರೊಂದಿಗೆ ಮಾತನಾಡಿ',
    feature2Title: 'ಶೈಕ್ಷಣಿಕ ಸಂಪನ್ಮೂಲಗಳು',
    feature2Desc: 'ಮಾನಸಿಕ ಆರೋಗ್ಯ ವಿಷಯಗಳ ಮೇಲೆ ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಮಾರ್ಗದರ್ಶಿಗಳನ್ನು ನೋಡಿ',
    feature3Title: 'ವೃತ್ತಿಪರ ಸಲಹೆ',
    feature3Desc: 'ಅರ್ಹ ಸಲಹೆಗಾರರೊಂದಿಗೆ ಗೌಪ್ಯ ಸೆಷನ್‌ಗಳನ್ನು ಬುಕ್ ಮಾಡಿ',
    feature4Title: 'ಸಹ ಸಮುದಾಯ',
    feature4Desc: 'ನಿಯಂತ್ರಿತ, ಬೆಂಬಲ ಪರಿಸರದಲ್ಲಿ ಇತರರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ',
    
    // Profile
    profileTitle: 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್',
    name: 'ಹೆಸರು',
    email: 'ಇಮೇಲ್',
    emailCannotChange: 'ಇಮೇಲ್ ಅನ್ನು ಬದಲಾಯಿಸಲಾಗುವುದಿಲ್ಲ',
    updateProfile: 'ಪ್ರೊಫೈಲ್ ಅಪ್‌ಡೇಟ್ ಮಾಡಿ',
    changePhoto: 'ಫೋಟೋ ಬದಲಾಯಿಸಿ',
    clickToChangePhoto: 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಫೋಟೋವನ್ನು ಬದಲಾಯಿಸಲು ಚಿತ್ರದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ',
    
    // Messages
    profileUpdated: 'ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ಅಪ್‌ಡೇಟ್ ಆಗಿದೆ',
    photoUpdated: 'ಪ್ರೊಫೈಲ್ ಫೋಟೋ ಯಶಸ್ವಿಯಾಗಿ ಅಪ್‌ಡೇಟ್ ಆಗಿದೆ',
    errorSavingFile: 'ಫೈಲ್ ಉಳಿಸುವಲ್ಲಿ ದೋಷ',
    selectImageFile: 'ದಯವಿಟ್ಟು ಒಂದು ಇಮೇಜ್ ಫೈಲ್ ಆಯ್ಕೆ ಮಾಡಿ',
    imageSizeLimit: 'ಇಮೇಜ್ ಗಾತ್ರವು 5MB ಗಿಂತ ಕಡಿಮೆ ಇರಬೇಕು',
    
    // Language
    language: 'ಭಾಷೆ',
    selectLanguage: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ'
  },
  ur: {
    // Navigation
    home: 'ہوم',
    resources: 'وسائل',
    chat: 'AI چیٹ',
    booking: 'سیشن بک کریں',
    forum: 'ہم عمروں کی مدد',
    profile: 'میری پروفائل',
    login: 'لاگ ان',
    signup: 'سائن اپ',
    logout: 'لاگ آؤٹ',
    backToHome: 'ہوم واپس',
    
    // Home page
    appName: 'Manoध्यान',
    heroTitle: 'آپ کی ذہنی صحت اہم ہے',
    heroSubtitle: 'طلباء کے لیے مدد حاصل کرنے، نپٹنے کی حکمت عملیوں کو سیکھنے اور دوسروں سے جڑنے کے لیے محفوظ جگہ',
    exploreResources: 'وسائل دیکھیں',
    talkToAI: 'AI اسسٹنٹ سے بات کریں',
    
    // Features
    featuresTitle: 'ہم کیسے مدد کر سکتے ہیں',
    feature1Title: 'AI چیٹ سپورٹ',
    feature1Desc: 'فوری مدد اور رہنمائی کے لیے ہمارے AI اسسٹنٹ سے بات کریں',
    feature2Title: 'تعلیمی وسائل',
    feature2Desc: 'ذہنی صحت کے موضوعات پر وسائل اور گائیڈز دیکھیں',
    feature3Title: 'پیشہ ورانہ مشاورت',
    feature3Desc: 'اہل مشیروں کے ساتھ خفیہ سیشن بک کریں',
    feature4Title: 'ہم عمر کمیونٹی',
    feature4Desc: 'کنٹرولڈ، معاون ماحول میں دوسروں سے جڑیں',
    
    // Profile
    profileTitle: 'آپ کی پروفائل',
    name: 'نام',
    email: 'ای میل',
    emailCannotChange: 'ای میل تبدیل نہیں کیا جا سکتا',
    updateProfile: 'پروفائل اپ ڈیٹ کریں',
    changePhoto: 'فوٹو تبدیل کریں',
    clickToChangePhoto: 'اپنی پروفائل فوٹو تبدیل کرنے کے لیے تصویر پر کلک کریں',
    
    // Messages
    profileUpdated: 'پروفائل کامیابی سے اپ ڈیٹ ہو گیا',
    photoUpdated: 'پروفائل فوٹو کامیابی سے اپ ڈیٹ ہو گیا',
    errorSavingFile: 'فائل محفوظ کرنے میں خرابی',
    selectImageFile: 'براہ کرم ایک تصویری فائل منتخب کریں',
    imageSizeLimit: 'تصویر کا سائز 5MB سے کم ہونا چاہیے',
    
    // Language
    language: 'زبان',
    selectLanguage: 'زبان منتخب کریں'
  },
  bn: {
    // Navigation
    home: 'হোম',
    resources: 'রিসোর্স',
    chat: 'AI চ্যাট',
    booking: 'সেশন বুক করুন',
    forum: 'সাথী সাহায্য',
    profile: 'আমার প্রোফাইল',
    login: 'লগইন',
    signup: 'সাইন আপ',
    logout: 'লগআউট',
    backToHome: 'হোমে ফিরুন',
    
    // Home page
    appName: 'Manoध्यान',
    heroTitle: 'আপনার মানসিক স্বাস্থ্য গুরুত্বপূর্ণ',
    heroSubtitle: 'শিক্ষার্থীদের জন্য সাহায্য পেতে, মোকাবেলার কৌশল শিখতে এবং অন্যদের সাথে সংযোগ করার জন্য নিরাপদ স্থান',
    exploreResources: 'রিসোর্স দেখুন',
    talkToAI: 'AI সহায়কের সাথে কথা বলুন',
    
    // Features
    featuresTitle: 'আমরা কিভাবে সাহায্য করতে পারি',
    feature1Title: 'AI চ্যাট সাহায্য',
    feature1Desc: 'তাৎক্ষণিক সাহায্য এবং নির্দেশনার জন্য আমাদের AI সহায়কের সাথে কথা বলুন',
    feature2Title: 'শিক্ষামূলক রিসোর্স',
    feature2Desc: 'মানসিক স্বাস্থ্য বিষয়ে রিসোর্স এবং গাইড দেখুন',
    feature3Title: 'পেশাদার পরামর্শ',
    feature3Desc: 'যোগ্য পরামর্শদাতাদের সাথে গোপনীয় সেশন বুক করুন',
    feature4Title: 'সাথী সম্প্রদায়',
    feature4Desc: 'নিয়ন্ত্রিত, সহায়ক পরিবেশে অন্যদের সাথে সংযোগ করুন',
    
    // Profile
    profileTitle: 'আপনার প্রোফাইল',
    name: 'নাম',
    email: 'ইমেইল',
    emailCannotChange: 'ইমেইল পরিবর্তন করা যাবে না',
    updateProfile: 'প্রোফাইল আপডেট করুন',
    changePhoto: 'ফটো পরিবর্তন করুন',
    clickToChangePhoto: 'আপনার প্রোফাইল ফটো পরিবর্তন করতে ছবিতে ক্লিক করুন',
    
    // Messages
    profileUpdated: 'প্রোফাইল সফলভাবে আপডেট হয়েছে',
    photoUpdated: 'প্রোফাইল ফটো সফলভাবে আপডেট হয়েছে',
    errorSavingFile: 'ফাইল সেভ করতে ত্রুটি',
    selectImageFile: 'অনুগ্রহ করে একটি ছবির ফাইল নির্বাচন করুন',
    imageSizeLimit: 'ছবির আকার 5MB এর চেয়ে কম হতে হবে',
    
    // Language
    language: 'ভাষা',
    selectLanguage: 'ভাষা নির্বাচন করুন'
  },
  mr: {
    // Navigation
    home: 'होम',
    resources: 'संसाधने',
    chat: 'AI चॅट',
    booking: 'सत्र बुक करा',
    forum: 'सहकाऱ्यांचे समर्थन',
    profile: 'माझे प्रोफाइल',
    login: 'लॉगिन',
    signup: 'साइन अप',
    logout: 'लॉगआउट',
    backToHome: 'होमवर परत',
    
    // Home page
    appName: 'Manoध्यान',
    heroTitle: 'तुमचे मानसिक आरोग्य महत्वाचे आहे',
    heroSubtitle: 'विद्यार्थ्यांना मदत मिळवण्यासाठी, सामना करण्याच्या धोरणे शिकण्यासाठी आणि इतरांशी जोडणी करण्यासाठी सुरक्षित जागा',
    exploreResources: 'संसाधने पहा',
    talkToAI: 'AI सहाय्यकाशी बोला',
    
    // Features
    featuresTitle: 'आम्ही कशी मदत करू शकतो',
    feature1Title: 'AI चॅट समर्थन',
    feature1Desc: 'तत्काळ मदत आणि मार्गदर्शनासाठी आमच्या AI सहाय्यकाशी बोला',
    feature2Title: 'शैक्षणिक संसाधने',
    feature2Desc: 'मानसिक आरोग्य विषयांवरील संसाधने आणि मार्गदर्शक पहा',
    feature3Title: 'व्यावसायिक सल्ला',
    feature3Desc: 'पात्र सल्लागारांसोबत गुप्त सत्रे बुक करा',
    feature4Title: 'सहकारी समुदाय',
    feature4Desc: 'नियंत्रित, सहायक वातावरणात इतरांशी जोडा',
    
    // Profile
    profileTitle: 'तुमचे प्रोफाइल',
    name: 'नाव',
    email: 'ईमेल',
    emailCannotChange: 'ईमेल बदलता येत नाही',
    updateProfile: 'प्रोफाइल अपडेट करा',
    changePhoto: 'फोटो बदला',
    clickToChangePhoto: 'तुमचा प्रोफाइल फोटो बदलण्यासाठी प्रतिमेवर क्लिक करा',
    
    // Messages
    profileUpdated: 'प्रोफाइल यशस्वीरित्या अपडेट झाले',
    photoUpdated: 'प्रोफाइल फोटो यशस्वीरित्या अपडेट झाला',
    errorSavingFile: 'फाइल सेव्ह करताना त्रुटी',
    selectImageFile: 'कृपया एक प्रतिमा फाइल निवडा',
    imageSizeLimit: 'प्रतिमेचा आकार 5MB पेक्षा कमी असावा',
    
    // Language
    language: 'भाषा',
    selectLanguage: 'भाषा निवडा'
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('mh_language');
    if (saved && translations[saved]) {
      setCurrentLanguage(saved);
    }
  }, []);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setCurrentLanguage(lang);
      localStorage.setItem('mh_language', lang);
    }
  };

  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      changeLanguage,
      t,
      languages: [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
        { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
        { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
        { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
        { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
        { code: 'mr', name: 'Marathi', nativeName: 'मराठी' }
      ]
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}