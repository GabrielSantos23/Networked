import React, { useEffect, useState } from 'react';
import { MdVerified } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { followUser, unFollowUser } from '../actions/userAction';
const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
import placeholder from '../assets/img/placeholder.png';

const Follower = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  span {
    color: ${({ theme }) => theme.text};
  }
  div {
    display: flex;
    gap: 10px;
  }
  .followerImg {
    width: 50px;
    height: 50px;
    overflow: hidden;
    object-fit: cover;
    border-radius: 50%;
  }
  .name {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    span:nth-of-type(1) {
      font-weight: bold;
    }
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 5px;
    padding-left: 20px;
    padding-right: 20px;
    border: none;
    border-radius: 5px;
    background: #1a8cd8;
    transition: all 100ms ease;

    :hover {
      background-color: transparent;
      border: 2px solid #1a8cd8;
      cursor: pointer;
    }
  }
`;

const User = ({ person }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );

  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(person._id, user))
      : dispatch(followUser(person._id, user));

    setFollowing((prev) => !prev);
  };

  return (
    <Follower to={`/profile/${person._id}`} className='follower'>
      <div>
        <img
          src={
            person.profilePicture
              ? serverPublic + person.profilePicture
              : serverPublic + placeholder
          }
          alt=''
          className='followerImg'
        />
        <div className='name'>
          <span
            style={{
              textTransform: 'capitalize',
              display: 'flex',
              alignItems: 'center',
              gap: '0.1rem',
            }}
          >
            {person.firstname} {person.lastname}{' '}
            {person.isAdmin ? <MdVerified /> : ''}
          </span>
          <span>{person.username}</span>
        </div>
      </div>
      <button onClick={handleFollow}>
        {following ? 'Unfollow' : 'Follow'}
      </button>
    </Follower>
  );
};

export default User;
