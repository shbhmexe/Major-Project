'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Find answers to common questions about ScamAlert
            </motion.p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  boxShadow: openIndex === index 
                    ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                }}
              >
                <button
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Still Have Questions */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Can't find the answer you're looking for? Feel free to reach out to our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-block">
                <motion.button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Support
                </motion.button>
              </Link>
              <Link href="/scan" className="inline-block">
                <motion.button
                  className="bg-transparent border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 text-gray-800 dark:text-white font-semibold py-3 px-8 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Scanner
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const faqData = [
  {
    question: "How does ScamAlert detect scams?",
    answer: "ScamAlert uses advanced algorithms to analyze text patterns, linguistic cues, and URLs for signs of common scam techniques. Our system checks for suspicious phrasing, urgency indicators, requests for personal information, and potentially malicious links to determine the likelihood that a message is a scam."
  },
  {
    question: "Is my data safe when I use ScamAlert?",
    answer: "Yes, your data privacy is our priority. Any text you submit for scanning is processed securely and is not stored permanently. We do not collect personal information from the content you scan, and all analysis is done with strict privacy measures in place."
  },
  {
    question: "Can ScamAlert detect all types of scams?",
    answer: "While ScamAlert is highly effective at identifying common scam patterns, new and sophisticated scams emerge regularly. Our system is continuously updated to recognize the latest threats, but we always recommend using ScamAlert as one tool in your security toolkit and maintaining healthy skepticism online."
  },
  {
    question: "How accurate is ScamAlert?",
    answer: "ScamAlert achieves approximately 98% accuracy in detecting known scam patterns. However, false positives and negatives can occur. We provide a detailed explanation with each scan result so you can make an informed decision about the content's legitimacy."
  },
  {
    question: "Is there a limit to how many scans I can perform?",
    answer: "The free version of ScamAlert allows users to perform up to 5 scans per day. For users who need more frequent scanning capabilities, we offer premium plans with unlimited scans and additional features."
  },
  {
    question: "Does ScamAlert work for languages other than English?",
    answer: "Currently, ScamAlert is optimized for English text, but we're working on expanding our language capabilities. Limited support is available for Spanish, French, and German, with more languages planned for future updates."
  },
  {
    question: "How do I report a scam that wasn't detected by ScamAlert?",
    answer: "If you encounter a scam that wasn't properly detected by our system, please use the 'Report Missed Scam' button on the scan results page. Your submissions help us improve our detection algorithms and protect other users."
  }
]; 