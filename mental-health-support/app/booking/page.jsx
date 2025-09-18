'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { useText } from '@/app/providers';
import { AnimatedText } from '@/components/AnimatedText';
import { cn } from '@/lib/utils';

// Mock counselor data
const COUNSELORS = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Anxiety & Stress Management',
    languages: ['English', 'Hindi'],
    image: 'https://i.pravatar.cc/150?img=1',
    availableDays: ['Monday', 'Wednesday', 'Friday']
  },
  {
    id: 2,
    name: 'Dr. Rajesh Patel',
    specialty: 'Depression & Mood Disorders',
    languages: ['English', 'Gujarati', 'Hindi'],
    image: 'https://i.pravatar.cc/150?img=2',
    availableDays: ['Tuesday', 'Thursday']
  },
  {
    id: 3,
    name: 'Dr. Priya Sharma',
    specialty: 'Academic Stress & Career Counseling',
    languages: ['English', 'Hindi', 'Bengali'],
    image: 'https://i.pravatar.cc/150?img=3',
    availableDays: ['Monday', 'Tuesday', 'Friday']
  },
  {
    id: 4,
    name: 'Dr. Michael Chen',
    specialty: 'Relationship Issues & Social Anxiety',
    languages: ['English', 'Mandarin'],
    image: 'https://i.pravatar.cc/150?img=4',
    availableDays: ['Wednesday', 'Thursday', 'Friday']
  }
];

// Mock time slots
const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

// Helper function to get next 14 days
function getNextTwoWeeks() {
  const days = [];
  const today = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    days.push({
      date: date,
      dayName: dayNames[date.getDay()],
      dateString: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    });
  }
  
  return days;
}

export default function BookingPage() {
  const router = useRouter();
  const { user, isAuthenticated, isGuest } = useAuth();
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  
  // Get text content from text.md
  const bookingTitle = useText('booking_system.title', 'Confidential Counseling Booking');
  const bookingSubtitle = useText('booking_system.subtitle', 'Schedule a private session with our counselors');
  const selectCounselorText = useText('booking_system.select_counselor', 'Select a Counselor');
  const selectDateText = useText('booking_system.select_date', 'Select a Date');
  const selectTimeText = useText('booking_system.select_time', 'Select a Time');
  const confirmBookingText = useText('booking_system.confirm_button', 'Confirm Booking');
  const bookingSuccessText = useText('booking_system.success_message', 'Your booking has been confirmed');
  const bookingDetailsText = useText('booking_system.details_message', 'You will receive a confirmation email with details');
  const bookAnotherText = useText('booking_system.book_another', 'Book Another Appointment');
  const backToHomeText = useText('booking_system.back_home', 'Back to Home');
  const anonymousBookingText = useText('booking_system.anonymous_note', 'Your booking is confidential. No personal information will be shared with your institution.');
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isGuest) {
      router.push('/login');
    }
  }, [isAuthenticated, isGuest, router]);
  
  // Update available dates when counselor is selected
  useEffect(() => {
    if (selectedCounselor) {
      const nextTwoWeeks = getNextTwoWeeks();
      const filteredDates = nextTwoWeeks.filter(day => 
        selectedCounselor.availableDays.includes(day.dayName)
      );
      setAvailableDates(filteredDates);
      setSelectedDate(null);
      setSelectedTime(null);
    }
  }, [selectedCounselor]);
  
  // Handle booking confirmation
  const handleConfirmBooking = () => {
    // In a real app, this would send the booking data to a server
    setBookingConfirmed(true);
  };
  
  // Handle booking another appointment
  const handleBookAnother = () => {
    setSelectedCounselor(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingConfirmed(false);
  };
  
  // If not authenticated and not guest, show nothing while redirecting
  if (!isAuthenticated && !isGuest) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/')}
                className="text-xl font-bold text-blue-600 dark:text-blue-400"
              >
                SukoonU
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.push('/')}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Booking Interface */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <AnimatedText 
            text={bookingTitle} 
            className="text-3xl font-bold text-gray-900 dark:text-white" 
            duration={0.5}
          />
          <AnimatedText 
            text={bookingSubtitle} 
            className="mt-2 text-xl text-gray-600 dark:text-gray-300" 
            duration={0.5}
            delay={0.1}
          />
        </div>
        
        {!bookingConfirmed ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              {/* Step 1: Select Counselor */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{selectCounselorText}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {COUNSELORS.map((counselor) => (
                    <div 
                      key={counselor.id}
                      onClick={() => setSelectedCounselor(counselor)}
                      className={cn(
                        "border rounded-lg p-4 cursor-pointer transition-all",
                        selectedCounselor?.id === counselor.id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md"
                          : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                      )}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img 
                            src={counselor.image} 
                            alt={counselor.name} 
                            className="h-12 w-12 rounded-full"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{counselor.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{counselor.specialty}</p>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {counselor.languages.map((lang) => (
                              <span 
                                key={lang} 
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              >
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Step 2: Select Date */}
              {selectedCounselor && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{selectDateText}</h3>
                  <div className="flex overflow-x-auto pb-4 space-x-4">
                    {availableDates.map((day) => (
                      <div 
                        key={day.dateString}
                        onClick={() => setSelectedDate(day)}
                        className={cn(
                          "flex-shrink-0 border rounded-lg p-4 cursor-pointer transition-all w-24 text-center",
                          selectedDate?.dateString === day.dateString
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md"
                            : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                        )}
                      >
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{day.dayName.substring(0, 3)}</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{day.dateString}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Step 3: Select Time */}
              {selectedDate && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{selectTimeText}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {TIME_SLOTS.map((time) => (
                      <div 
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "border rounded-lg p-3 cursor-pointer transition-all text-center",
                          selectedTime === time
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md"
                            : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                        )}
                      >
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Confirm Booking */}
              <div className="mt-8 flex flex-col items-center">
                <button
                  onClick={handleConfirmBooking}
                  disabled={!selectedCounselor || !selectedDate || !selectedTime}
                  className={cn(
                    "px-6 py-3 rounded-lg text-white font-medium transition-colors",
                    !selectedCounselor || !selectedDate || !selectedTime
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  )}
                >
                  {confirmBookingText}
                </button>
                
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 max-w-md text-center">
                  {anonymousBookingText}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Booking Confirmation */
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <AnimatedText 
              text={bookingSuccessText} 
              className="text-2xl font-bold text-gray-900 dark:text-white mb-2" 
              duration={0.5}
            />
            
            <div className="mb-8 max-w-md mx-auto">
              <AnimatedText 
                text={bookingDetailsText} 
                className="text-gray-600 dark:text-gray-300" 
                duration={0.5}
                delay={0.1}
              />
              
              <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-left">
                <p className="text-sm text-gray-700 dark:text-gray-300"><span className="font-medium">Counselor:</span> {selectedCounselor.name}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1"><span className="font-medium">Date:</span> {selectedDate.dateString}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1"><span className="font-medium">Time:</span> {selectedTime}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1"><span className="font-medium">Format:</span> Video Call</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleBookAnother}
                className="px-6 py-3 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
              >
                {bookAnotherText}
              </button>
              
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
              >
                {backToHomeText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}