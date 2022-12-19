import React from 'react';
import styled from 'styled-components';
import FollowersCard from './FollowersCard';
import LogoSearch from './LogoSearch';
import ProfileCard from './ProfileCard';

const ProfileSideDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  width: 400px;
  z-index: 10;
`;

const ProfileSide = () => {
  return (
    <ProfileSideDiv>
      <LogoSearch />
      <ProfileCard />
      <FollowersCard />
    </ProfileSideDiv>
  );
};

export default ProfileSide;
