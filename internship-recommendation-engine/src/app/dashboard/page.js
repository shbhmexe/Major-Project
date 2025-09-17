'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import RecommendationForm from '@/components/RecommendationForm';
import Footer from '@/components/Footer';
import Orb from '@/components/Orb';
import ProtectedRoute from '@/components/ProtectedRoute';
import { t } from '@/utils/translations';
import { 
  User, 
  Briefcase, 
  MapPin, 
  GraduationCap, 
  Star, 
  TrendingUp,
  Clock,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const statsVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 100
    }
  }
};

export default function Dashboard() {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  
  const { user, isAuthenticated, logout, language, setLanguage } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  // Generate user stats based on user data
  const userStats = {
    applicationsSubmitted: user ? Math.floor(Math.random() * 15) : 0,
    interviewsScheduled: user ? Math.floor(Math.random() * 8) : 0,
    offersReceived: user ? Math.floor(Math.random() * 3) : 0,
    profileCompleteness: user ? Math.floor(Math.random() * 20) + 80 : 0
  };

  const recentActivity = user ? [
    { action: 'Applied to Software Development Intern', company: 'TechCorp India', time: '2 hours ago' },
    { action: 'Profile viewed by', company: 'Marketing Solutions Ltd', time: '1 day ago' },
    { action: 'Completed skills assessment', company: 'System', time: '3 days ago' },
    { action: 'Updated profile information', company: 'System', time: '1 week ago' }
  ] : [];

  // Chart data for analytics
  const applicationTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Applications',
        data: [2, 4, 3, 8, 12, 15],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const skillsDistributionData = {
    labels: ['Programming', 'Design', 'Marketing', 'Data Science', 'Other'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(147, 51, 234, 0.8)',
          'rgba(59, 130, 246, 0.8)', 
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.2)'
      }
    ]
  };

  const interviewSuccessData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Interview Success Rate',
        data: [65, 70, 80, 75, 85],
        backgroundColor: 'rgba(147, 51, 234, 0.6)',
        borderColor: 'rgb(147, 51, 234)',
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          padding: 15
        }
      }
    }
  };

  return (
    <ProtectedRoute>
      <motion.div 
        className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Enhanced Background Orbs */}
        <div className="fixed inset-0 z-0">
        {/* Main Orb */}
        <div className="absolute inset-0 opacity-25">
          <Orb
            hue={270}
            hoverIntensity={0.4}
            rotateOnHover={true}
            forceHoverState={false}
          />
        </div>
        
        {/* Secondary Orb */}
        <div className="absolute inset-0 opacity-15 transform translate-x-1/2 -translate-y-1/4 scale-60">
          <Orb
            hue={240}
            hoverIntensity={0.2}
            rotateOnHover={false}
            forceHoverState={true}
          />
        </div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-purple-900/5 to-transparent pointer-events-none"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navbar language={language} setLanguage={setLanguage} />
        
        {/* Dashboard Header */}
        <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6 lg:mb-0 w-full lg:w-auto">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 break-words">
                      {t('Welcome back', language)}, {user.displayName || user.email?.split('@')[0] || 'User'}!
                    </h1>
                    <p className="text-sm sm:text-base text-gray-300 mb-1">
                      {t('Ready to find your next internship?', language)}
                    </p>
                    <div className="text-xs sm:text-sm text-gray-400 space-y-1">
                      {user.email && <p className="break-all">Email: {user.email}</p>}
                      {user.phoneNumber && <p>Phone: {user.phoneNumber}</p>}
                    </div>
                  </div>
                </div>
                
                {/* Profile Completeness */}
                {user.role === 'candidate' && (
                  <div className="w-full lg:w-auto lg:text-right mt-4 lg:mt-0">
                    <div className="text-sm text-gray-300 mb-2">{t('Profile Completeness', language)}</div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 sm:w-32 bg-gray-600 rounded-full h-2 flex-1 lg:flex-none">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${userStats.profileCompleteness}%` }}
                        ></div>
                      </div>
                      <span className="text-white font-semibold text-sm sm:text-base">{userStats.profileCompleteness}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Grid - For Candidates */}
            {user.role === 'candidate' && (
              <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8" variants={containerVariants}>
                <motion.div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4 lg:p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer" variants={statsVariants} whileHover={{ scale: 1.05 }}>
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-300 text-xs sm:text-sm">{t('Applications', language)}</p>
                      <motion.p className="text-lg sm:text-xl lg:text-2xl font-bold text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        {userStats.applicationsSubmitted}
                      </motion.p>
                    </div>
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="flex-shrink-0">
                      <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-400" />
                    </motion.div>
                  </div>
                </motion.div>
                
                <motion.div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4 lg:p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer" variants={statsVariants} whileHover={{ scale: 1.05 }}>
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-300 text-xs sm:text-sm">{t('Interviews', language)}</p>
                      <motion.p className="text-lg sm:text-xl lg:text-2xl font-bold text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        {userStats.interviewsScheduled}
                      </motion.p>
                    </div>
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="flex-shrink-0">
                      <Clock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-400" />
                    </motion.div>
                  </div>
                </motion.div>
                
                <motion.div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4 lg:p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer" variants={statsVariants} whileHover={{ scale: 1.05 }}>
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-300 text-xs sm:text-sm">Offers</p>
                      <motion.p className="text-lg sm:text-xl lg:text-2xl font-bold text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        {userStats.offersReceived}
                      </motion.p>
                    </div>
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="flex-shrink-0">
                      <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-400" />
                    </motion.div>
                  </div>
                </motion.div>
                
                <motion.div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4 lg:p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer" variants={statsVariants} whileHover={{ scale: 1.05 }}>
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-300 text-xs sm:text-sm">Profile Views</p>
                      <motion.p className="text-lg sm:text-xl lg:text-2xl font-bold text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                        12
                      </motion.p>
                    </div>
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="flex-shrink-0">
                      <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-yellow-400" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Analytics Charts Section - For Candidates */}
            {user.role === 'candidate' && (
              <motion.div className="mb-8" variants={itemVariants}>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-purple-400" />
                  Analytics Dashboard
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <motion.div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-6" whileHover={{ scale: 1.02 }}>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center">
                      <Activity className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-400" />
                      Application Trends
                    </h3>
                    <div className="h-48 sm:h-56 lg:h-64">
                      <Line data={applicationTrendData} options={chartOptions} />
                    </div>
                  </motion.div>
                  
                  <motion.div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-6" whileHover={{ scale: 1.02 }}>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center">
                      <PieChart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-400" />
                      Skills Distribution
                    </h3>
                    <div className="h-48 sm:h-56 lg:h-64">
                      <Doughnut data={skillsDistributionData} options={doughnutOptions} />
                    </div>
                  </motion.div>
                  
                  <motion.div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-6 lg:col-span-2" whileHover={{ scale: 1.02 }}>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-400" />
                      Interview Success Rate
                    </h3>
                    <div className="h-48 sm:h-56 lg:h-64">
                      <Bar data={interviewSuccessData} options={chartOptions} />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 order-2 lg:order-1">
                {user.role === 'candidate' && (
                  <RecommendationForm 
                    language={language}
                    setShowRecommendations={setShowRecommendations}
                    setRecommendations={setRecommendations}
                    showRecommendations={showRecommendations}
                    recommendations={recommendations}
                  />
                )}
                
                {user.role === 'admin' && (
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Total Users</h3>
                        <p className="text-3xl font-bold text-purple-400">12,543</p>
                        <p className="text-gray-300 text-sm">+5.2% from last month</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Active Internships</h3>
                        <p className="text-3xl font-bold text-blue-400">1,847</p>
                        <p className="text-gray-300 text-sm">+12.8% from last month</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {user.role === 'recruiter' && (
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Recruiter Dashboard</h2>
                    <div className="space-y-6">
                      <div className="bg-white/5 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Your Posted Internships</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Software Development Intern</span>
                            <span className="text-purple-400">45 applications</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Marketing Intern</span>
                            <span className="text-blue-400">28 applications</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-4 lg:space-y-6 order-1 lg:order-2">
                {/* User Profile Card */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Profile Information</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm sm:text-base break-words min-w-0">{user.displayName || 'User'}</span>
                    </div>
                    {user.email && (
                      <div className="flex items-center space-x-3">
                        <span className="w-4 h-4 text-gray-400 flex-shrink-0">@</span>
                        <span className="text-gray-300 text-sm sm:text-base break-all min-w-0">{user.email}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-3">
                      <Star className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-300 capitalize text-sm sm:text-base">{user.role}</span>
                    </div>
                    {user.profile?.location && (
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm sm:text-base break-words min-w-0">{user.profile.location}</span>
                      </div>
                    )}
                    {user.profile?.education && (
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-300 capitalize text-sm sm:text-base break-words min-w-0">{user.profile.education}</span>
                      </div>
                    )}
                  </div>
                  
                  <button className="w-full mt-4 px-3 sm:px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm sm:text-base hover:bg-white/20 transition-all duration-200">
                    Edit Profile
                  </button>
                </div>

                {/* Recent Activity */}
                {user.role === 'candidate' && (
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Recent Activity</h3>
                    <div className="space-y-2 sm:space-y-3">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm text-gray-300 break-words">{activity.action}</p>
                            <p className="text-xs text-gray-400 break-words">{activity.company}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <Footer language={language} />
      </div>
    </motion.div>
    </ProtectedRoute>
  );
}
