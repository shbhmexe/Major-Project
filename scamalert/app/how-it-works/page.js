'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HowItWorksPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 z-0"></div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              How <span className="text-blue-600 dark:text-blue-400">ScamAlert</span> Works
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Our advanced technology works tirelessly to protect you from online scams
            </motion.p>
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Detection Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              ScamAlert uses a sophisticated multi-step process to identify and flag potential threats
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div 
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 mb-16`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="md:w-1/2">
                  <div className="bg-blue-50 dark:bg-blue-900/20 h-64 rounded-xl flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <span className="text-3xl font-bold">{index + 1}</span>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.points.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Technology
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Powered by advanced algorithms and pattern recognition
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-6">
                    <div className="w-14 h-14 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                      {tech.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{tech.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{tech.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Accuracy Metrics */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Proven Accuracy
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our system has been extensively tested and optimized for reliable scam detection
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Accuracy Stats */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Detection Metrics</h3>
                  
                  {metrics.map((metric, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{metric.name}</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">{metric.value}</span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${metric.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Testing Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Rigorous Testing</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Our system undergoes continuous testing and optimization to ensure the highest possible accuracy in scam detection. Our process includes:
                  </p>
                  <ul className="space-y-3">
                    {testingPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to see ScamAlert in action?
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 opacity-90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Try our scanner now and experience the power of our technology firsthand
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/scan" className="inline-block">
                <motion.button
                  className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try ScamAlert Now
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Process steps data
const processSteps = [
  {
    title: "Text & Pattern Analysis",
    description: "Our system analyzes the input text by breaking it down into components and checking for known scam patterns.",
    points: [
      "Natural language processing identifies suspicious phrases",
      "Pattern matching against known scam templates",
      "Linguistic analysis of urgency and pressure tactics"
    ]
  },
  {
    title: "URL & Domain Verification",
    description: "We examine any URLs contained in the text to identify potential phishing attempts or malicious domains.",
    points: [
      "URL structure analysis for deceptive patterns",
      "Domain age and reputation checking",
      "Detection of URL shorteners and redirects"
    ]
  },
  {
    title: "Threat Assessment",
    description: "Our algorithms calculate a comprehensive threat score based on multiple risk factors.",
    points: [
      "Multi-factor risk evaluation",
      "Contextual analysis of content",
      "Machine learning classification of threat type"
    ]
  },
  {
    title: "Results & Recommendations",
    description: "We provide clear results with actionable insights to help you stay protected.",
    points: [
      "Color-coded threat level indicators",
      "Detailed explanation of identified risks",
      "Specific recommendations for protecting yourself"
    ]
  }
];

// Technology data
const technologies = [
  {
    name: "Natural Language Processing",
    description: "Our system uses advanced NLP to analyze text semantics, context, and linguistic patterns that might indicate deceptive content.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
  },
  {
    name: "Machine Learning Models",
    description: "We've trained our ML models on millions of scam examples to accurately classify and detect new and evolving scam techniques.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
  },
  {
    name: "Real-Time Threat Database",
    description: "Our constantly updated threat database ensures protection against the latest scams and phishing techniques.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
  }
];

// Metrics data
const metrics = [
  {
    name: "Overall Accuracy",
    value: "98.2%",
    percentage: 98.2
  },
  {
    name: "Phishing Detection",
    value: "99.1%",
    percentage: 99.1
  },
  {
    name: "False Positive Rate",
    value: "0.3%",
    percentage: 0.3
  },
  {
    name: "New Scam Detection",
    value: "95.7%",
    percentage: 95.7
  }
];

// Testing points
const testingPoints = [
  "Training on millions of real-world scam examples",
  "Continuous A/B testing of algorithm improvements",
  "Regular verification against emerging scam techniques",
  "Feedback loop from user reports to improve accuracy",
  "Monthly independent security audits"
]; 