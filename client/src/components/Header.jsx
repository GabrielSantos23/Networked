import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';
import placeholder from '../assets/img/placeholder.png';
const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
import { MdVerified } from 'react-icons/md';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
const HeaderDiv = styled.div`
  z-index: 200;
  display: flex;
  margin-left: 200px;
  background-color: ${({ theme }) => theme.cardColor};
  width: 100%;
  position: fixed;
  padding: 15px;
  align-items: center;
  justify-content: space-around;
  @media only screen and (max-width: 1750px) {
    margin-left: 0;
  }

  .input {
    padding: 10px;
    width: 500px;
    height: 20px;
    border: 0.1px solid #c1c6d0;
    display: flex;
    border-radius: 5px;
    align-items: center;
    @media only screen and (max-width: 1750px) {
      width: 300px;
    }
    @media only screen and (max-width: 550px) {
      width: 200px;
    }
    @media only screen and (max-width: 375px) {
      width: 100px;
    }

    input {
      width: 500px;
      padding-left: 10px;
      background-color: transparent;
      border: none;
      outline: none;
      color: ${({ theme }) => theme.input};
      @media only screen and (max-width: 550px) {
        width: 200px;
      }
      @media only screen and (max-width: 375px) {
        width: 100px;
      }
    }
  }
  .user {
    display: flex;
    justify-content: flex-end;
    background-color: ${({ theme }) => theme.cardName};
    color: ${({ theme }) => theme.text};

    align-items: center;
    gap: 1rem;
    padding: 5px;
    border-radius: 10px;
    padding-left: 10px;
    margin-right: 50px;
    @media only screen and (max-width: 550px) {
      width: 100px;
    }
    img {
      width: 30px;
      height: 30px;
      object-fit: cover;
      border-radius: 20px;
    }
    p {
      display: flex;
      gap: 0.1rem;
      align-items: center;
      font-size: 14px;
      text-transform: capitalize;
      @media only screen and (max-width: 550px) {
        font-size: 10px;
      }
    }
  }
  .end {
    button {
      height: 50px;
      background-color: transparent;
      border: none;
      color: ${({ theme }) => theme.text};
      cursor: pointer;
    }
  }
`;

export const Header = ({ toggleTheme, theme }) => {
  const { user } = useSelector((state) => state.authReducer.authData);

  return (
    <HeaderDiv>
      <div className='input'>
        <AiOutlineSearch />
        <input type='text' placeholder='Search For Something here' />
      </div>
      <div
        className='end'
        style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
      >
        <button
          onClick={toggleTheme}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {theme === 'light' ? (
            <BsFillSunFill fontSize={20} />
          ) : (
            <BsFillMoonFill fontSize={20} />
          )}
        </button>

        <div className='user'>
          <p>
            {user.firstname} {user.lastname}{' '}
            {user.isAdmin ? <MdVerified /> : ''}
          </p>
          <img
            className='image'
            src={
              user.profilePicture
                ? serverPublic + user.profilePicture
                : placeholder
            }
            alt=''
          />
        </div>
      </div>
    </HeaderDiv>
  );
};
