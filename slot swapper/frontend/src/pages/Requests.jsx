import { useState, useEffect } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';

const Requests = () => {
  const [requests, setRequests] = useState({ incoming: [], outgoing: [] });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await API.get('/swaps/requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    }
  };

  const handleResponse = async (requestId, accept) => {
    try {
      await API.post(`/swaps/swap-response/${requestId}`, { accept });
      alert(accept ? 'Swap accepted! Your calendar has been updated.' : 'Swap rejected.');
      // Refresh requests list to show updated state
      fetchRequests();
      // Trigger a custom event to refresh other components
      window.dispatchEvent(new Event('swapUpdated'));
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to respond');
    }
  };

  const formatTime = (start, end) => {
    const startTime = new Date(start).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const endTime = new Date(end).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${startTime} - ${endTime}`;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Requests</h1>
        
        {/* Incoming Requests */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Incoming Requests</h2>
          {requests.incoming.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              No incoming swap requests
            </div>
          ) : (
            <div className="space-y-4">
              {requests.incoming.map((req) => (
                <div key={req._id} className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-gray-600">
                        {req.requesterId?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Swap with {req.requesterId?.name}</p>
                      <p className="text-sm text-gray-600">
                        Offered: {req.requesterSlotId?.startTime && formatTime(req.requesterSlotId.startTime, req.requesterSlotId.endTime)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleResponse(req._id, true)}
                    className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Accept
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Outgoing Requests */}
        <div>
          <h2 className="text-xl font-bold mb-4">Outgoing Requests</h2>
          {requests.outgoing.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              No outgoing swap requests
            </div>
          ) : (
            <div className="space-y-4">
              {requests.outgoing.map((req) => (
                <div key={req._id} className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-gray-600">
                        {req.targetUserId?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">To: {req.targetUserId?.name}</p>
                      <p className="text-sm text-gray-600">
                        Requested: {req.targetSlotId?.startTime && formatTime(req.targetSlotId.startTime, req.targetSlotId.endTime)}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-orange-600 px-4 py-2 bg-orange-50 rounded-lg">
                    {req.status === 'PENDING' ? 'Pending...' : req.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Requests;
