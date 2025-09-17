# AI-Based Internship Recommendation Engine for PM Internship Scheme

A modern, mobile-first web application that provides AI-powered internship recommendations for candidates, specifically designed for rural and low-digital-literacy backgrounds.

## 🚀 Features

### Core Functionality
- **AI-Powered Recommendations**: Intelligent matching algorithm that analyzes candidate profiles (education, skills, location, sector preferences) to provide top 3-5 internship matches
- **Mobile-First Design**: Optimized for low-bandwidth and mobile devices
- **Multilingual Support**: Available in English and Hindi with easy language switching
- **Real-time Matching**: Instant results with visual match percentages

### Key Components
- **Responsive Navbar**: Smooth scrolling navigation with language toggle
- **Hero Section**: Attractive landing area with animated orb background
- **Features Showcase**: Highlighting key benefits with interactive cards
- **How It Works**: 4-step process visualization
- **Smart Recommendation Form**: Comprehensive profile input with sector selection
- **Testimonial Carousel**: Success stories with auto-rotation
- **FAQ Accordion**: Common questions with expandable answers
- **Contact Form**: Multi-channel support information
- **Footer**: Government attribution and important links

### Technical Features
- **WebGL Animated Background**: Beautiful orb animation using OGL library
- **Glass Morphism UI**: Modern backdrop-blur effects
- **Smooth Animations**: Micro-interactions and hover effects
- **Accessibility Support**: ARIA labels, keyboard navigation, high contrast mode
- **SEO Optimized**: Semantic HTML structure
- **Performance Optimized**: Lazy loading and optimized assets

## 🛠 Technology Stack

- **Frontend**: Next.js 15 with JavaScript
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React
- **Animations**: WebGL (OGL library) + CSS transitions
- **State Management**: React Hooks
- **Responsive Design**: Mobile-first approach
- **Authentication**: Firebase Authentication with custom OTP system
- **Chatbot**: Rule-based query handling system

## 🎯 AI Recommendation Algorithm

The recommendation engine uses a weighted scoring system:

- **Education Match (30%)**: Matches candidate education level with internship requirements
- **Sector Preference (25%)**: Aligns with selected industry sectors
- **Skills Match (25%)**: Analyzes skill compatibility using text matching
- **Location Preference (15%)**: Considers geographical proximity or remote options
- **Additional Factors (5%)**: Stipend amount and duration preferences

## 🔧 Recent Fixes

### Authentication System

1. **Email OTP System**
   - Fixed email OTP sending by properly configuring nodemailer
   - Added proper validation for email format
   - Implemented rate limiting for OTP requests
   - Added detailed error messages and attempt tracking
   - Fixed SSL certificate issues for testing

2. **Phone OTP System**
   - Enhanced reCAPTCHA setup in AuthContext
   - Added validation for phone number format
   - Improved error handling with descriptive messages
   - Fixed verification ID tracking

3. **Login/Signup UI**
   - Added success messages for better user feedback
   - Improved reCAPTCHA container styling
   - Added delay before redirect for better user experience
   - Fixed form validation

4. **Chatbot Component**
   - Fixed component props and optional chaining
   - Updated avatar file paths from PNG to SVG
   - Added proper button type attributes

## 🧪 Testing the Application

### API Endpoints for Postman Testing

1. **Send Email OTP**
   - Method: POST
   - URL: http://localhost:3000/api/auth/email-otp
   - Body: `{ "email": "your-email@example.com" }`

2. **Verify Email OTP**
   - Method: PUT
   - URL: http://localhost:3000/api/auth/email-otp
   - Body: `{ "email": "your-email@example.com", "otp": "123456" }`

### Web Interface Testing

1. **Login/Signup**
   - Navigate to http://localhost:3000/login or http://localhost:3000/register
   - Test email login by entering your email and requesting OTP
   - Test phone login by entering your phone number and requesting OTP (requires reCAPTCHA verification)

2. **Chatbot**
   - After login, navigate to the dashboard
   - Test the chatbot by asking questions about internships

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 📱 Mobile Optimization

The application is specifically optimized for rural and low-digital-literacy users:

- **Low Bandwidth**: Optimized images and minimal external dependencies
- **Simple Navigation**: Large touch targets and clear visual hierarchy
- **Fast Loading**: Efficient code splitting and lazy loading
- **Offline Readiness**: Service worker support for basic offline functionality

## 🌐 Multilingual Support

Currently supports:
- **English**: Default language
- **Hindi**: Complete translation of all UI elements

Easy to extend with additional regional languages by updating the translations file.

## 🎨 Design System

### Color Palette
- **Primary**: Purple gradient (#8b5cf6 to #3b82f6)
- **Background**: Dark gradient (slate-900 to purple-900)
- **Accents**: Various purple and blue shades
- **Text**: White with varying opacity levels

### Typography
- **Headings**: Bold, large sizes for hierarchy
- **Body**: Clean, readable font stack
- **Buttons**: Semi-bold with clear labels

## 📊 Sample Data

The application includes 8 sample internships across various sectors:
- Technology
- Healthcare
- Finance
- Education
- Manufacturing
- Agriculture

In production, this would be replaced with real API calls to the PM Internship Scheme database.

## 🤝 Integration with PM Internship Scheme

This application is designed to seamlessly integrate with the existing PM Internship Scheme portal:

- **API Ready**: Built with API integration points for real internship data
- **Government Branding**: Includes proper government attribution
- **Compliance**: Follows government web standards and accessibility guidelines
- **Security**: Prepared for government security requirements

## 📈 Performance

- **Lighthouse Score**: Optimized for 90+ scores in all categories
- **Core Web Vitals**: Meets all Google performance metrics
- **Bundle Size**: Minimal JavaScript for fast loading
- **SEO**: Semantic HTML and meta tags

## 🔒 Security & Privacy

- **Data Protection**: No sensitive data stored client-side
- **Form Validation**: Client and server-side validation
- **Privacy Compliant**: Follows data protection guidelines
- **Secure Headers**: Implemented security best practices

## 🚀 Deployment

Ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Government Cloud Infrastructure**

---

**Made with ❤️ for Bharat** 🇮🇳

*An initiative by the Ministry of Skill Development and Entrepreneurship, Government of India*
