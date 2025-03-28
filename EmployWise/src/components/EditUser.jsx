import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditUser.css';

const EditUser = ({ onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  const fetchUser = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://reqres.in/api/users/${userId}`);
      setUser(response.data.data);
      setFormData({
        first_name: response.data.data.first_name,
        last_name: response.data.data.last_name,
        email: response.data.data.email
      });
    } catch (err) {
      setError('Failed to fetch user. Please try again.');
      if (err.response?.status === 401) {
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      await axios.put(`https://reqres.in/api/users/${id}`, formData);
      setSuccess(true);
      // Wait a moment before navigating back to the list
      setTimeout(() => {
        navigate('/users');
      }, 2000);
    } catch (err) {
      setError('Failed to update user. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="edit-user-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Edit User</h1>
          <button 
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="main-content">
        {error && (
          <div className="error-message">
            <div className="error-text">{error}</div>
          </div>
        )}

        {success && (
          <div className="success-message">
            <div className="success-text">User updated successfully!</div>
          </div>
        )}

        {loading ? (
          <div className="loader">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="edit-card">
            {user ? (
              <div>
                <div className="user-profile">
                  <img 
                    src={user.avatar} 
                    alt={`${user.first_name} ${user.last_name}`} 
                    className="user-avatar"
                  />
                  <div>
                    <h2 className="user-name">{user.first_name} {user.last_name}</h2>
                    <p className="user-email">{user.email}</p>
                  </div>
                </div>

                <form className="edit-form" onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="first_name" className="form-label">
                          First name
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          id="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          required
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="last_name" className="form-label">
                          Last name
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          id="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          required
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="save-button"
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <p>User not found.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default EditUser; 