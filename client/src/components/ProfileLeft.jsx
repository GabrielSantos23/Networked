import React from 'react';
import styled from 'styled-components';
import { Followers } from '../Data/FollowersData';
import FollowersCard from './FollowersCard';
import InfoCard from './InfoCard';
import LogoSearch from './LogoSearch';

const ProfileLeftDiv = styled.div``;

const ProfileLeft = () => {
  return (
    <ProfileLeftDiv>
      <LogoSearch />
      <InfoCard />
      {/*<FollowersCard />*/}
    </ProfileLeftDiv>
  );
};

export default ProfileLeft;
