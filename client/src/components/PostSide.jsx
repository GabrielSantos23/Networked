import React from 'react';
import styled from 'styled-components';
import Posts from './Posts';
import PostShare from './PostShare';

const PostSideDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 15px;
  height: 100vh;
  width: 1000px;
  overflow: auto;
`;

const PostSide = () => {
  return (
    <PostSideDiv>
      <PostShare />
      <Posts />
    </PostSideDiv>
  );
};

export default PostSide;
