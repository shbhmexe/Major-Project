import React from 'react'
import GradientBlinds from './GradientBlinds'

export default function Home() {
  return (
    <div className="min-h-screen absolute inset-0 overflow-hidden z-10">
      {/* Animated Background */}
      <div className="h-screen w-screen  relative inset-0 -z-10 pointer-events-auto">
        <GradientBlinds
          gradientColors={['#FF9FFC', '#5227FF', '#00D4FF', '#FF6B6B']}
          angle={45}
          noise={0.2}
          blindCount={20}
          blindMinWidth={80}
          mouseDampening={0.1}
          spotlightRadius={0.8}
          spotlightSoftness={1.2}
          spotlightOpacity={0.8}
          distortAmount={0.1}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 min-h-screen flex flex-col items-center justify-center p-6 text-white">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Delite Notes
              </h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#features" className="hover:text-purple-200 transition-colors">Features</a>
                <a href="#about" className="hover:text-purple-200 transition-colors">About</a>
              </nav>
            </div>
            <div className="flex space-x-4">
              <a 
                href="/login" 
                className="px-6 py-2 border border-white/30 rounded-full hover:bg-white/10 transition-all duration-200"
              >
                Sign In
              </a>
              <a 
                href="/signup" 
                className="px-6 py-3 bg-white text-purple-900 rounded-full font-semibold hover:bg-purple-100 transition-all duration-200 shadow-lg"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto z-10">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Smooth gradients
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-200 via-cyan-200 to-green-200 bg-clip-text text-transparent">
                make everything better
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto font-medium">
              Experience the future of note-taking with our beautiful, interactive interface. 
              Powered by cutting-edge WebGL technology for stunning visual effects.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a 
              href="/signup" 
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105"
            >
              Get Started Free
            </a>
            <a 
              href="#demo" 
              className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full text-lg hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
            >
              Watch Demo
            </a>
          </div>

          {/* Features Grid - Now Interactive! */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto z-10">
            <div className="group bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🚀</div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-200 transition-colors duration-300">Lightning Fast</h3>
              <p className="text-white/90 group-hover:text-white transition-colors duration-300 font-medium">Built with modern WebGL technology for smooth, responsive performance</p>
            </div>
            
            <div className="group bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 cursor-pointer">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎨</div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-pink-200 transition-colors duration-300">Beautiful UI</h3>
              <p className="text-white/90 group-hover:text-white transition-colors duration-300 font-medium">Stunning gradients and animations that make note-taking a joy</p>
            </div>
            
            <div className="group bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🔒</div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-200 transition-colors duration-300">Secure & Private</h3>
              <p className="text-white/90 group-hover:text-white transition-colors duration-300 font-medium">Your notes are encrypted and protected with industry-standard security</p>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </div>
    </div>
  )
  
}
