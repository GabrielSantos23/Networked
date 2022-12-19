import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineCloseCircle, AiOutlineCompass } from 'react-icons/ai';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { CgFeed } from 'react-icons/cg';
import { IoPeopleOutline } from 'react-icons/io5';
import { BiMessageSquareMinus } from 'react-icons/bi';
import { RiNotification3Line } from 'react-icons/ri';
import { BsPerson } from 'react-icons/bs';
import { CiSettings } from 'react-icons/ci';
import { MdLogout } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/AuthAction';

const Div = styled.div`
  display: none;

  @media only screen and (max-width: 1150px) {
    display: flex;
    display: flex;
    position: fixed;
    bottom: 0px;
    justify-content: space-between;
    padding: 20px;
    width: 100%;
    z-index: 2000;
    background-color: ${({ theme }) => theme.cardColor};
  }
`;
const Nav = styled(NavLink)`
  color: ${({ theme }) => theme.text};
  .link {
    background-color: red;
  }
  .link-active {
    background-color: red;
  }
`;
const SidebarMobile = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  return (
    <Div>
      <Nav
        end
        to={'/home'}
        className={({ isActive }) => (isActive ? 'link-active' : 'link')}
      >
        <CgFeed />
      </Nav>
      <Nav
        className={({ isActive }) => (isActive ? 'link-active' : 'link')}
        to={'/error'}
      >
        <IoPeopleOutline />
      </Nav>
      <Nav
        className={({ isActive }) => (isActive ? 'link-active' : 'link')}
        to={'/chat'}
      >
        <BiMessageSquareMinus />
      </Nav>
      <Nav
        className={({ isActive }) => (isActive ? 'link-active' : 'link')}
        to={'/error'}
      >
        <RiNotification3Line />
      </Nav>
      <Nav
        className={({ isActive }) => (isActive ? 'link-active' : 'link')}
        to={'/error'}
      >
        <AiOutlineCompass />
      </Nav>
      <Nav
        to={`/profile/${user._id}`}
        className={({ isActive }) => (isActive ? 'link-active' : 'link')}
      >
        <BsPerson />
      </Nav>
      <Nav
        className={({ isActive }) => (isActive ? 'link-active' : 'link')}
        to={'/error'}
      >
        <CiSettings />
      </Nav>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      ></div>
    </Div>
  );
};

export default SidebarMobile;
