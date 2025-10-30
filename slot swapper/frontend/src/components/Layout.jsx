import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { io } from 'socket.io-client';
import NotificationToast from './NotificationToast';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) return;

    // Connect to Socket.io
    const socket = io('http://localhost:5000');

    // Join user's room
    socket.emit('join', user._id);

    // Listen for new swap requests
    socket.on('newSwapRequest', (data) => {
      addNotification(data.message);
      // Trigger refresh
      window.dispatchEvent(new Event('swapUpdated'));
    });

    // Listen for swap responses
    socket.on('swapResponse', (data) => {
      addNotification(data.message);
      // Trigger refresh
      window.dispatchEvent(new Event('swapUpdated'));
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  const addNotification = (message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
            </svg>
            <span className="text-xl font-semibold">SlotSwapper</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="text-gray-700 hover:text-gray-900">Dashboard</Link>
            <Link to="/my-slots" className="text-gray-700 hover:text-gray-900">My Slots</Link>
            <Link to="/available-slots" className="text-gray-700 hover:text-gray-900">Available Slots</Link>
            <Link to="/requests" className="text-gray-700 hover:text-gray-900">Requests</Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-700">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Notifications */}
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          message={notification.message}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

export default Layout;
