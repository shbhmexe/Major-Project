import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NavFooter from './NavFooter';

// Styled components
const Container = styled.div`
  width: 100%;
  background-color: ${props => props.theme.cardBackground};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 60px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px);
  transition: background-color 0.3s ease;

  @media (max-height: 700px) {
    padding: 10px;
    margin-bottom: 50px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: left;
  color: ${props => props.theme.primaryText};

  @media (max-height: 700px) {
    font-size: 20px;
    margin-bottom: 5px;
  }
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${props => props.theme.secondaryText};
  margin-bottom: 20px;
  text-align: left;

  @media (max-height: 700px) {
    font-size: 13px;
    margin-bottom: 15px;
  }
`;

const FormSection = styled.div`
  flex: 1;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;

  @media (max-height: 700px) {
    margin-bottom: 10px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: ${props => props.theme.primary};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${props => props.theme.inputBorder};
  border-radius: 4px;
  font-size: 14px;
  background-color: ${props => props.theme.cardBackground};
  color: ${props => props.theme.primaryText};
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }

  @media (max-height: 700px) {
    padding: 8px;
    font-size: 13px;
  }
`;

const ButtonSection = styled.div`
  margin-top: auto;
  padding-top: 15px;
  
  @media (max-height: 700px) {
    padding-top: 10px;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ccc;
  color: ${props => props.theme.buttonText};
  text-align: center;
  border-radius: 4px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  
  @media (max-height: 700px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/settings');
  };
  
  return (
    <>
      <Container>
        <Title>Signin to your PopX account</Title>
        <Subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </Subtitle>
        
        <FormSection>
          <FormGroup>
            <Label>Email Address</Label>
            <Input type="email" placeholder="Enter email address" />
          </FormGroup>
          
          <FormGroup>
            <Label>Password</Label>
            <Input type="password" placeholder="Enter password" />
          </FormGroup>
        </FormSection>
        
        <ButtonSection>
          <LoginButton onClick={handleLogin}>Login</LoginButton>
        </ButtonSection>
      </Container>
      
      <NavFooter pageNumber={2} />
    </>
  );
};

export default LoginPage;