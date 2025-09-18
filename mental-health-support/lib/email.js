import nodemailer from 'nodemailer';

// Create transporter using SMTP configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Accept self-signed certificates
      ciphers: 'SSLv3'
    },
    requireTLS: true,
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 60000, // 60 seconds
  });
};

// Email templates
const getWelcomeEmailTemplate = (userName, userEmail) => {
  return {
    subject: 'Welcome to SukoonU - Your Mental Health Journey Begins Here! 🌟',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Mental Health Support</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
            color: white;
            text-align: center;
            padding: 40px 20px;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 300;
          }
          .content {
            padding: 40px 30px;
          }
          .welcome-message {
            font-size: 18px;
            margin-bottom: 20px;
            color: #4a5568;
          }
          .features {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 25px;
            margin: 25px 0;
          }
          .feature-list {
            list-style: none;
            padding: 0;
          }
          .feature-list li {
            margin: 15px 0;
            padding-left: 30px;
            position: relative;
          }
          .feature-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #48bb78;
            font-weight: bold;
            font-size: 18px;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            margin: 20px 0;
            transition: transform 0.3s ease;
          }
          .cta-button:hover {
            transform: translateY(-2px);
          }
          .footer {
            background-color: #2d3748;
            color: #a0aec0;
            text-align: center;
            padding: 20px;
            font-size: 14px;
          }
          .emoji {
            font-size: 24px;
            margin: 0 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌟 Welcome to SukoonU 🌟</h1>
          </div>
          
          <div class="content">
            <div class="welcome-message">
              <p>Dear <strong>${userName}</strong>,</p>
              <p>Welcome to SukoonU! We're thrilled to have you join our caring community dedicated to supporting mental wellness and personal growth. SukoonU is your safe space for mental health support.</p>
            </div>

            <div class="features">
              <h3 style="color: #4a5568; margin-top: 0;">🚀 Here's what you can do with SukoonU:</h3>
              <ul class="feature-list">
                <li><strong>AI Chat Support:</strong> Talk to our AI assistant for immediate support and guidance</li>
                <li><strong>Educational Resources:</strong> Browse resources and guides on mental health topics in multiple languages</li>
                <li><strong>Professional Counseling:</strong> Book confidential sessions with qualified counselors</li>
                <li><strong>Peer Community:</strong> Connect with others in a moderated, supportive environment</li>
                <li><strong>Safe & Anonymous:</strong> Share your thoughts in a judgment-free environment</li>
                <li><strong>24/7 Accessibility:</strong> Get support whenever you need it</li>
              </ul>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}" class="cta-button">
                Start Your Wellness Journey <span class="emoji">🌱</span>
              </a>
            </div>

            <div style="background-color: #e6fffa; border-left: 4px solid #38b2ac; padding: 15px; margin: 25px 0; border-radius: 4px;">
              <p style="margin: 0; color: #234e52;">
                <strong>💡 Pro Tip:</strong> Take a few minutes to explore your dashboard and set up your preferences for a personalized experience.
              </p>
            </div>

            <p style="color: #718096;">
              If you have any questions or need support, don't hesitate to reach out to our team. We're here to help you on your mental wellness journey.
            </p>

            <p style="color: #718096;">
              Take care of yourself! <span class="emoji">💙</span><br>
              The SukoonU Team
            </p>
          </div>

          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} SukoonU. Supporting your mental wellness journey.</p>
            <p style="margin: 10px 0;">
              <span class="emoji">📧</span> You received this email because you created an account with us.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Welcome to SukoonU!

Dear ${userName},

Welcome to SukoonU! We're thrilled to have you join our caring community dedicated to mental wellness.

Here's what you can do with SukoonU:
✓ AI Chat Support: Talk to our AI assistant for immediate support
✓ Educational Resources: Browse mental health resources in multiple languages
✓ Professional Counseling: Book confidential sessions with qualified counselors
✓ Peer Community: Connect with others in a supportive environment
✓ Safe & Anonymous: Share thoughts in a judgment-free space
✓ 24/7 Accessibility: Get support whenever you need it

Get started: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}

If you have any questions, feel free to reach out!

Take care,
The SukoonU Team
    `
  };
};

// Send welcome email function
export const sendWelcomeEmail = async (userName, userEmail) => {
  try {
    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('SMTP not configured, skipping email send');
      return { success: false, message: 'SMTP not configured' };
    }

    const transporter = createTransporter();
    const emailTemplate = getWelcomeEmailTemplate(userName, userEmail);

    const mailOptions = {
      from: {
        name: 'SukoonU Team',
        address: process.env.SMTP_USER
      },
      to: userEmail,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully:', info.messageId);
    
    return { 
      success: true, 
      messageId: info.messageId,
      message: 'Welcome email sent successfully' 
    };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { 
      success: false, 
      error: error.message,
      message: 'Failed to send welcome email' 
    };
  }
};

// Test email connection
export const testEmailConnection = async () => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return { success: false, message: 'SMTP credentials not configured' };
    }

    const transporter = createTransporter();
    await transporter.verify();
    
    return { success: true, message: 'SMTP connection successful' };
  } catch (error) {
    console.error('SMTP connection test failed:', error);
    return { success: false, error: error.message };
  }
};

const emailService = {
  sendWelcomeEmail,
  testEmailConnection
};

export default emailService;
