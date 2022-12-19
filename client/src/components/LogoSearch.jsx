import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { AiOutlineSearch } from 'react-icons/ai';

const LogoSearchDiv = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: var(--inputColor);
  border-radius: 10px;

  input {
    background-color: transparent;
    border: none;
    outline: none;
  }
  .s-icon {
    display: flex;
    align-items: center;
    background: #1a8cd8;
    border-radius: 5px;
    padding: 4px;
    color: white;

    :hover {
      cursor: pointer;
    }
  }
`;

const LogoSearch = () => {
  return (
    <LogoSearchDiv>
      <img src={logo} style={{ width: '80px' }} alt='' />
      <Search>
        <input type='text' placeholder='#Explore' />
        <div className='s-icon'>
          <AiOutlineSearch />
        </div>
      </Search>
    </LogoSearchDiv>
  );
};

export default LogoSearch;
