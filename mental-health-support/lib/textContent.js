// Static text content to avoid using fs module which isn't supported in the browser
export async function loadTextContent() {
  // Return the pre-parsed content object directly
  return STATIC_TEXT_CONTENT;
}

// Pre-parsed content from text.md
const STATIC_TEXT_CONTENT = {
  general_ui: {
    navigation: {
      home: 'Home',
      resources: 'Resources',
      chat: 'AI Chat',
      booking: 'Book Session',
      forum: 'Peer Support',
      profile: 'My Profile',
      login: 'Login',
      signup: 'Sign Up',
      guest: 'Continue as Guest'
    },
    buttons: {
      primary_button: 'Get Started',
      secondary_button: 'Learn More',
      tertiary_button: 'Cancel',
      submit_button: 'Submit',
      back_button: 'Back'
    }
  },
  authentication: {
    login: {
      login_title: 'Welcome Back',
      login_subtitle: 'Sign in to your account to continue your mental health journey',
      email_label: 'Email Address',
      password_label: 'Password',
      forgot_password: 'Forgot Password?',
      login_button: 'Sign In',
      login_guest: 'Continue as Guest',
      login_signup_prompt: 'Don\'t have an account?',
      login_signup_link: 'Sign Up'
    },
    signup: {
      signup_title: 'Create Your Account',
      signup_subtitle: 'Join our community for mental health support',
      name_label: 'Full Name',
      email_label: 'Email Address',
      password_label: 'Password',
      confirm_password_label: 'Confirm Password',
      signup_button: 'Create Account',
      signup_login_prompt: 'Already have an account?',
      signup_login_link: 'Sign In'
    },
    guest_mode: {
      guest_title: 'Anonymous Mode',
      guest_subtitle: 'You\'re browsing anonymously. Create an account to save your progress.',
      guest_signup_prompt: 'Ready to create an account?',
      guest_signup_link: 'Sign Up Now'
    }
  },
  home_page: {
    hero_section: {
      hero_title: 'Your Mental Wellbeing Matters',
      hero_subtitle: 'A safe space for students to seek support, learn coping strategies, and connect with others',
      hero_cta: 'Explore Resources'
    },
    features_section: {
      features_title: 'How We Can Help',
      feature_1_title: 'AI Chat Support',
      feature_1_description: 'Talk to our AI assistant for immediate support and guidance',
      feature_2_title: 'Professional Counseling',
      feature_2_description: 'Book confidential sessions with qualified counselors',
      feature_3_title: 'Educational Resources',
      feature_3_description: 'Access videos, articles, and guides on mental health topics',
      feature_4_title: 'Peer Community',
      feature_4_description: 'Connect with others in a moderated, supportive environment'
    }
  },
  ai_chatbot: {
    chat_interface: {
      chat_title: 'AI Support Assistant',
      chat_subtitle: 'I\'m here to listen and help. What\'s on your mind?',
      chat_placeholder: 'Type your message here...',
      chat_send: 'Send',
      chat_loading: 'Thinking...',
      chat_restart: 'Start New Chat'
    },
    initial_messages: {
      chat_welcome: 'Hi there! I\'m your mental health support assistant. How are you feeling today?',
      chat_options: 'You can talk about your feelings, ask for coping strategies, or learn about mental health resources.',
      chat_disclaimer: 'Remember, I\'m an AI assistant and not a replacement for professional help. If you\'re in crisis, please contact emergency services or talk to a counselor.'
    },
    escalation: {
      chat_escalation: 'It sounds like you might benefit from talking to a professional counselor. Would you like me to help you book a session?',
      chat_escalation_yes: 'Yes, help me book a session',
      chat_escalation_no: 'No, continue chatting'
    }
  },
  booking_system: {
    calendar: {
      booking_title: 'Book a Confidential Session',
      booking_subtitle: 'Schedule a meeting with a counselor or join a support group',
      booking_type_label: 'Session Type',
      booking_type_individual: 'Individual Counseling',
      booking_type_group: 'Group Support',
      booking_date_label: 'Select Date',
      booking_time_label: 'Select Time',
      booking_counselor_label: 'Choose Counselor (Optional)',
      booking_submit: 'Confirm Booking',
      booking_cancel: 'Cancel'
    },
    confirmation: {
      booking_confirmation_title: 'Session Booked',
      booking_confirmation_message: 'Your session has been scheduled. We\'ve sent the details to your email.',
      booking_confirmation_button: 'View My Bookings'
    }
  },
  resource_hub: {
    categories: {
      resources_title: 'Mental Health Resources',
      resources_subtitle: 'Educational materials to support your mental wellbeing',
      category_anxiety: 'Anxiety',
      category_depression: 'Depression',
      category_stress: 'Stress Management',
      category_mindfulness: 'Mindfulness & Meditation',
      category_sleep: 'Sleep Hygiene',
      category_relationships: 'Healthy Relationships',
      category_academic: 'Academic Pressure'
    },
    resource_types: {
      resource_type_video: 'Videos',
      resource_type_audio: 'Audio Guides',
      resource_type_article: 'Articles',
      resource_type_worksheet: 'Worksheets',
      resource_type_infographic: 'Infographics'
    },
    language_selection: {
      language_label: 'Language',
      language_english: 'English',
      language_hindi: 'Hindi',
      language_tamil: 'Tamil',
      language_telugu: 'Telugu',
      language_bengali: 'Bengali',
      language_marathi: 'Marathi'
    }
  },
  peer_support_forum: {
    forum_interface: {
      forum_title: 'Peer Support Community',
      forum_subtitle: 'Connect with others in a safe, moderated space',
      forum_guidelines: 'Community Guidelines',
      forum_new_post: 'Create New Post',
      forum_search: 'Search Discussions'
    },
    post_creation: {
      post_title_label: 'Title',
      post_content_label: 'Share your thoughts',
      post_anonymous_label: 'Post Anonymously',
      post_tags_label: 'Tags',
      post_submit: 'Post to Community',
      post_cancel: 'Cancel'
    },
    interaction: {
      comment_placeholder: 'Write a supportive comment...',
      comment_submit: 'Comment',
      reaction_support: 'Show Support ❤️',
      reaction_thanks: 'Thanks 🙏',
      reaction_same: 'Same Here 👋',
      report_post: 'Report Concern'
    }
  },
  admin_dashboard: {
    analytics: {
      analytics_title: 'Mental Health Trends',
      analytics_subtitle: 'Anonymous aggregated data to inform support strategies',
      analytics_period_label: 'Time Period',
      analytics_period_week: 'Past Week',
      analytics_period_month: 'Past Month',
      analytics_period_quarter: 'Past 3 Months',
      analytics_period_year: 'Past Year'
    },
    metrics: {
      metric_usage: 'Platform Usage',
      metric_topics: 'Common Topics',
      metric_resources: 'Most Accessed Resources',
      metric_satisfaction: 'User Satisfaction',
      metric_outcomes: 'Reported Outcomes'
    }
  },
  accessibility: {
    controls: {
      accessibility_title: 'Accessibility Options',
      text_size_label: 'Text Size',
      text_size_small: 'Small',
      text_size_medium: 'Medium',
      text_size_large: 'Large',
      contrast_label: 'Contrast',
      contrast_normal: 'Normal',
      contrast_high: 'High Contrast',
      animations_label: 'Animations',
      animations_on: 'Enabled',
      animations_reduced: 'Reduced',
      animations_off: 'Disabled',
      dark_mode_label: 'Dark Mode',
      dark_mode_on: 'On',
      dark_mode_off: 'Off',
      voice_assist_label: 'Voice Assistant',
      voice_assist_on: 'Enable',
      voice_assist_off: 'Disable'
    }
  }
};

