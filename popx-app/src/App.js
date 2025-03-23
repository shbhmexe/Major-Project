import React from 'react';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AccountSettings from './components/AccountSettings';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './App.css';

const MobileContainer = styled.div`
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  max-height: 100vh;
  background-color: ${props => props.theme.background};
  overflow-y: auto;
  position: relative;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;

  @media (max-height: 700px) {
    font-size: 14px;
  }

  @media (max-width: 380px) {
    padding: 0 5px;
  }
`;

const AppContent = () => {
  const { theme } = useTheme();
  
  return (
    <StyledThemeProvider theme={theme}>
      <div className="App">
        <MobileContainer>
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/settings" element={<AccountSettings />} />
          </Routes>
        </MobileContainer>
      </div>
    </StyledThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
