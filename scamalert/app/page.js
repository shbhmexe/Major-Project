'use client';

import { useRef, useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrambledText from "./components/ScrambledText";
import RippleGrid from "./components/RippleGrid";
import TiltedCard from "./components/TiltedCard";

export default function Home() {
  return (
    <div className="font-sans min-h-screen overflow-x-hidden ">
      {/* Hero Section - Enhanced and Larger */}
<section className="relative overflow-hidden py-28 sm:py-36 lg:py-52">
        {/* RippleGrid Background Animation - Ensure it's directly accessible for mouse events */}
        <div className="absolute inset-10 z-33 bg-gray-950 pointer-events-">
          <div style={{ height: '100%', position: 'relative' }}>
            <RippleGrid
              gridColor="#008000"
              gridSize={15}
              gridThickness={12}
              rippleIntensity={0.14}
              glowIntensity={0.15}
              opacity={0.9}
              mouseInteractionRadius={1.5}
              mouseInteraction={true}
            />
          </div>
        </div>

        {/* Gradient overlay - allow pointer events to pass through */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 to-gray-950/60 z-20 pointer-events-none"></div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center z-34">
          <motion.div
            className="text-center max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 inline-block"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900/30 text-blue-300 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Advanced AI Protection
              </span>
            </motion.div>

            <motion.div
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.19, 1.0, 0.22, 1.0]
              }}
            >
              <ScrambledText
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight"
                radius={120}
                duration={1.5}
                speed={0.6}
                scrambleChars={":._#@"}
              >
                Stop Scams Before They Stop You
              </ScrambledText>
            </motion.div>

            <motion.div
              className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <ScrambledText
                className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto"
                radius={100}
                duration={1.2}
                speed={0.4}
                scrambleChars={":._#"}
              >
                Our AI-powered scanner detects and alerts you of potential scams in messages, emails, and websites to keep you safe online.
              </ScrambledText>
            </motion.div>

            <motion.div
              className="flex flex-col gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {/* Start Scanning Button */}
              <Link href="/scan">
                <motion.button
                  className="relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-extrabold py-4 px-12 rounded-xl text-xl shadow-xl transition-all duration-300 backdrop-blur-md border border-blue-400/50 hover:shadow-2xl w-full sm:w-auto min-w-[260px] flex items-center justify-center"
                  whileHover={{
                    scale: 1.07,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ScrambledText
                    className="text-xl font-extrabold text-white"
                    radius={60}
                    duration={0.8}
                    speed={0.3}
                    scrambleChars="!@#$%"
                  >
                    Start Scanning
                  </ScrambledText>
                </motion.button>
              </Link>

              {/* Learn More Button */}
              <Link href="/how-it-works">
                <motion.button
                  className="relative bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-extrabold py-4 px-12 rounded-xl text-xl shadow-xl transition-all duration-300 backdrop-blur-md border border-purple-400/50 hover:shadow-2xl w-full sm:w-auto min-w-[260px] flex items-center justify-center"
                  whileHover={{
                    scale: 1.07,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ScrambledText
                    className="text-xl font-extrabold text-white"
                    radius={60}
                    duration={0.8}
                    speed={0.3}
                    scrambleChars="!@#$%"
                  >
                    Learn More
                  </ScrambledText>
                </motion.button>
              </Link>
            </motion.div>

          </motion.div>



          {/* Scroll Down Indicator
          <motion.div
            className="absolute bottom-[-10px]  z-[-1] mb-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm text-gray-400 mb-1">Scroll Down</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div> */}

        </div>
      </section>


      {/* Feature Highlights Section with TiltedCard components in styled boxes */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto text-center mb-16"
        >
          <ScrambledText
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            radius={80}
            duration={1.0}
            speed={0.4}
            scrambleChars="_-=+"
          >
            How It Works
          </ScrambledText>
            <ScrambledText
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              radius={60}
              duration={0.9}
              speed={0.3}
              scrambleChars=".~_"
            >
              Our advanced technology keeps you safe from online threats
            </ScrambledText>
        </motion.div>

        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, staggerChildren: 0.2 }}
        >

          {/* AI-Powered Analysis */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-900 dark:bg-gray-700 rounded-xl shadow-lg p-4 w-full h-[340px] flex items-center justify-center">
              <TiltedCard
                // altText="AI-Powered Analysis"
                // captionText="AI-Powered Analysis"
                containerHeight="300px"
                containerWidth="100%"
                imageHeight="300px"
                imageWidth="100%"
                rotateAmplitude={8}
                scaleOnHover={1.04}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <div className="bg-black/70 backdrop-blur-sm text-white p-6 rounded-lg font-medium leading-relaxed w-full h-full flex flex-col items-center justify-center">
                    <div className="text-blue-400 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <ScrambledText
                      className="text-xl font-bold mb-2"
                      radius={40}
                      duration={0.7}
                      speed={0.2}
                      scrambleChars="01"
                    >
                      AI-Powered Analysis
                    </ScrambledText>
                    <ScrambledText
                      className="text-center"
                      radius={30}
                      duration={0.6}
                      speed={0.2}
                      scrambleChars="._"
                    >
                      Our advanced AI algorithms analyze text patterns and linguistic cues to identify potential scams with high accuracy.
                    </ScrambledText>
                  </div>
                }
              />
            </div>
          </motion.div>

          {/* URL & Domain Detection */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-900 dark:bg-gray-700 rounded-xl shadow-lg p-4 w-full h-[340px] flex items-center justify-center">
              <TiltedCard
                // altText="URL & Domain Detection"
                // captionText="URL & Domain Detection"
                containerHeight="300px"
                containerWidth="100%"
                imageHeight="300px"
                imageWidth="100%"
                rotateAmplitude={8}
                scaleOnHover={1.04}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <div className="bg-black/70 backdrop-blur-sm text-white p-6 rounded-lg font-medium leading-relaxed w-full h-full flex flex-col items-center justify-center">
                    <div className="text-indigo-400 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <ScrambledText
                      className="text-xl font-bold mb-2"
                      radius={40}
                      duration={0.7}
                      speed={0.2}
                      scrambleChars="01"
                    >
                      URL & Domain Detection
                    </ScrambledText>
                    <ScrambledText
                      className="text-center"
                      radius={30}
                      duration={0.6}
                      speed={0.2}
                      scrambleChars="._"
                    >
                      We scan for suspicious URLs, shortened links, and fraudulent domains that could lead to phishing attacks.
                    </ScrambledText>
                  </div>
                }
              />
            </div>
          </motion.div>

          {/* Real-Time Protection */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-gray-900 dark:bg-gray-700 rounded-xl shadow-lg p-4 w-full h-[340px] flex items-center justify-center">
              <TiltedCard
                // altText="Real-Time Protection"
                // captionText="Real-Time Protection"
                containerHeight="300px"
                containerWidth="100%"
                imageHeight="300px"
                imageWidth="100%"
                rotateAmplitude={8}
                scaleOnHover={1.04}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <div className="bg-black/70 backdrop-blur-sm text-white p-6 rounded-lg font-medium leading-relaxed w-full h-full flex flex-col items-center justify-center">
                    <div className="text-cyan-400 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <ScrambledText
                      className="text-xl font-bold mb-2"
                      radius={40}
                      duration={0.7}
                      speed={0.2}
                      scrambleChars="01"
                    >
                      Real-Time Protection
                    </ScrambledText>
                    <ScrambledText
                      className="text-center"
                      radius={30}
                      duration={0.6}
                      speed={0.2}
                      scrambleChars="._"
                    >
                      Get instant feedback on potential threats with clear risk levels and detailed explanations of detected issues.
                    </ScrambledText>
                  </div>
                }
              />
            </div>
          </motion.div>

        </motion.div>
      </section>


      {/* New Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <ScrambledText
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
              radius={80}
              duration={1.0}
              speed={0.4}
              scrambleChars="_-=+"
            >
              Advanced Protection Features
            </ScrambledText>
            <ScrambledText
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              radius={60}
              duration={0.9}
              speed={0.3}
              scrambleChars=".~_"
            >
              Comprehensive security tools to protect you from all types of online threats
            </ScrambledText>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1: Phishing Detection */}
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-red-500 mb-4">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <ScrambledText
                className="text-xl font-bold text-gray-900 dark:text-white mb-2"
                radius={50}
                duration={0.8}
                speed={0.3}
                scrambleChars="!@#"
              >
                Phishing Detection
              </ScrambledText>
              <ScrambledText
                className="text-gray-600 dark:text-gray-300"
                radius={30}
                duration={0.6}
                speed={0.2}
                scrambleChars="._"
              >
                Identifies fake emails and websites that try to steal your personal information
              </ScrambledText>
            </motion.div>

            {/* Feature 2: Malware Scanner */}
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-orange-500 mb-4">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <ScrambledText
                className="text-xl font-bold text-gray-900 dark:text-white mb-2"
                radius={50}
                duration={0.8}
                speed={0.3}
                scrambleChars="!@#"
              >
                Malware Scanner
              </ScrambledText>
              <ScrambledText
                className="text-gray-600 dark:text-gray-300"
                radius={30}
                duration={0.6}
                speed={0.2}
                scrambleChars="._"
              >
                Scans attachments and links for malicious software and viruses
              </ScrambledText>
            </motion.div>

            {/* Feature 3: Social Engineering */}
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-purple-500 mb-4">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <ScrambledText
                className="text-xl font-bold text-gray-900 dark:text-white mb-2"
                radius={50}
                duration={0.8}
                speed={0.3}
                scrambleChars="!@#"
              >
                Social Engineering
              </ScrambledText>
              <ScrambledText
                className="text-gray-600 dark:text-gray-300"
                radius={30}
                duration={0.6}
                speed={0.2}
                scrambleChars="._"
              >
                Detects manipulation tactics used to trick you into sharing sensitive information
              </ScrambledText>
            </motion.div>

            {/* Feature 4: URL Reputation */}
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-green-500 mb-4">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <ScrambledText
                className="text-xl font-bold text-gray-900 dark:text-white mb-2"
                radius={50}
                duration={0.8}
                speed={0.3}
                scrambleChars="!@#"
              >
                URL Reputation
              </ScrambledText>
              <ScrambledText
                className="text-gray-600 dark:text-gray-300"
                radius={30}
                duration={0.6}
                speed={0.2}
                scrambleChars="._"
              >
                Checks website reputation against global threat intelligence databases
              </ScrambledText>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <ScrambledText
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
              radius={70}
              duration={1.0}
              speed={0.4}
              scrambleChars="*&^"
            >
              Trusted by Security Experts
            </ScrambledText>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center opacity-60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Trust indicators - using placeholder text as logos */}
            
            <div className="text-center">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-16 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-600 dark:text-gray-300">CyberSec</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-16 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-600 dark:text-gray-300">TechGuard</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-16 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-600 dark:text-gray-300">SafeNet</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-16 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-600 dark:text-gray-300">SecureIT</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-6"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="text-5xl sm:text-6xl font-bold mb-2"
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.div>
                <motion.div
                  className="text-xl opacity-90"
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <ScrambledText
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              radius={90}
              duration={1.2}
              speed={0.5}
              scrambleChars="~`!@"
            >
              What Our Users Say
            </ScrambledText>
            <motion.p
              className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Trusted by individuals and businesses worldwide
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="flex items-center mb-6">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                    {item.initial}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">"{item.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <ScrambledText
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            radius={80}
            duration={1.0}
            speed={0.4}
            scrambleChars="?!@#"
          >
            Ready to protect yourself from scams?
          </ScrambledText>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Start scanning today and stay one step ahead of scammers.
          </motion.p>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/scan">
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg flex items-center justify-center"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <ScrambledText
                  className="text-lg font-bold text-white"
                  radius={50}
                  duration={0.6}
                  speed={0.3}
                  scrambleChars=">>>"
                >
                  Get Started Now
                </ScrambledText>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// TiltedFeatureCard component
function TiltedFeatureCard({ title, description, icon, iconColor }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full max-w-lg">
        <div className="absolute inset-0 bg-gray-900 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-[1.03] hover:rotate-1">
          <div className="h-full w-full p-6 flex flex-col">
            <div className={`${iconColor} mb-5`}>
              {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-300">{description}</p>
          </div>

          {/* Glowing corners */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-blue-400 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-blue-400 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-blue-400 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-blue-400 rounded-br-lg"></div>
        </div>
      </div>
    </div>
  );
}

// Feature items data
const featureItems = [
  {
    title: "AI-Powered Analysis",
    description: "Our advanced AI algorithms analyze text patterns and linguistic cues to identify potential scams with high accuracy.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  },
  {
    title: "URL & Domain Detection",
    description: "We scan for suspicious URLs, shortened links, and fraudulent domains that could lead to phishing attacks.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
  },
  {
    title: "Real-Time Protection",
    description: "Get instant feedback on potential threats with clear risk levels and detailed explanations of detected issues.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
  }
];

// Stats data
const stats = [
  { value: "10M+", label: "Scams Detected" },
  { value: "98%", label: "Detection Accuracy" },
  { value: "5M+", label: "Users Protected" }
];

// Testimonial data
const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Marketing Executive",
    quote: "ScamAlert saved me from a sophisticated phishing attempt that almost got me. The real-time scanning is impressive!",
    initial: "SJ"
  },
  {
    name: "Michael Chen",
    title: "Small Business Owner",
    quote: "I use ScamAlert to protect my business communications. It's detected multiple scam attempts that looked legitimate.",
    initial: "MC"
  },
  {
    name: "Emily Rodriguez",
    title: "Teacher",
    quote: "As someone who's not tech-savvy, ScamAlert is incredibly easy to use. I recommend it to all my colleagues and students.",
    initial: "ER"
  }
];
