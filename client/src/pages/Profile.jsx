import React from 'react';
import styled from 'styled-components';
import PostSide from '../components/PostSide';
import ProfileLeft from '../components/ProfileLeft';
import RightSide from '../components/RightSide';
import ProfileCard from './../components/ProfileCard';
import InfoCard from './../components/InfoCard';

const ProfileDiv = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100vw;
`;
const ProfileCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100vw;
  margin-left: 300px;
  @media only screen and (max-width: 1750px) {
    margin-left: 200px;
  }
  @media only screen and (max-width: 1350px) {
    margin-left: 0;
  }
`;

const Profile = () => {
  return (
    <ProfileDiv>
      <ProfileCenter>
        <ProfileCard location='profilePage' />
      </ProfileCenter>
    </ProfileDiv>
  );
};

export default Profile;
