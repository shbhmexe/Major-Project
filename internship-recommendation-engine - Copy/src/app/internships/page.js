'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Orb from '@/components/Orb';
import { Search, MapPin, Building, Calendar, BookmarkPlus, Star, Filter, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// Mock internship data
const MOCK_INTERNSHIPS = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'TechCorp India',
    location: 'Bangalore, Karnataka',
    type: 'Remote',
    duration: '3 months',
    stipend: '₹15,000/month',
    deadline: '2023-12-15',
    skills: ['React', 'JavaScript', 'HTML/CSS', 'UI/UX'],
    description: 'Join our dynamic team to develop responsive web applications using React and modern JavaScript frameworks.',
    matchScore: 92,
    skillMatch: {
      technical: 95,
      communication: 85,
      problemSolving: 90,
      teamwork: 88,
      leadership: 75
    }
  },
  {
    id: 2,
    title: 'Data Science Intern',
    company: 'Analytics Hub',
    location: 'Hyderabad, Telangana',
    type: 'Hybrid',
    duration: '6 months',
    stipend: '₹20,000/month',
    deadline: '2023-12-10',
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
    description: 'Work on real-world data science projects using machine learning algorithms and data visualization techniques.',
    matchScore: 85,
    skillMatch: {
      technical: 88,
      communication: 80,
      problemSolving: 92,
      teamwork: 78,
      leadership: 70
    }
  },
  {
    id: 3,
    title: 'Digital Marketing Intern',
    company: 'GrowthX Marketing',
    location: 'Mumbai, Maharashtra',
    type: 'In-office',
    duration: '4 months',
    stipend: '₹12,000/month',
    deadline: '2023-12-20',
    skills: ['Social Media Marketing', 'Content Creation', 'SEO', 'Analytics'],
    description: 'Assist in planning and executing digital marketing campaigns across various platforms to drive growth.',
    matchScore: 78,
    skillMatch: {
      technical: 75,
      communication: 92,
      problemSolving: 80,
      teamwork: 85,
      leadership: 82
    }
  },
  {
    id: 4,
    title: 'Backend Developer Intern',
    company: 'CloudServe Solutions',
    location: 'Pune, Maharashtra',
    type: 'Remote',
    duration: '6 months',
    stipend: '₹18,000/month',
    deadline: '2023-12-25',
    skills: ['Node.js', 'Express', 'MongoDB', 'API Development'],
    description: 'Develop and maintain backend services and APIs for our cloud-based applications.',
    matchScore: 88,
    skillMatch: {
      technical: 90,
      communication: 82,
      problemSolving: 88,
      teamwork: 85,
      leadership: 78
    }
  },
  {
    id: 5,
    title: 'UI/UX Design Intern',
    company: 'DesignFirst Studios',
    location: 'Delhi, NCR',
    type: 'Hybrid',
    duration: '3 months',
    stipend: '₹15,000/month',
    deadline: '2023-12-18',
    skills: ['Figma', 'Adobe XD', 'Wireframing', 'User Research'],
    description: 'Create intuitive and engaging user interfaces for web and mobile applications.',
    matchScore: 82,
    skillMatch: {
      technical: 85,
      communication: 88,
      problemSolving: 80,
      teamwork: 82,
      leadership: 75
    }
  },
  {
    id: 6,
    title: 'Product Management Intern',
    company: 'InnovateTech',
    location: 'Bangalore, Karnataka',
    type: 'In-office',
    duration: '6 months',
    stipend: '₹25,000/month',
    deadline: '2023-12-30',
    skills: ['Product Strategy', 'Market Research', 'Agile', 'Data Analysis'],
    description: 'Assist in product development lifecycle from ideation to launch, working closely with cross-functional teams.',
    matchScore: 75,
    skillMatch: {
      technical: 70,
      communication: 90,
      problemSolving: 85,
      teamwork: 88,
      leadership: 92
    }
  }
];

