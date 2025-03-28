import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import UserList from './components/UserList'
import EditUser from './components/EditUser'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/users" />} />
        <Route path="/users" element={isAuthenticated ? <UserList onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/edit/:id" element={isAuthenticated ? <EditUser onLogout={handleLogout} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
