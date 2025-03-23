import React from 'react';
import styled from 'styled-components';
import NavFooter from './NavFooter';

// Styled components
const Container = styled.div`
  width: 100%;
  background-color: ${props => props.theme.cardBackground};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 80px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
`;

const Header = styled.div`
  padding: 20px;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid ${props => props.theme.border};
  text-align: left;
  color: ${props => props.theme.primaryText};
`;

const ProfileSection = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.border};
`;

const AvatarContainer = styled.div`
  position: relative;
  margin-right: 20px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CameraIconWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${props => props.theme.primary};
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  img {
    width: 16px;
    height: 16px;
  }
`;

const UserInfo = styled.div`
  text-align: left;
`;

const UserName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
  color: ${props => props.theme.primaryText};
`;

const UserEmail = styled.p`
  font-size: 14px;
  color: ${props => props.theme.secondaryText};
`;

const AboutSection = styled.div`
  padding: 20px;
  text-align: left;
  color: ${props => props.theme.secondaryText};
  font-size: 14px;
  line-height: 1.5;
  border-bottom: 1px solid ${props => props.theme.border};
`;

const AccountSettings = () => {
  return (
    <>
      <Container>
        <Header>Account Settings</Header>
        
        <ProfileSection>
          <AvatarContainer>
            <Avatar>
              <img 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="Profile"
              />
            </Avatar>
            <CameraIconWrapper>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 11.5C9.933 11.5 11.5 9.933 11.5 8C11.5 6.067 9.933 4.5 8 4.5C6.067 4.5 4.5 6.067 4.5 8C4.5 9.933 6.067 11.5 8 11.5Z" fill="white"/>
                <path d="M6 1L4.75 2.5H2.5C1.675 2.5 1 3.175 1 4V12C1 12.825 1.675 13.5 2.5 13.5H13.5C14.325 13.5 15 12.825 15 12V4C15 3.175 14.325 2.5 13.5 2.5H11.25L10 1H6ZM8 12.5C5.515 12.5 3.5 10.485 3.5 8C3.5 5.515 5.515 3.5 8 3.5C10.485 3.5 12.5 5.515 12.5 8C12.5 10.485 10.485 12.5 8 12.5Z" fill="white"/>
              </svg>
            </CameraIconWrapper>
          </AvatarContainer>
          
          <UserInfo>
            <UserName>Shbhm.exe</UserName>
            <UserEmail>shbhm@Gmail.Com</UserEmail>
          </UserInfo>
        </ProfileSection>
        
        <AboutSection>
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
        </AboutSection>
      </Container>
      
      <NavFooter pageNumber={4} />
    </>
  );
};

export default AccountSettings; 