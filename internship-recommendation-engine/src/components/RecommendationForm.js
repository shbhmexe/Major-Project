'use client';

import { useState } from 'react';
import { Search, MapPin, GraduationCap, Briefcase, Clock, IndianRupee, ExternalLink } from 'lucide-react';
import { t } from '@/utils/translations';

// Sample internship data (in real app, this would come from an API)
const sampleInternships = [
  {
    id: 1,
    title: 'Software Development Intern',
    company: 'TechCorp India',
    location: 'Bangalore, Karnataka',
    duration: '6 months',
    stipend: '₹25,000/month',
    sectors: ['technology'],
    requirements: ['undergraduate', 'graduate'],
    skills: ['javascript', 'react', 'node.js', 'python', 'programming'],
    description: 'Work on cutting-edge web applications and gain hands-on experience with modern technologies.',
    remote: true
  },
  {
    id: 2,
    title: 'Digital Marketing Intern',
    company: 'Marketing Solutions Ltd',
    location: 'Mumbai, Maharashtra',
    duration: '4 months',
    stipend: '₹20,000/month',
    sectors: ['marketing', 'technology'],
    requirements: ['undergraduate', 'graduate'],
    skills: ['social media', 'content writing', 'seo', 'analytics', 'marketing'],
    description: 'Learn digital marketing strategies and work with leading brands.',
    remote: true
  },
  {
    id: 3,
    title: 'Healthcare Assistant Intern',
    company: 'HealthPlus Hospitals',
    location: 'Delhi, NCR',
    duration: '3 months',
    stipend: '₹18,000/month',
    sectors: ['healthcare'],
    requirements: ['highSchool', 'undergraduate'],
    skills: ['communication', 'patient care', 'basic medical knowledge', 'empathy'],
    description: 'Support healthcare professionals and gain valuable medical field experience.',
    remote: false
  },
  {
    id: 4,
    title: 'Financial Analysis Intern',
    company: 'FinanceFirst Bank',
    location: 'Hyderabad, Telangana',
    duration: '6 months',
    stipend: '₹30,000/month',
    sectors: ['finance'],
    requirements: ['graduate', 'postgraduate'],
    skills: ['excel', 'financial analysis', 'accounting', 'data analysis', 'mathematics'],
    description: 'Learn financial modeling and analysis in a leading banking institution.',
    remote: true
  },
  {
    id: 5,
    title: 'Agricultural Innovation Intern',
    company: 'AgriTech Solutions',
    location: 'Pune, Maharashtra',
    duration: '5 months',
    stipend: '₹22,000/month',
    sectors: ['agriculture', 'technology'],
    requirements: ['undergraduate', 'graduate'],
    skills: ['agriculture', 'technology', 'research', 'innovation', 'sustainability'],
    description: 'Work on innovative agricultural solutions and sustainable farming practices.',
    remote: false
  },
  {
    id: 6,
    title: 'Manufacturing Process Intern',
    company: 'Industrial Corp',
    location: 'Chennai, Tamil Nadu',
    duration: '4 months',
    stipend: '₹24,000/month',
    sectors: ['manufacturing'],
    requirements: ['undergraduate', 'graduate'],
    skills: ['manufacturing', 'process improvement', 'quality control', 'engineering', 'teamwork'],
    description: 'Learn manufacturing processes and quality control in a leading industrial company.',
    remote: false
  },
  {
    id: 7,
    title: 'Education Technology Intern',
    company: 'EduInnovate',
    location: 'Kolkata, West Bengal',
    duration: '4 months',
    stipend: '₹20,000/month',
    sectors: ['education', 'technology'],
    requirements: ['undergraduate', 'graduate'],
    skills: ['teaching', 'technology', 'content creation', 'communication', 'creativity'],
    description: 'Develop educational content and work with innovative learning technologies.',
    remote: true
  },
  {
    id: 8,
    title: 'Rural Development Intern',
    company: 'Development Foundation',
    location: 'Jaipur, Rajasthan',
    duration: '6 months',
    stipend: '₹18,000/month',
    sectors: ['social work', 'agriculture'],
    requirements: ['undergraduate', 'graduate'],
    skills: ['community work', 'communication', 'project management', 'social awareness', 'leadership'],
    description: 'Work on rural development projects and community empowerment initiatives.',
    remote: false
  }
];

