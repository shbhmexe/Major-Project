import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  gap: 15px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background-color: ${props => props.theme.cardBackground};
  z-index: 1000;
  border-top: 1px solid ${props => props.theme.border};
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;
  
  svg {
    width: 18px;
    height: 18px;
    cursor: pointer;
    
    path {
      fill: ${props => props.theme.secondaryText};
    }
  }

  @media (max-height: 600px) {
    padding: 8px 10px;
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const PageIndicator = styled.div`
  font-size: 12px;
  color: ${props => props.theme.secondaryText};
  margin: 0 20px;
  font-weight: 500;

  @media (max-width: 360px) {
    margin: 0 10px;
  }
`;

const HomeIcon = styled.div`
  cursor: pointer;
`;

const NavFooter = ({ pageNumber }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const totalPages = 4;
  
  const goHome = () => {
    navigate('/');
  };
  
  const goNext = () => {
    const routes = ['/', '/login', '/register', '/settings'];
    const currentIndex = routes.indexOf(location.pathname);
    
    if (currentIndex < routes.length - 1) {
      navigate(routes[currentIndex + 1]);
    }
  };
  
  const goPrevious = () => {
    const routes = ['/', '/login', '/register', '/settings'];
    const currentIndex = routes.indexOf(location.pathname);
    
    if (currentIndex > 0) {
      navigate(routes[currentIndex - 1]);
    }
  };
  
  return (
    <NavigationFooter>
      <HomeIcon onClick={goHome}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="#999999"/>
        </svg>
      </HomeIcon>
      
      <div onClick={goPrevious}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5 14L10.5 9L9 10.5L15.5 17L22 10.5L20.5 9L15.5 14Z" fill="#999999"/>
          <path d="M8.5 14L3.5 9L2 10.5L8.5 17L15 10.5L13.5 9L8.5 14Z" fill="#999999"/>
        </svg>
      </div>
      
      <PageIndicator>{pageNumber} of {totalPages}</PageIndicator>
      
      <div onClick={goNext}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.5 10L13.5 15L15 13.5L8.5 7L2 13.5L3.5 15L8.5 10Z" fill="#999999"/>
          <path d="M15.5 10L20.5 15L22 13.5L15.5 7L9 13.5L10.5 15L15.5 10Z" fill="#999999"/>
        </svg>
      </div>
    </NavigationFooter>
  );
};

export default NavFooter; 