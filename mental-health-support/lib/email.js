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
    subject: 'Welcome to Mental Health Support Platform! 🌟',
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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
            <h1>🌟 Welcome to Mental Health Support 🌟</h1>
          </div>
          
          <div class="content">
            <div class="welcome-message">
              <p>Dear <strong>${userName}</strong>,</p>
              <p>Welcome to our Mental Health Support Platform! We're thrilled to have you join our caring community dedicated to supporting mental wellness and personal growth.</p>
            </div>

            <div class="features">
              <h3 style="color: #4a5568; margin-top: 0;">🚀 Here's what you can do on our platform:</h3>
              <ul class="feature-list">
                <li><strong>AI-Powered Support:</strong> Get personalized mental health insights and recommendations</li>
                <li><strong>Safe Space:</strong> Share your thoughts and feelings in a judgment-free environment</li>
                <li><strong>Resource Library:</strong> Access curated mental health resources and exercises</li>
                <li><strong>Community Support:</strong> Connect with others on similar journeys</li>
                <li><strong>Progress Tracking:</strong> Monitor your mental wellness journey over time</li>
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
              The Mental Health Support Team
            </p>
          </div>

          <div class="footer">
            <p>&copy; 2024 Mental Health Support Platform. Supporting your wellness journey.</p>
            <p style="margin: 10px 0;">
              <span class="emoji">📧</span> You received this email because you created an account with us.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Welcome to Mental Health Support Platform!

Dear ${userName},

Welcome to our Mental Health Support Platform! We're thrilled to have you join our caring community.

Here's what you can do on our platform:
✓ AI-Powered Support: Get personalized mental health insights
✓ Safe Space: Share your thoughts in a judgment-free environment
✓ Resource Library: Access curated mental health resources
✓ Community Support: Connect with others on similar journeys
✓ Progress Tracking: Monitor your wellness journey
✓ 24/7 Accessibility: Get support whenever you need it

Get started: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}

If you have any questions, feel free to reach out!

Take care,
The Mental Health Support Team
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
        name: 'Mental Health Support Platform',
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
