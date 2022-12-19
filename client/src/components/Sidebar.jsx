import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

import { CgFeed } from 'react-icons/cg';
import { IoPeopleOutline } from 'react-icons/io5';
import { BiMessageSquareMinus } from 'react-icons/bi';
import { RiNotification3Line } from 'react-icons/ri';
import { AiOutlineCompass } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { CiSettings } from 'react-icons/ci';
import { MdLogout } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './../actions/AuthAction';
import logo from '../assets/logo.png';
const SidebarDiv = styled.div`
  width: 250px;
  z-index: 100;
  background-color: ${({ theme }) => theme.cardColor};
  color: ${({ theme }) => theme.text};
  position: fixed;
  height: 100%;
  @media only screen and (max-width: 1750px) {
    width: 250px;
  }
  @media only screen and (max-width: 1673px) {
    width: 100px;
  }
  @media only screen and (max-width: 1150px) {
    display: none;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-left: 50px;
    text-align: start;
    @media only screen and (max-width: 1673px) {
      margin-left: 30px;
    }
    .button {
      display: none;
      background-color: transparent;
      border: none;
      color: ${({ theme }) => theme.text};
      font-size: 16px;
      :hover {
        background-color: #4e5d78;
        color: white;
      }
      @media only screen and (max-width: 1673px) {
        display: flex;
        align-items: center;
        svg {
          margin-top: -15px;
          width: 100px;
          cursor: pointer;
        }
        p {
          display: none;
        }
      }
    }

    .link-active {
      display: flex;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
      padding-left: 10px;
      color: white;
      background-color: #4e5d78;
      margin-right: 30px;
      border-radius: 20px;

      @media only screen and (max-width: 1673px) {
        svg {
          padding-right: 10px;
          font-size: 25px;
        }
        p {
          display: none;
        }
      }
    }
    .link {
      display: flex;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
      padding-left: 10px;
      color: ${({ theme }) => theme.text};

      margin-right: 30px;
      border-radius: 20px;

      :hover {
        background-color: #4e5d78;
        color: white;
      }

      @media only screen and (max-width: 1673px) {
        svg {
          padding-right: 10px;

          font-size: 25px;
        }

        p {
          display: none;
        }
      }
    }
  }
`;

const Logo = styled.div`
  margin-bottom: 50px;
  img {
    margin-top: 10px;

    width: 100px;
  }
  display: flex;
  flex-direction: row;
`;
const Nav = styled(NavLink)``;

const Sidebar = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <SidebarDiv>
      <Logo>
        <img src={logo} alt='' />
      </Logo>

      <div style={{ display: 'flex', gap: '-1rem' }}>
        <NavLink
          end
          to={'/home'}
          className={({ isActive }) => (isActive ? 'link-active' : 'link')}
        >
          <CgFeed />
          <p>Feed</p>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'link-active' : 'link')}
          to={'/myCommunity'}
        >
          <IoPeopleOutline /> <p>My community</p>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'link-active' : 'link')}
          to={'/chat'}
        >
          <BiMessageSquareMinus /> <p>Messages</p>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'link-active' : 'link')}
          to={'/notifications'}
        >
          <RiNotification3Line /> <p>Notifications</p>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'link-active' : 'link')}
          to={'/explore'}
        >
          <AiOutlineCompass /> <p>Explore</p>
        </NavLink>
        <NavLink
          to={`/profile/${user._id}`}
          className={({ isActive }) => (isActive ? 'link-active' : 'link')}
        >
          <BsPerson /> <p>Profile</p>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'link-active' : 'link')}
          to={'/settings'}
        >
          <CiSettings /> <p>Settings</p>
        </NavLink>
        <div
          className='button'
          onClick={handleLogout}
          style={{
            padding: '20px',

            marginRight: '30px',
            gap: '1rem',
            marginLeft: '1px',
            alignItems: 'center',
            borderRadius: '20px',
          }}
        >
          <MdLogout />
          <p>Logout</p>
        </div>
      </div>
    </SidebarDiv>
  );
};

export default Sidebar;
