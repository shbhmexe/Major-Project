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
  margin-bottom: 20px;
  text-align: left;
  color: ${props => props.theme.primaryText};
`;

const FormGroup = styled.div`
  margin-bottom: 12px;
  text-align: left;

  @media (max-height: 700px) {
    margin-bottom: 8px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: ${props => props.theme.primary};
  
  &::after {
    content: "${props => props.required ? '*' : ''}";
    color: ${props => props.theme.primary};
  }
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

const RadioGroup = styled.div`
  margin-top: 8px;
  margin-bottom: 20px;
  text-align: left;

  @media (max-height: 700px) {
    margin-bottom: 15px;
  }
`;

const RadioLabel = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
  color: ${props => props.theme.primary};
  
  &::after {
    content: "${props => props.required ? '*' : ''}";
    color: ${props => props.theme.primary};
  }
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const RadioButton = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${props => props.checked ? props.theme.primary : props.theme.inputBorder};
  position: relative;
  margin-right: 8px;
  display: inline-block;
  
  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => props.checked ? props.theme.primary : 'transparent'};
  }
`;

const RadioText = styled.span`
  font-size: 14px;
  color: ${props => props.theme.primaryText};
`;

const RadioOptionsContainer = styled.div`
  display: flex;
`;

const FormSection = styled.div`
  flex: 1;
`;

const ButtonSection = styled.div`
  margin-top: auto;
  padding-top: 20px;
`;

const CreateAccountButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.buttonText};
  text-align: center;
  border-radius: 4px;
  font-weight: 500;
  border: none;
  cursor: pointer;
`;

const RegisterPage = () => {
  const navigate = useNavigate();
  
  const handleRegister = () => {
    navigate('/settings');
  };
  
  return (
    <>
      <Container>
        <Title>Create your PopX account</Title>
        
        <FormSection>
          <FormGroup>
            <Label required>Full Name</Label>
            <Input type="text" placeholder="Enter full name" />
          </FormGroup>
          
          <FormGroup>
            <Label required>Phone number</Label>
            <Input type="tel" placeholder="Enter phone number" />
          </FormGroup>
          
          <FormGroup>
            <Label required>Email address</Label>
            <Input type="email" placeholder="Enter email address" />
          </FormGroup>
          
          <FormGroup>
            <Label required>Password</Label>
            <Input type="password" placeholder="Enter password" />
          </FormGroup>
          
          <FormGroup>
            <Label>Company name</Label>
            <Input type="text" placeholder="Enter company name" />
          </FormGroup>
          
          <RadioGroup>
            <RadioLabel required>Are you an Agency?</RadioLabel>
            <RadioOptionsContainer>
              <RadioOption>
                <RadioButton checked={true} />
                <RadioText>Yes</RadioText>
              </RadioOption>
              <RadioOption>
                <RadioButton checked={false} />
                <RadioText>No</RadioText>
              </RadioOption>
            </RadioOptionsContainer>
          </RadioGroup>
        </FormSection>
        
        <ButtonSection>
          <CreateAccountButton onClick={handleRegister}>Create Account</CreateAccountButton>
        </ButtonSection>
      </Container>
      
      <NavFooter pageNumber={3} />
    </>
  );
};

export default RegisterPage; 