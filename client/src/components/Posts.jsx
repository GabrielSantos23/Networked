import React, { useEffect } from 'react';
import styled from 'styled-components';
import { PostData } from '../Data/PostsData';
import Post from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../actions/postAction';
import { useParams } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';
const PostsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);
  if (!posts) return 'No posts yet 😥';
  if (params.id) posts = posts.filter((post) => post.userId === params.id);

  return (
    <PostsDiv>
      {loading ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <InfinitySpin width='200' color='#1A8CD8' />
        </div>
      ) : (
        posts?.map((post, id) => {
          return <Post key={id} data={post} id={id} />;
        })
      )}
    </PostsDiv>
  );
};

export default Posts;
