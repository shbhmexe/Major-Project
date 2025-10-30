import { useState, useEffect } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';

const MySlots = () => {
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    startTime: '',
    endTime: '',
    location: '',
    status: 'BUSY'
  });

  useEffect(() => {
    fetchEvents();
    
    // Listen for swap updates to refresh automatically
    const handleSwapUpdate = () => {
      fetchEvents();
    };
    window.addEventListener('swapUpdated', handleSwapUpdate);
    
    return () => {
      window.removeEventListener('swapUpdated', handleSwapUpdate);
    };
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await API.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const toggleSwappable = async (eventId, currentStatus) => {
    if (currentStatus === 'SWAP_PENDING') return;
    try {
      const newStatus = currentStatus === 'SWAPPABLE' ? 'BUSY' : 'SWAPPABLE';
      await API.put(`/events/${eventId}`, { status: newStatus });
      fetchEvents();
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await API.post('/events', newEvent);
      setShowCreateModal(false);
      setNewEvent({
        title: '',
        startTime: '',
        endTime: '',
        location: '',
        status: 'BUSY'
      });
      fetchEvents();
      alert('Event created successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create event');
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek };
  };

  const renderCalendar = (monthOffset = 0) => {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() + monthOffset);
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(date);
    const monthName = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === new Date().getDate() && 
                      date.getMonth() === new Date().getMonth() && 
                      date.getFullYear() === new Date().getFullYear();
      days.push(
        <div
          key={day}
          className={`p-2 text-center cursor-pointer hover:bg-gray-100 rounded ${
            isToday ? 'bg-cyan-400 text-white font-bold' : ''
          }`}
        >
          {day}
        </div>
      );
    }

    return (
      <div className="flex-1">
        <h3 className="text-center font-semibold mb-4">{monthName}</h3>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="text-center text-sm font-semibold text-gray-600">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  const upcomingSlots = events
    .filter(e => new Date(e.startTime) >= new Date())
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
    .slice(0, 5);

  const formatTime = (start, end) => {
    const startTime = new Date(start).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const endTime = new Date(end).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${startTime} - ${endTime}`;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Slots</h1>
            <p className="text-gray-600 text-sm">Manage your availability and swappable slots.</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 font-medium"
          >
            + Create Event
          </button>
        </div>

        {/* Calendar Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex gap-8">
            {renderCalendar(0)}
            {renderCalendar(1)}
          </div>
        </div>

        {/* Upcoming Slots Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Upcoming Slots</h2>
          {upcomingSlots.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No upcoming slots. Create your first event!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Event</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Swappable</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingSlots.map((event) => (
                    <tr key={event._id} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">{event.title}</span>
                      </td>
                      <td className="py-4 px-4 text-sm text-blue-600">
                        {formatTime(event.startTime, event.endTime)}
                      </td>
                      <td className="py-4 px-4 text-sm text-blue-600">
                        {event.location || 'N/A'}
                      </td>
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={event.status === 'SWAPPABLE'}
                          onChange={() => toggleSwappable(event._id, event.status)}
                          disabled={event.status === 'SWAP_PENDING'}
                          className="w-4 h-4 cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Create Event Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
              <form onSubmit={handleCreateEvent}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Event title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Time *</label>
                    <input
                      type="datetime-local"
                      required
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Time *</label>
                    <input
                      type="datetime-local"
                      required
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Event location"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                      value={newEvent.status}
                      onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="BUSY">Busy</option>
                      <option value="SWAPPABLE">Swappable</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 font-medium"
                  >
                    Create Event
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MySlots;
