import nodemailer from 'nodemailer';

/**
 * Email Service Utility
 * 
 * Centralized email service that handles all email types (OTP, welcome, etc.)
 * using the existing SMTP configuration.
 */
class EmailService {
  constructor() {
    this.transporter = null;
    this.isTransporterReady = false;
    // Track welcome emails sent (in production, use Redis or database)
    this.welcomeEmailsSent = new Map();
  }

  /**
   * Initialize the SMTP transporter with configuration
   */
  createTransporter() {
    if (this.transporter) {
      return this.transporter;
    }

    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USERNAME || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password',
      },
      tls: {
        // Do not fail on invalid certificates for testing
        rejectUnauthorized: false
      }
    });

    return this.transporter;
  }

  /**
   * Verify transporter connection
   */
  async verifyTransporter() {
    const transporter = this.createTransporter();
    
    return new Promise((resolve) => {
      transporter.verify((error) => {
        if (error) {
          console.error('SMTP connection error:', error);
          this.isTransporterReady = false;
          resolve(false);
        } else {
          console.log('SMTP server is ready to send emails');
          this.isTransporterReady = true;
          resolve(true);
        }
      });
    });
  }

  /**
   * Send email with retry logic
   */
  async sendEmailWithRetry(mailOptions, maxRetries = 3) {
    const transporter = this.createTransporter();
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const info = await new Promise((resolve, reject) => {
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(`Email send attempt ${attempt} failed:`, error);
              reject(error);
            } else {
              console.log(`Email sent successfully on attempt ${attempt}:`, info.response);
              resolve(info);
            }
          });
        });
        
        return info;
      } catch (error) {
        if (attempt === maxRetries) {
          throw error;
        }
        
        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        console.log(`Retrying email send in ${delay}ms... (attempt ${attempt + 1})`);
      }
    }
  }

  /**
   * Send welcome email to new user
   */
  async sendWelcomeEmail(userEmail, userName, options = {}) {
    try {
      // Check if welcome email was recently sent (rate limiting)
      // Only send once per day unless forced
      const lastSent = this.welcomeEmailsSent.get(userEmail);
      const now = Date.now();
      const oneDayAgo = now - (24 * 60 * 60 * 1000);
      
      if (lastSent && lastSent > oneDayAgo && !options.force) {
        console.log(`Welcome email already sent to ${userEmail} within 24 hours, skipping`);
        return {
          success: true,
          message: 'Welcome email already sent recently',
          skipped: true
        };
      }
      
      // Verify transporter before sending
      const isReady = await this.verifyTransporter();
      if (!isReady) {
        throw new Error('Email service is currently unavailable');
      }

      const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USERNAME || 'your-email@gmail.com',
        to: userEmail,
        subject: 'Welcome to InternDisha! 🎉',
        html: this.getWelcomeEmailTemplate(userName, userEmail),
      };

      const info = await this.sendEmailWithRetry(mailOptions);
      
      // Track that we sent a welcome email to this user
      this.welcomeEmailsSent.set(userEmail, Date.now());
      
      return {
        success: true,
        message: 'Welcome email sent successfully',
        messageId: info.messageId
      };
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw new Error(`Failed to send welcome email: ${error.message}`);
    }
  }

  /**
   * Send OTP email (keeping existing functionality)
   */
  async sendOTPEmail(userEmail, otp) {
    try {
      // Verify transporter before sending
      const isReady = await this.verifyTransporter();
      if (!isReady) {
        throw new Error('Email service is currently unavailable');
      }

      const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USERNAME || 'your-email@gmail.com',
        to: userEmail,
        subject: 'Your OTP for InternDisha',
        html: this.getOTPEmailTemplate(otp),
      };

      const info = await this.sendEmailWithRetry(mailOptions);
      
      return {
        success: true,
        message: 'OTP email sent successfully',
        messageId: info.messageId
      };
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new Error(`Failed to send OTP email: ${error.message}`);
    }
  }

  /**
   * Get welcome email HTML template
   */
  getWelcomeEmailTemplate(userName, userEmail) {
    const displayName = userName || userEmail.split('@')[0];
    
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to InternDisha</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">🎉 Welcome to InternDisha!</h1>
            <p style="color: #e9d5ff; margin: 10px 0 0 0; font-size: 16px;">Your Gateway to Amazing Internship Opportunities</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Hi ${displayName}! 👋</h2>
            
            <p style="color: #4b5563; line-height: 1.6; font-size: 16px; margin: 0 0 20px 0;">
              We're absolutely thrilled to have you join the <strong>InternDisha</strong> community! You've just taken the first step toward discovering incredible internship opportunities tailored just for you.
            </p>
            
            <div style="background-color: #f8fafc; border-left: 4px solid #6d28d9; padding: 20px; margin: 25px 0; border-radius: 0 4px 4px 0;">
              <h3 style="color: #6d28d9; margin: 0 0 10px 0; font-size: 18px;">🚀 What's Next?</h3>
              <ul style="color: #4b5563; margin: 0; padding-left: 20px; line-height: 1.6;">
                <li>Complete your profile to get personalized recommendations</li>
                <li>Explore thousands of internship opportunities</li>
                <li>Get matched with companies that align with your goals</li>
                <li>Access career resources and tips</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://interndisha.vercel.app'}/dashboard" 
                 style="display: inline-block; background: linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(109, 40, 217, 0.3);">
                🎯 Start Exploring Internships
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 25px 0 0 0; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 25px;">
              Need help getting started? Our support team is here to help you every step of the way.
              <br><br>
              Happy internship hunting! 🌟
              <br>
              <strong>The InternDisha Team</strong>
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
          <p style="margin: 0;">
            You're receiving this email because you recently signed up for InternDisha.
            <br>
            If you didn't create an account, you can safely ignore this email.
          </p>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Get OTP email HTML template (keeping existing functionality)
   */
  getOTPEmailTemplate(otp) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #6d28d9;">InternDisha</h2>
        <p>Hello,</p>
        <p>Your One-Time Password (OTP) for authentication is:</p>
        <div style="background-color: #f3f4f6; padding: 10px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
          ${otp}
        </div>
        <p>This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
        <p>If you didn't request this OTP, please ignore this email.</p>
        <p>Thank you,<br>InternDisha Team</p>
      </div>
    `;
  }
}

// Export a singleton instance
const emailService = new EmailService();
export default emailService;