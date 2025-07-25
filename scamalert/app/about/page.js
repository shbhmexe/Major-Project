'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrambledText from '../components/ScrambledText';

export default function AboutPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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
              <ScrambledText scrambleChars="!@#$%^&*()_+" duration={800} speed={30} radius={15}>
                About <span className="text-blue-600 dark:text-blue-400">ScamAlert</span>
              </ScrambledText>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <ScrambledText scrambleChars="!@#$%^&*()_+" duration={600} speed={25} radius={10}>
                Our mission is to protect users from online scams and create a safer digital environment for everyone.
              </ScrambledText>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block"
            >
              <div className="h-1 w-20 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="relative h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/globe.svg" // Replace with an actual image for your story
                  alt="Our Story"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
              >
                <ScrambledText scrambleChars="!@#$%^&*()_+" duration={700} speed={28} radius={12}>
                  Our Story
                </ScrambledText>
              </motion.h2>
              
              <motion.p 
                variants={fadeIn}
                className="text-lg text-gray-600 dark:text-gray-300 mb-6"
              >
                <ScrambledText scrambleChars="!@#$%^&*()_+" duration={600} speed={25} radius={10}>
                  ScamAlert was founded in 2023 with a singular mission: to protect individuals and businesses from the growing threat of online scams. Our founder experienced firsthand the devastating impact of falling victim to a sophisticated phishing attack, losing valuable data and compromising sensitive information.
                </ScrambledText>
              </motion.p>
              
              <motion.p 
                variants={fadeIn}
                className="text-lg text-gray-600 dark:text-gray-300 mb-6"
              >
                <ScrambledText scrambleChars="!@#$%^&*()_+" duration={600} speed={25} radius={10}>
                  This personal experience fueled the passion to create an accessible tool that anyone could use to verify suspicious messages, emails, and websites before becoming victims themselves.
                </ScrambledText>
              </motion.p>
              
              <motion.p 
                variants={fadeIn}
                className="text-lg text-gray-600 dark:text-gray-300"
              >
                <ScrambledText scrambleChars="!@#$%^&*()_+" duration={600} speed={25} radius={10}>
                  Today, we are proud to have helped millions of users stay safe online, identifying countless scams before they could cause harm.
                </ScrambledText>
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <ScrambledText scrambleChars="!@#$%^&*()_+" duration={700} speed={28} radius={12}>
                Meet Our Team
              </ScrambledText>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              <ScrambledText scrambleChars="!@#$%^&*()_+" duration={600} speed={25} radius={10}>
                Dedicated experts passionate about online security and user protection
              </ScrambledText>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-56 bg-blue-100 dark:bg-blue-900/30">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-bold text-blue-500 dark:text-blue-400">
                      {member.initial}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    <ScrambledText scrambleChars="!@#$%^&*()_+" duration={500} speed={20} radius={8}>
                      {member.name}
                    </ScrambledText>
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 mb-4">
                    <ScrambledText scrambleChars="!@#$%^&*()_+" duration={400} speed={18} radius={6}>
                      {member.role}
                    </ScrambledText>
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <ScrambledText scrambleChars="!@#$%^&*()_+" duration={600} speed={22} radius={8}>
                      {member.bio}
                    </ScrambledText>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <ScrambledText scrambleChars="!@#$%^&*()_+" duration={700} speed={28} radius={12}>
                Our Core Values
              </ScrambledText>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              <ScrambledText scrambleChars="!@#$%^&*()_+" duration={600} speed={25} radius={10}>
                The principles that guide everything we do
              </ScrambledText>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  <ScrambledText scrambleChars="!@#$%^&*()_+" duration={500} speed={22} radius={8}>
                    {value.title}
                  </ScrambledText>
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <ScrambledText scrambleChars="!@#$%^&*()_+" duration={600} speed={24} radius={10}>
                    {value.description}
                  </ScrambledText>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to experience ScamAlert?
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 opacity-90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Join millions of users who trust ScamAlert to keep them safe online.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
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

// Team members data
const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Former cybersecurity expert with 15+ years of experience in identifying and preventing online threats.",
    initial: "AJ"
  },
  {
    name: "Maya Patel",
    role: "Chief Technology Officer",
    bio: "AI specialist with a background in machine learning and natural language processing for security applications.",
    initial: "MP"
  },
  {
    name: "David Lee",
    role: "Head of Research",
    bio: "Dedicated to staying ahead of emerging scam techniques and developing new detection methods.",
    initial: "DL"
  }
];

// Core values data
const values = [
  {
    title: "User Protection",
    description: "We prioritize the safety and security of our users above all else.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Innovation",
    description: "We continuously evolve our technology to stay ahead of sophisticated scam techniques.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Accessibility",
    description: "We believe everyone deserves access to tools that keep them safe online.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: "Education",
    description: "We're committed to educating users about online threats and safe digital practices.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  }
]; 