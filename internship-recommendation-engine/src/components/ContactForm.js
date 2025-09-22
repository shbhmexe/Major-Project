'use client';

import { useState } from 'react';
import { Mail, User, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { t } from '@/utils/translations';

export default function ContactForm({ language }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 tablet:py-24 bg-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 tablet:px-8 lg:px-8">
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-12 tablet:p-16">
              <CheckCircle className="w-16 h-16 tablet:w-20 tablet:h-20 text-green-400 mx-auto mb-6 tablet:mb-8" />
              <h3 className="text-2xl tablet:text-3xl font-bold text-white mb-4 tablet:mb-6">
                Message Sent Successfully!
              </h3>
              <p className="text-gray-300 tablet:text-lg">
                Thank you for contacting us. We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 tablet:py-24 bg-white/5 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 tablet:px-8 lg:px-8">
        <div className="grid grid-cols-1 tablet:grid-cols-2 lg:grid-cols-2 gap-12 tablet:gap-16 items-center">
          {/* Left Side - Content */}
          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 tablet:w-20 tablet:h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-6 tablet:mb-8">
              <Mail className="w-8 h-8 tablet:w-10 tablet:h-10 text-white" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl tablet:text-5xl font-bold text-white mb-6 tablet:mb-8">
              {t('contactTitle', language)}
            </h2>
            
            <p className="text-xl tablet:text-2xl text-gray-300 mb-8 tablet:mb-10">
              {t('contactSubtitle', language)}
            </p>

            <div className="space-y-6 tablet:space-y-8">
              <div className="flex items-start space-x-4 tablet:space-x-6">
                <div className="w-12 h-12 tablet:w-14 tablet:h-14 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 tablet:w-7 tablet:h-7 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg tablet:text-xl font-semibold text-white mb-2">Email Support</h3>
                  <p className="text-gray-300 tablet:text-lg">Get help via email within 24 hours</p>
                  <p className="text-purple-200 tablet:text-lg">support@pminternship.gov.in</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 tablet:space-x-6">
                <div className="w-12 h-12 tablet:w-14 tablet:h-14 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 tablet:w-7 tablet:h-7 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg tablet:text-xl font-semibold text-white mb-2">Live Chat</h3>
                  <p className="text-gray-300 tablet:text-lg">Chat with our support team instantly</p>
                  <p className="text-blue-200 tablet:text-lg">Available 9 AM - 6 PM IST</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 tablet:space-x-6">
                <div className="w-12 h-12 tablet:w-14 tablet:h-14 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 tablet:w-7 tablet:h-7 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg tablet:text-xl font-semibold text-white mb-2">Personal Guidance</h3>
                  <p className="text-gray-300 tablet:text-lg">Get one-on-one career counseling</p>
                  <p className="text-green-200 tablet:text-lg">Book a free session</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 tablet:p-10">
              <form onSubmit={handleSubmit} className="space-y-6 tablet:space-y-8">
                {/* Name Field */}
                <div>
                  <label className="block text-white font-semibold mb-3 tablet:mb-4 tablet:text-lg">
                    <User className="inline w-5 h-5 tablet:w-6 tablet:h-6 mr-2" />
                    {t('name', language)}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('namePlaceholder', language)}
                    className="w-full px-4 tablet:px-5 py-3 tablet:py-4 bg-white/10 border border-white/20 rounded-xl text-white tablet:text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-white font-semibold mb-3 tablet:mb-4 tablet:text-lg">
                    <Mail className="inline w-5 h-5 tablet:w-6 tablet:h-6 mr-2" />
                    {t('email', language)}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('emailPlaceholder', language)}
                    className="w-full px-4 tablet:px-5 py-3 tablet:py-4 bg-white/10 border border-white/20 rounded-xl text-white tablet:text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-white font-semibold mb-3 tablet:mb-4 tablet:text-lg">
                    <MessageCircle className="inline w-5 h-5 tablet:w-6 tablet:h-6 mr-2" />
                    {t('message', language)}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('messagePlaceholder', language)}
                    rows={5}
                    className="w-full px-4 tablet:px-5 py-3 tablet:py-4 bg-white/10 border border-white/20 rounded-xl text-white tablet:text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-8 tablet:px-10 py-4 tablet:py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white tablet:text-lg font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {t('sendMessage', language)}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