export default function InternshipsPage() {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    duration: '',
    minStipend: ''
  });
  const [savedInternships, setSavedInternships] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  // Load internships data
  useEffect(() => {
    // In a real app, this would be an API call
    setInternships(MOCK_INTERNSHIPS);
    setFilteredInternships(MOCK_INTERNSHIPS);
    
    // Load saved internships from localStorage
    const saved = localStorage.getItem('savedInternships');
    if (saved) {
      setSavedInternships(JSON.parse(saved));
    }
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let results = internships;
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(internship => 
        internship.title.toLowerCase().includes(term) ||
        internship.company.toLowerCase().includes(term) ||
        internship.skills.some(skill => skill.toLowerCase().includes(term))
      );
    }
    
    // Apply filters
    if (filters.location) {
      results = results.filter(internship => 
        internship.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.type) {
      results = results.filter(internship => 
        internship.type.toLowerCase() === filters.type.toLowerCase()
      );
    }
    
    if (filters.duration) {
      results = results.filter(internship => {
        const months = parseInt(internship.duration);
        const filterMonths = parseInt(filters.duration);
        return months <= filterMonths;
      });
    }
    
    if (filters.minStipend) {
      results = results.filter(internship => {
        const stipend = parseInt(internship.stipend.replace(/[^0-9]/g, ''));
        return stipend >= parseInt(filters.minStipend);
      });
    }
    
    setFilteredInternships(results);
  }, [searchTerm, filters, internships]);

  const toggleSaveInternship = (id) => {
    let newSaved;
    if (savedInternships.includes(id)) {
      newSaved = savedInternships.filter(savedId => savedId !== id);
    } else {
      newSaved = [...savedInternships, id];
    }
    
    setSavedInternships(newSaved);
    localStorage.setItem('savedInternships', JSON.stringify(newSaved));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      type: '',
      duration: '',
      minStipend: ''
    });
    setSearchTerm('');
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-emerald-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-orange-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-20">
          <Orb
            hue={270}
            hoverIntensity={0.3}
            rotateOnHover={true}
            forceHoverState={false}
          />
        </div>
        <div className="absolute inset-0 opacity-10 transform translate-x-1/2 -translate-y-1/4 scale-75">
          <Orb
            hue={220}
            hoverIntensity={0.2}
            rotateOnHover={false}
            forceHoverState={true}
          />
        </div>
      </div>
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Filters */}
          <div className="w-full md:w-1/4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Filters</h2>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden text-white"
                >
                  {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              
              <div className={`${showFilters ? 'block' : 'hidden md:block'}`}>
                <div className="space-y-4">
                  {/* Location Filter */}
                  <div>
                    <label className="block text-purple-200 text-sm font-medium mb-2">
                      <MapPin className="inline-block mr-2 h-4 w-4" />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                      placeholder="City or state"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  {/* Type Filter */}
                  <div>
                    <label className="block text-purple-200 text-sm font-medium mb-2">
                      <Briefcase className="inline-block mr-2 h-4 w-4" />
                      Type
                    </label>
                    <select
                      name="type"
                      value={filters.type}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="" className="bg-slate-800">All Types</option>
                      <option value="Remote" className="bg-slate-800">Remote</option>
                      <option value="Hybrid" className="bg-slate-800">Hybrid</option>
                      <option value="In-office" className="bg-slate-800">In-office</option>
                    </select>
                  </div>
                  
                  {/* Duration Filter */}
                  <div>
                    <label className="block text-purple-200 text-sm font-medium mb-2">
                      <Calendar className="inline-block mr-2 h-4 w-4" />
                      Max Duration (months)
                    </label>
                    <select
                      name="duration"
                      value={filters.duration}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="" className="bg-slate-800">Any Duration</option>
                      <option value="3" className="bg-slate-800">3 months</option>
                      <option value="6" className="bg-slate-800">6 months</option>
                      <option value="12" className="bg-slate-800">12 months</option>
                    </select>
                  </div>
                  
                  {/* Stipend Filter */}
                  <div>
                    <label className="block text-purple-200 text-sm font-medium mb-2">
                      Min Stipend (₹)
                    </label>
                    <select
                      name="minStipend"
                      value={filters.minStipend}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="" className="bg-slate-800">Any Amount</option>
                      <option value="5000" className="bg-slate-800">₹5,000</option>
                      <option value="10000" className="bg-slate-800">₹10,000</option>
                      <option value="15000" className="bg-slate-800">₹15,000</option>
                      <option value="20000" className="bg-slate-800">₹20,000</option>
                    </select>
                  </div>
                  
                  {/* Reset Button */}
                  <button
                    onClick={resetFilters}
                    className="w-full mt-4 bg-purple-600/30 hover:bg-purple-600/50 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
            
            {/* Saved Internships */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4">Saved Internships</h2>
              
              {savedInternships.length > 0 ? (
                <div className="space-y-3">
                  {internships
                    .filter(internship => savedInternships.includes(internship.id))
                    .map(internship => (
                      <div 
                        key={`saved-${internship.id}`}
                        className="bg-white/5 hover:bg-white/10 p-3 rounded-lg border border-white/10 cursor-pointer transition-colors duration-200"
                        onClick={() => setSelectedInternship(internship)}
                      >
                        <h3 className="text-white font-medium truncate">{internship.title}</h3>
                        <p className="text-purple-200 text-sm truncate">{internship.company}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-purple-300">{internship.location}</span>
                          <span className={`text-xs font-semibold ${getMatchScoreColor(internship.matchScore)}`}>
                            {internship.matchScore}% Match
                          </span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <p className="text-purple-200 text-sm">No saved internships yet. Click the bookmark icon to save internships for later.</p>
              )}
            </div>
          </div>
          
          {/* Right Column - Internship Listings */}
          <div className="w-full md:w-3/4">
            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title, company, or skills..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            {/* Internship Cards */}
            <div className="space-y-6">
              {filteredInternships.length > 0 ? (
                filteredInternships.map(internship => (
                  <div 
                    key={internship.id}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-5 shadow-lg border border-white/20 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold text-white mb-1">{internship.title}</h2>
                        <div className="flex items-center text-purple-200 mb-2">
                          <Building className="h-4 w-4 mr-1" />
                          <span>{internship.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`text-sm font-bold px-3 py-1 rounded-full ${getMatchScoreColor(internship.matchScore)} bg-white/10`}>
                          {internship.matchScore}% Match
                        </div>
                        <button 
                          onClick={() => toggleSaveInternship(internship.id)}
                          className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
                        >
                          <BookmarkPlus 
                            className={`h-5 w-5 ${savedInternships.includes(internship.id) ? 'text-purple-400 fill-purple-400' : 'text-purple-200'}`} 
                          />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mb-4">
                      <div className="flex items-center text-purple-200">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{internship.location}</span>
                      </div>
                      <div className="flex items-center text-purple-200">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span>{internship.type}</span>
                      </div>
                      <div className="flex items-center text-purple-200">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{internship.duration}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-white font-medium mb-2">Stipend: <span className="text-green-400">{internship.stipend}</span></div>
                      <p className="text-purple-200 mb-4">{internship.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {internship.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-purple-300 text-sm">
                          <span className="font-medium">Apply by:</span> {new Date(internship.deadline).toLocaleDateString()}
                        </div>
                        <button 
                          onClick={() => setSelectedInternship(internship)}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20 text-center">
                  <div className="text-purple-200 mb-4">No internships found matching your criteria.</div>
                  <button
                    onClick={resetFilters}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Internship Details Modal */}
      {selectedInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-gradient-to-br from-slate-800 to-purple-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedInternship.title}</h2>
                  <div className="flex items-center text-purple-200">
                    <Building className="h-4 w-4 mr-1" />
                    <span>{selectedInternship.company}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedInternship(null)}
                  className="text-purple-200 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-white/5 rounded-xl p-5 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Internship Details</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-purple-300 text-sm mb-1">Location</div>
                        <div className="text-white flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {selectedInternship.location}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-purple-300 text-sm mb-1">Type</div>
                        <div className="text-white flex items-center">
                          <Briefcase className="h-4 w-4 mr-2" />
                          {selectedInternship.type}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-purple-300 text-sm mb-1">Duration</div>
                        <div className="text-white flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {selectedInternship.duration}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-purple-300 text-sm mb-1">Stipend</div>
                        <div className="text-green-400 font-medium">
                          {selectedInternship.stipend}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-purple-300 text-sm mb-1">Apply By</div>
                        <div className="text-white">
                          {new Date(selectedInternship.deadline).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-white mb-4">Description</h3>
                    <p className="text-purple-200">{selectedInternship.description}</p>
                    
                    <h4 className="text-white font-medium mt-6 mb-3">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedInternship.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white/5 rounded-xl p-5 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-white">Match Score</h3>
                      <div className={`text-lg font-bold ${getMatchScoreColor(selectedInternship.matchScore)}`}>
                        {selectedInternship.matchScore}%
                      </div>
                    </div>
                    
                    <div className="h-64 w-full">
                      <Radar 
                        data={{
                          labels: ['Technical Skills', 'Communication', 'Problem Solving', 'Teamwork', 'Leadership'],
                          datasets: [
                            {
                              label: 'Your Match',
                              data: [
                                selectedInternship.skillMatch.technical,
                                selectedInternship.skillMatch.communication,
                                selectedInternship.skillMatch.problemSolving,
                                selectedInternship.skillMatch.teamwork,
                                selectedInternship.skillMatch.leadership
                              ],
                              backgroundColor: 'rgba(147, 51, 234, 0.2)',
                              borderColor: 'rgba(147, 51, 234, 1)',
                              borderWidth: 2,
                              pointBackgroundColor: 'rgba(147, 51, 234, 1)',
                              pointBorderColor: '#fff',
                              pointHoverBackgroundColor: '#fff',
                              pointHoverBorderColor: 'rgba(147, 51, 234, 1)'
                            }
                          ]
                        }}
                        options={{
                          scales: {
                            r: {
                              angleLines: {
                                color: 'rgba(255, 255, 255, 0.1)'
                              },
                              grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                              },
                              pointLabels: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                font: {
                                  size: 12
                                }
                              },
                              ticks: {
                                backdropColor: 'transparent',
                                color: 'rgba(255, 255, 255, 0.5)'
                              },
                              suggestedMin: 0,
                              suggestedMax: 100
                            }
                          },
                          plugins: {
                            legend: {
                              display: false
                            }
                          }
                        }}
                      />
                    </div>
                    
                    <div className="mt-4 text-center text-purple-200 text-sm">
                      This radar chart shows how well your profile matches the requirements for this internship across different skill areas.
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
                    
                    <div className="space-y-4">
                      <button 
                        onClick={() => toggleSaveInternship(selectedInternship.id)}
                        className={`w-full py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-300 ${savedInternships.includes(selectedInternship.id) ? 'bg-purple-700 text-white' : 'bg-white/10 text-purple-200 hover:bg-white/20'}`}
                      >
                        <BookmarkPlus className="h-5 w-5 mr-2" />
                        {savedInternships.includes(selectedInternship.id) ? 'Saved' : 'Save Internship'}
                      </button>
                      
                      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}