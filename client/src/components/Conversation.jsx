import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUser } from './../api/UserRequest';

const ConversartionDiv = styled.div`
  margin-left: 10px;
  margin-right: 10px;

  div {
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    .followerimg {
      border-radius: 50px;
    }
    .name {
      display: flex;
      flex-direction: column;
      span {
        width: 100%;
      }
    }
  }

  :hover {
    background-color: #9999996e;
    border-radius: 15px;
    cursor: pointer;
  }
`;
const Hr = styled.hr`
  width: 90%;
  border: transparent;
  background-color: ${({ theme }) => theme.hr};
  height: 2px;
`;

export const Conversation = ({ data, currentUserId, online }) => {
  const [userData, setUserData] = useState(null);
  const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <ConversartionDiv>
        <div className=''>
          <div className='online-dot'></div>
          <img
            className='followerimg'
            style={{ width: '50px', height: '50px' }}
            src={
              userData?.profilePicture
                ? serverPublic + userData.profilePicture
                : serverPublic + 'defaultpic.png'
            }
          />
          <div className='name' style={{ fontSize: '0.8rem' }}>
            <span>
              {userData?.firstname}
              {userData?.lastname}
            </span>
            <span>{online ? 'online' : 'offline'}</span>
          </div>
        </div>
      </ConversartionDiv>
      <Hr style={{}} />
    </>
  );
};
