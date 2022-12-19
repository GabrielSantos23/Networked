import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import Profile from '../assets/banner.png';
import { useSelector } from 'react-redux';
import placeholder from '../assets/img/placeholder.png';
import { Link, useParams } from 'react-router-dom';
import { MdVerified } from 'react-icons/md';
import InfoCard from './InfoCard';
import PostSide from './PostSide';
import axios from 'axios';

const ProfileDiv = styled.div`
  -webkit-box-shadow: 1px 9px 5px 0px rgba(25, 28, 33, 0.17);
  -moz-box-shadow: 1px 9px 5px 0px rgba(25, 28, 33, 0.17);
  box-shadow: 1px 9px 5px 0px rgba(25, 28, 33, 0.17);
  color: ${({ theme }) => theme.text};
  .profilePictureDiv {
    @media only screen and (max-width: 1000px) {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-left: -10px;
      margin-top: -200px;
    }
  }
  .infoCardDiv {
    display: flex;
    margin-left: 50px;
    @media only screen and (max-width: 1000px) {
      margin-left: -50px;
      .infoCard {
        display: none;
      }
    }
  }
`;

const BannerDiv = styled.div`
  display: flex;
  height: 300px;

  border-radius: 20px 20px 0px 0px;

  img {
    width: 100%;
    max-height: 30%;
    border-radius: 20px 20px 0px 0px;
    position: absolute;
    object-position: 0 0;
    object-fit: fill;
  }
  @media only screen and (max-width: 1000px) {
    img {
      width: 100vw;
    }
  }
`;
const ProfilePictureDiv = styled.div`
  margin-left: 120px;

  img {
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    width: 150px;
    position: relative;
    margin-top: 100px;
    border: 5px solid ${({ theme }) => theme.hrColor};
  }
`;

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  const [userInfo, setUserInfo] = useState();
  const userId = user.userId;
  const params = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/user/${params.id}`).then((response) => {
      const results = response.data;
      setUserInfo(results);
    });
  }, []);

  return (
    <ProfileDiv style={{ width: '100%', position: 'relative' }}>
      <BannerDiv>
        <img
          src={user.coverPicture ? serverPublic + user.coverPicture : Profile}
          alt=''
        />
      </BannerDiv>
      <ProfilePictureDiv className='profilePictureDiv'>
        <img
          style={{ marginBottom: '20px' }}
          src={
            userInfo?.profilePicture
              ? serverPublic + userInfo?.profilePicture
              : placeholder
          }
          alt=''
        />
        <span
          style={{
            textTransform: 'capitalize',
            display: 'flex',
            gap: '0.1rem',
            alignItems: 'center',
            fontSize: '18px',
          }}
        >
          {userInfo?.firstname} {userInfo?.lastname}{' '}
          {userInfo?.isAdmin ? <MdVerified /> : ''}
        </span>
      </ProfilePictureDiv>

      <div className='infoCardDiv' style={{}}>
        <div className='infoCard' style={{ marginTop: '10px' }}>
          <InfoCard />
        </div>
        <PostSide />
      </div>
    </ProfileDiv>
  );
};

export default ProfileCard;
