'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Orb from '@/components/Orb';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Search, MapPin, Building, Calendar, BookmarkPlus, Star, Filter, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';

export default function InternshipList() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    duration: '',
    stipendMin: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Fetch internships data
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // For now, we'll use mock data
        const mockInternships = [
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
            description: 'Join our dynamic team to develop responsive web applications using React and modern JavaScript frameworks.'
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
            description: 'Work on real-world data science projects using machine learning algorithms and data visualization techniques.'
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
            description: 'Assist in planning and executing digital marketing campaigns across various platforms to drive growth.'
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
            description: 'Develop and maintain backend services and APIs for our cloud-based applications.'
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
            skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
            description: 'Create intuitive and engaging user interfaces for web and mobile applications.'
          }
        ];
        
        setInternships(mockInternships);
        setLoading(false);
      } catch (err) {
        setError('Failed to load internships. Please try again later.');
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  // Filter internships based on search term and filters
  const filteredInternships = internships.filter(internship => {
    // Search term filter
    const matchesSearch = 
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Other filters
    const matchesLocation = !filters.location || internship.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesType = !filters.type || internship.type === filters.type;
    const matchesDuration = !filters.duration || internship.duration.includes(filters.duration);
    const matchesStipend = !filters.stipendMin || parseInt(internship.stipend.replace(/[^0-9]/g, '')) >= parseInt(filters.stipendMin);
    
    return matchesSearch && matchesLocation && matchesType && matchesDuration && matchesStipend;
  });

  const toggleFilters = () => {
    setShowFilters(!showFilters);
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
      stipendMin: ''
    });
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center h-[80vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Available Internships</h1>
        
        {/* Search and Filter Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
              <input
                type="text"
                placeholder="Search by title, company, or skills"
                className="w-full bg-white/5 border border-purple-300/30 rounded-lg py-2 pl-10 pr-4 text-white placeholder-purple-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
              onClick={toggleFilters}
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 transition duration-300"
            >
              <Filter size={18} />
              Filters
              {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
          
          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-purple-200 mb-1 text-sm">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Any location"
                  className="w-full bg-white/5 border border-purple-300/30 rounded-lg py-2 px-3 text-white placeholder-purple-200"
                  value={filters.location}
                  onChange={handleFilterChange}
                />
              </div>
              
              <div>
                <label className="block text-purple-200 mb-1 text-sm">Type</label>
                <select
                  name="type"
                  className="w-full bg-white/5 border border-purple-300/30 rounded-lg py-2 px-3 text-white"
                  value={filters.type}
                  onChange={handleFilterChange}
                >
                  <option value="">Any type</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="In-office">In-office</option>
                </select>
              </div>
              
              <div>
                <label className="block text-purple-200 mb-1 text-sm">Duration</label>
                <select
                  name="duration"
                  className="w-full bg-white/5 border border-purple-300/30 rounded-lg py-2 px-3 text-white"
                  value={filters.duration}
                  onChange={handleFilterChange}
                >
                  <option value="">Any duration</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="months">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-purple-200 mb-1 text-sm">Min. Stipend</label>
                <select
                  name="stipendMin"
                  className="w-full bg-white/5 border border-purple-300/30 rounded-lg py-2 px-3 text-white"
                  value={filters.stipendMin}
                  onChange={handleFilterChange}
                >
                  <option value="">Any amount</option>
                  <option value="5000">₹5,000+</option>
                  <option value="10000">₹10,000+</option>
                  <option value="15000">₹15,000+</option>
                  <option value="20000">₹20,000+</option>
                </select>
              </div>
              
              <div className="md:col-span-4 flex justify-end">
                <button 
                  onClick={resetFilters}
                  className="text-purple-300 hover:text-white transition duration-300"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Results Count */}
        <div className="text-purple-200 mb-4">
          Found {filteredInternships.length} internships
        </div>
        
        {/* Internship Cards */}
        {filteredInternships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map(internship => (
              <div key={internship.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:shadow-lg hover:border-purple-500/50 transition duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-white">{internship.title}</h3>
                    <button className="text-purple-300 hover:text-purple-500 transition duration-300">
                      <BookmarkPlus size={20} />
                    </button>
                  </div>
                  
                  <div className="flex items-center text-purple-200 mb-2">
                    <Building size={16} className="mr-2" />
                    <span>{internship.company}</span>
                  </div>
                  
                  <div className="flex items-center text-purple-200 mb-2">
                    <MapPin size={16} className="mr-2" />
                    <span>{internship.location} • {internship.type}</span>
                  </div>
                  
                  <div className="flex items-center text-purple-200 mb-4">
                    <Calendar size={16} className="mr-2" />
                    <span>{internship.duration} • {internship.stipend}</span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-purple-200 mb-2">Skills:</div>
                    <div className="flex flex-wrap gap-2">
                      {internship.skills.map(skill => (
                        <span key={skill} className="bg-purple-500/20 text-purple-200 text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-purple-100 text-sm mb-4">{internship.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-purple-300">
                      <span className="font-medium">Apply by:</span> {new Date(internship.deadline).toLocaleDateString()}
                    </div>
                    
                    <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 text-sm transition duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center">
            <Briefcase className="mx-auto h-12 w-12 text-purple-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No internships found</h3>
            <p className="text-purple-200">Try adjusting your search filters or check back later for new opportunities.</p>
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}