// Function kept for reference but no longer used
function parseMarkdownToObject(markdownContent) {
  const lines = markdownContent.split('\n');
  const contentObject = {};
  
  let currentSection = null;
  let currentSubsection = null;
  
  for (const line of lines) {
    // Handle section headers (## Section)
    if (line.startsWith('## ')) {
      const sectionName = line.substring(3).trim().toLowerCase().replace(/\s+/g, '_');
      contentObject[sectionName] = {};
      currentSection = sectionName;
      currentSubsection = null;
    }
    // Handle subsection headers (### Subsection)
    else if (line.startsWith('### ') && currentSection) {
      const subsectionName = line.substring(4).trim().toLowerCase().replace(/\s+/g, '_');
      contentObject[currentSection][subsectionName] = {};
      currentSubsection = subsectionName;
    }
    // Handle list items (- key: value)
    else if (line.startsWith('- ') && currentSection && currentSubsection) {
      const match = line.substring(2).match(/^([^:]+):\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        contentObject[currentSection][currentSubsection][key.trim()] = value.trim();
      }
    }
  }
  
  return contentObject;
}

// Client-side cache for text content
let cachedContent = null;

// Function to get text content (client-side compatible)
export function getTextContent() {
  return cachedContent;
}

// Function to set text content in client-side cache
export function setTextContent(content) {
  cachedContent = content;
}

// Function to get a specific text item by path (e.g., "general_ui.navigation.home")
export function getText(path, fallback = '') {
  if (!cachedContent) return fallback;
  
  const parts = path.split('.');
  let current = cachedContent;
  
  for (const part of parts) {
    if (!current[part]) return fallback;
    current = current[part];
  }
  
  return current || fallback;
}