export default function RecommendationForm({ 
  language, 
  setShowRecommendations, 
  setRecommendations,
  showRecommendations,
  recommendations 
}) {
  const [formData, setFormData] = useState({
    education: '',
    skills: '',
    sectors: [],
    location: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const educationOptions = [
    { value: 'highSchool', label: t('highSchool', language) },
    { value: 'undergraduate', label: t('undergraduate', language) },
    { value: 'graduate', label: t('graduate', language) },
    { value: 'postgraduate', label: t('postgraduate', language) }
  ];

  const sectorOptions = [
    { value: 'technology', label: t('technology', language) },
    { value: 'healthcare', label: t('healthcare', language) },
    { value: 'finance', label: t('finance', language) },
    { value: 'education', label: t('education', language) },
    { value: 'manufacturing', label: t('manufacturing', language) },
    { value: 'agriculture', label: t('agriculture', language) }
  ];

  // AI-powered recommendation algorithm
  const generateRecommendations = (userProfile) => {
    const userSkills = userProfile.skills.toLowerCase().split(',').map(skill => skill.trim());
    const userSectors = userProfile.sectors;
    const userEducation = userProfile.education;
    const userLocation = userProfile.location.toLowerCase();

    // Score each internship based on multiple factors
    const scoredInternships = sampleInternships.map(internship => {
      let score = 0;
      
      // Education match (30% weight)
      if (internship.requirements.includes(userEducation)) {
        score += 30;
      }
      
      // Sector match (25% weight)
      const sectorMatches = internship.sectors.filter(sector => userSectors.includes(sector)).length;
      score += (sectorMatches / internship.sectors.length) * 25;
      
      // Skills match (25% weight)
      const skillMatches = internship.skills.filter(skill => 
        userSkills.some(userSkill => skill.includes(userSkill) || userSkill.includes(skill))
      ).length;
      score += (skillMatches / Math.max(internship.skills.length, 1)) * 25;
      
      // Location preference (15% weight)
      if (userLocation && internship.location.toLowerCase().includes(userLocation)) {
        score += 15;
      } else if (internship.remote) {
        score += 10; // Remote work gets partial location score
      }
      
      // Additional factors (5% weight)
      // Prefer internships with higher stipends
      const stipendAmount = parseInt(internship.stipend.replace(/[₹,\/month]/g, ''));
      if (stipendAmount >= 25000) score += 3;
      else if (stipendAmount >= 20000) score += 2;
      else if (stipendAmount >= 15000) score += 1;
      
      // Prefer longer duration internships
      const duration = parseInt(internship.duration);
      if (duration >= 6) score += 2;
      else if (duration >= 4) score += 1;
      
      return { ...internship, score };
    });

    // Sort by score and return top 5
    return scoredInternships
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const recommendedInternships = generateRecommendations(formData);
    setRecommendations(recommendedInternships);
    setShowRecommendations(true);
    setIsLoading(false);
    
    // Scroll to results
    setTimeout(() => {
      const element = document.getElementById('recommendations-results');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSectorChange = (sector) => {
    setFormData(prev => ({
      ...prev,
      sectors: prev.sectors.includes(sector)
        ? prev.sectors.filter(s => s !== sector)
        : [...prev.sectors, sector]
    }));
  };

  return (
    <section id="recommendation-form" className="py-20 bg-black/20 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('findInternships', language)}
          </h2>
          <p className="text-xl text-gray-300">
            Tell us about yourself and let our AI find the perfect matches
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6"></div>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Education Level */}
            <div>
              <label className="block text-white font-semibold mb-4 text-lg">
                <GraduationCap className="inline w-5 h-5 mr-2" />
                {t('education', language)}
              </label>
              <select
                value={formData.education}
                onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">{t('selectEducation', language)}</option>
                {educationOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-gray-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-white font-semibold mb-4 text-lg">
                <Briefcase className="inline w-5 h-5 mr-2" />
                {t('skills', language)}
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                placeholder={t('skillsPlaceholder', language)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <p className="text-gray-400 text-sm mt-2">
                e.g., JavaScript, Python, Marketing, Communication, Data Analysis
              </p>
            </div>

            {/* Preferred Sectors */}
            <div>
              <label className="block text-white font-semibold mb-4 text-lg">
                <Search className="inline w-5 h-5 mr-2" />
                {t('sectors', language)}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {sectorOptions.map(sector => (
                  <button
                    key={sector.value}
                    type="button"
                    onClick={() => handleSectorChange(sector.value)}
                    className={`px-4 py-3 rounded-xl border-2 font-medium transition-all duration-200 ${
                      formData.sectors.includes(sector.value)
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30'
                    }`}
                  >
                    {sector.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-white font-semibold mb-4 text-lg">
                <MapPin className="inline w-5 h-5 mr-2" />
                {t('location', language)}
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder={t('locationPlaceholder', language)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="text-gray-400 text-sm mt-2">
                e.g., Mumbai, Delhi, Bangalore, or leave empty for remote opportunities
              </p>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Analyzing Your Profile...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    {t('getRecommendations', language)}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Recommendations Results */}
        {showRecommendations && (
          <div id="recommendations-results" className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                {t('recommendations', language)}
              </h3>
              <p className="text-gray-300">
                Based on your profile, here are the top {recommendations.length} internship matches
              </p>
            </div>

            <div className="grid gap-6">
              {recommendations.map((internship, index) => (
                <div
                  key={internship.id}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-full text-sm mr-3">
                              {index + 1}
                            </span>
                            <h4 className="text-xl font-semibold text-white">
                              {internship.title}
                            </h4>
                          </div>
                          <p className="text-purple-200 font-medium mb-2">
                            {internship.company}
                          </p>
                        </div>
                        <div className="text-right text-sm text-gray-400">
                          Match: {Math.round(internship.score)}%
                        </div>
                      </div>

                      <p className="text-gray-300 mb-4">
                        {internship.description}
                      </p>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center text-gray-300">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm">{internship.location}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="text-sm">{internship.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <IndianRupee className="w-4 h-4 mr-2" />
                          <span className="text-sm">{internship.stipend}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Briefcase className="w-4 h-4 mr-2" />
                          <span className="text-sm capitalize">{internship.sectors.join(', ')}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {internship.skills.slice(0, 4).map(skill => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                        {internship.skills.length > 4 && (
                          <span className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full text-sm">
                            +{internship.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:ml-6">
                      <button className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t('applyNow', language)}
                      </button>
                      <button className="inline-flex items-center justify-center px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200">
                        {t('viewDetails', language)}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
