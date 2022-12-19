import React from 'react';
import styled from 'styled-components';
import PostSide from '../components/PostSide';
import RightSide from '../components/RightSide';
import ProfileSide from './../components/ProfileSide';
import Sidebar from './../components/Sidebar';
import FollowersCard from './../components/FollowersCard';

const HomeDiv = styled.div`
  display: flex;
  margin-top: 100px;
  flex-wrap: wrap;
  margin-left: 200px;
  justify-content: center;
  margin-left: -100px;
`;
const Div = styled.div`
  @media only screen and (max-width: 1000px) {
    display: none;
  }
`;
const Home = () => {
  return (
    <>
      <HomeDiv>
        {
          //<ProfileSide />
        }
        <PostSide />
        <div style={{ width: '400px' }}>
          <FollowersCard />
        </div>
      </HomeDiv>
    </>
  );
};

export default Home;
