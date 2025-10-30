import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome, {user?.name}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => navigate('/my-slots')}
            className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">My Slots</h2>
            <p className="text-gray-600">Manage your availability and swappable slots</p>
          </div>
          <div
            onClick={() => navigate('/available-slots')}
            className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">Available Slots</h2>
            <p className="text-gray-600">Browse and request swaps</p>
          </div>
          <div
            onClick={() => navigate('/requests')}
            className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">Requests</h2>
            <p className="text-gray-600">View incoming and outgoing swap requests</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
