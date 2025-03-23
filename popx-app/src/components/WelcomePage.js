import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NavFooter from './NavFooter';

// Styled components
const Container = styled.div`
  width: 100%;
  background-color: ${props => props.theme.cardBackground};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 80px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 40px;
  transition: background-color 0.3s ease;
`;

const ContentWrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: left;
  color: ${props => props.theme.primaryText};
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${props => props.theme.secondaryText};
  margin-bottom: 20px;
  text-align: left;
`;

const CreateAccountButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 15px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.buttonText};
  text-align: center;
  border-radius: 4px;
  font-weight: 500;
  margin-bottom: 10px;
  text-decoration: none;
`;

const LoginButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 15px;
  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.primaryText};
  text-align: center;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
`;

const WelcomePage = () => {
  return (
    <>
      <Container>
        <ContentWrapper>
          <Title>Welcome to PopX</Title>
          <Subtitle>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </Subtitle>
          
          <CreateAccountButton to="/register">Create Account</CreateAccountButton>
          <LoginButton to="/login">Already Registered? Login</LoginButton>
        </ContentWrapper>
      </Container>
      
      <NavFooter pageNumber={1} />
    </>
  );
};

export default WelcomePage; 