import React, { useState } from 'react';
import styled from 'styled-components';

import { RiHome2Line } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi';
import { FaRegComments } from 'react-icons/fa';
import { MdOutlineNotifications } from 'react-icons/md';
import TrendCard from './TrendCard';
import ShareModal from './ShareModal';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const RightSideDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .navIcons {
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-between;
  }
  .r-button {
    height: 2.8rem;
    width: 80%;
    align-self: center;
    background-color: #1a8cd8;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 15px;
  }
`;

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);
  console.log(user);
  return (
    <div style={{ width: '300px', position: 'fixed', bottom: '0' }}>
      <RightSideDiv>
        <div className='navIcons'>
          <Link style={{ textDecoration: 'none', color: 'white' }} to={'/'}>
            <RiHome2Line />
          </Link>
          <FiSettings />
          <MdOutlineNotifications />
          <FaRegComments />
        </div>
        <TrendCard />

        <button
          className='button r-button'
          onClick={() => setModalOpened(true)}
        >
          Share
        </button>
        <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
      </RightSideDiv>
    </div>
  );
};

export default RightSide;
