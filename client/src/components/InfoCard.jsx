import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import styled from 'styled-components';
import ProfileModal from './ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserApi from '../api/UserRequest';
import { logout } from './../actions/AuthAction';

import { AiOutlineHeart, AiOutlineFacebook } from 'react-icons/ai';
import { SlLocationPin, SlGlobe } from 'react-icons/sl';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaGenderless } from 'react-icons/fa';
import { TbGenderMale } from 'react-icons/tb';
import { RiSuitcaseLine } from 'react-icons/ri';
import { TbBrandTwitter } from 'react-icons/tb';
import axios from 'axios';
const InfoCardDiv = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background-color: ${({ theme }) => theme.cardColor};
  color: ${({ theme }) => theme.text};
  padding: 1rem;
  border-radius: 1rem;
  width: 90%;

  .infoHead {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  svg {
    font-size: 20px;
    cursor: pointer;
  }
  button {
    width: 7rem;
    height: 2rem;
    margin-top: 4rem;
    background-color: #1a8cd8;
    align-self: flex-end;
    padding: 7px;
    border: none;
    color: white;
    border-radius: 5px;
    :hover {
      cursor: pointer;
      background-color: transparent;
      border: 2px solid #1a8cd8;
    }
  }
`;

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const dispatch = useDispatch();
  const params = useParams();

  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    axios.get(`http://localhost:5000/user/${params.id}`).then((response) => {
      const results = response.data;
      setUserInfo(results);
      console.log(results);
    });
  }, []);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
  };
  const captalize = () => {
    if (value.length === 1) {
      value.charAt(0).toUpperCase();
    }
  };
  return (
    <div
      style={{
        width: '300px',
      }}
    >
      <InfoCardDiv>
        <div className='infoHead'>
          <h4>Your Info</h4>
          {user._id === profileUserId ? (
            <>
              <AiOutlineEdit onClick={() => setModalOpened(true)} />
              <ProfileModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
                data={user}
              />
            </>
          ) : (
            ''
          )}
        </div>
        {userInfo?.relationship ? (
          <div className='info'>
            <span
              style={{
                textTransform: 'capitalize',

                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem',
              }}
            >
              <AiOutlineHeart /> {userInfo?.relationship}
            </span>
          </div>
        ) : (
          ''
        )}

        {userInfo?.livesin ? (
          <div className='info'>
            <span
              style={{
                textTransform: 'capitalize',
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem',
              }}
            >
              <SlLocationPin /> {userInfo.livesin}
            </span>
          </div>
        ) : (
          ''
        )}

        {userInfo?.worksat ? (
          <div className='info'>
            <span
              style={{
                textTransform: 'capitalize',
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem',
              }}
            >
              <RiSuitcaseLine /> {userInfo.worksat}
            </span>
          </div>
        ) : (
          ''
        )}

        {userInfo?.gender ? (
          <div className='info'>
            <span
              style={{
                display: 'flex',
                textTransform: 'capitalize',

                alignItems: 'center',
                gap: '0.2rem',
              }}
            >
              {userInfo?.gender == 'male' || 'Male' ? (
                <TbGenderMale />
              ) : (
                <FaGenderless />
              )}{' '}
              {userInfo?.gender}
            </span>
          </div>
        ) : (
          ''
        )}

        {userInfo?.twitter ? (
          <div className='info'>
            <span
              style={{
                display: 'flex',
                textTransform: 'capitalize',

                alignItems: 'center',
                gap: '0.2rem',
              }}
            >
              <TbBrandTwitter />
              {userInfo?.twitter}
            </span>
          </div>
        ) : (
          ''
        )}

        {userInfo?.instagram ? (
          <div className='info'>
            <span
              style={{
                display: 'flex',
                textTransform: 'capitalize',

                alignItems: 'center',
                gap: '0.2rem',
              }}
            >
              <AiOutlineInstagram /> {userInfo?.instagram}
            </span>
          </div>
        ) : (
          ''
        )}

        {userInfo?.facebook ? (
          <div className='info'>
            <span
              style={{
                display: 'flex',
                textTransform: 'capitalize',

                alignItems: 'center',
                gap: '0.2rem',
              }}
            >
              <AiOutlineFacebook /> {userInfo?.facebook}
            </span>
          </div>
        ) : (
          ''
        )}

        {userInfo?.website ? <div className='info'></div> : ''}

        <button onClick={handleLogout} style={{}}>
          Logout
        </button>
      </InfoCardDiv>
    </div>
  );
};

export default InfoCard;
