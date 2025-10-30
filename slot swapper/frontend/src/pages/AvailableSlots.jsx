import { useState, useEffect } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';

const AvailableSlots = () => {
  const [slots, setSlots] = useState([]);
  const [mySwappableSlots, setMySwappableSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedMySlot, setSelectedMySlot] = useState(null);

  useEffect(() => {
    fetchAvailableSlots();
    fetchMySwappableSlots();
    
    // Listen for swap updates to refresh automatically
    const handleSwapUpdate = () => {
      fetchAvailableSlots();
      fetchMySwappableSlots();
    };
    window.addEventListener('swapUpdated', handleSwapUpdate);
    
    return () => {
      window.removeEventListener('swapUpdated', handleSwapUpdate);
    };
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const response = await API.get('/swaps/swappable-slots');
      setSlots(response.data);
    } catch (error) {
      console.error('Failed to fetch slots:', error);
    }
  };

  const fetchMySwappableSlots = async () => {
    try {
      const response = await API.get('/events');
      setMySwappableSlots(response.data.filter(e => e.status === 'SWAPPABLE'));
    } catch (error) {
      console.error('Failed to fetch my slots:', error);
    }
  };

  const handleRequestSwap = (slot) => {
    if (mySwappableSlots.length === 0) {
      alert('You need to mark at least one of your slots as swappable first!');
      return;
    }
    setSelectedSlot(slot);
    setSelectedMySlot(mySwappableSlots[0]._id);
    setShowModal(true);
  };

  const confirmSwap = async () => {
    if (!selectedMySlot) {
      alert('Please select a slot to offer');
      return;
    }
    try {
      await API.post('/swaps/swap-request', { 
        mySlotId: selectedMySlot, 
        theirSlotId: selectedSlot._id 
      });
      alert('Swap request sent successfully!');
      setShowModal(false);
      fetchAvailableSlots();
      fetchMySwappableSlots();
      // Trigger event to refresh other components
      window.dispatchEvent(new Event('swapUpdated'));
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send swap request');
    }
  };

  const formatTime = (start, end) => {
    const startTime = new Date(start).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const endTime = new Date(end).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${startTime} - ${endTime}`;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const groupSlotsByDate = () => {
    const grouped = {};
    slots.forEach(slot => {
      const dateKey = new Date(slot.startTime).toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = { label: dateKey, slots: [] };
      }
      grouped[dateKey].slots.push(slot);
    });

    const today = new Date().toDateString();
    const tomorrow = new Date(Date.now() + 86400000).toDateString();

    return Object.values(grouped).map(group => {
      if (group.label === today) group.label = 'Today';
      else if (group.label === tomorrow) group.label = 'Tomorrow';
      else group.label = formatDate(group.slots[0].startTime);
      return group;
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Available Slots</h1>
          <p className="text-gray-600 text-sm">Browse available slots from other users and request a swap.</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <button className="px-4 py-2 border rounded-lg text-sm flex items-center gap-2">
            Date ▼
          </button>
          <button className="px-4 py-2 border rounded-lg text-sm flex items-center gap-2">
            Category ▼
          </button>
          <button className="px-4 py-2 border rounded-lg text-sm flex items-center gap-2">
            Owner ▼
          </button>
        </div>

        {/* Slots Grouped by Date */}
        {slots.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            No available slots at the moment. Check back later!
          </div>
        ) : (
          groupSlotsByDate().map((group, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="text-xl font-bold mb-4">{group.label}</h2>
              <div className="space-y-4">
                {group.slots.map((slot) => (
                  <div key={slot._id} className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
                    <div className="flex items-start gap-4">
                      <div className="bg-gray-100 p-3 rounded">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{slot.title}</h3>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Owner:</span> {slot.userId?.name || 'Unknown'}
                        </p>
                        <p className="text-sm text-blue-600">{formatTime(slot.startTime, slot.endTime)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRequestSwap(slot)}
                      className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 font-medium"
                    >
                      Request Swap
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        {/* Modal for selecting your slot */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
              <h2 className="text-2xl font-bold mb-4 text-center">Select a Slot to Offer</h2>
              <p className="text-center text-gray-600 mb-6">
                Choose a slot from your schedule to offer in exchange for the requested slot.
              </p>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Your Swappable Slots</h3>
                <div className="space-y-2">
                  {mySwappableSlots.map((slot) => (
                    <div
                      key={slot._id}
                      onClick={() => setSelectedMySlot(slot._id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer ${
                        selectedMySlot === slot._id
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          checked={selectedMySlot === slot._id}
                          onChange={() => setSelectedMySlot(slot._id)}
                          className="w-4 h-4"
                        />
                        <div>
                          <p className="font-medium">
                            {new Date(slot.startTime).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}, {formatTime(slot.startTime, slot.endTime)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={confirmSwap}
                  className="flex-1 bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 font-medium"
                >
                  Confirm Swap
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AvailableSlots;
