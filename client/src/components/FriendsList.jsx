import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';
const FriendListDiv = styled.div`
  position: fixed;
  right: 0;
  background-color: ${({ theme }) => theme.cardColor};
  width: 200px;
  height: 100%;
  z-index: 100;

  div {
    margin-top: 45px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .inputDiv {
      display: flex;
      align-items: flex-start;
      flex-direction: row;
      width: 100%;
      input {
        width: 70%;
        height: 40px;
        background-color: transparent;
        border: 2px solid ${({ theme }) => theme.hrColor};
      }
      svg {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 25px;
        border: 2px solid ${({ theme }) => theme.hrColor};
        font-size: 10px;
      }
    }
  }
  @media only screen and (max-width: 1350px) {
    display: none;
  }
  p {
    margin-top: 300px;
  }
`;

export const FriendsList = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/user/${user.following}`)
  //     .then((response) => {
  //       const results = response.data;
  //     });
  // }, []);
  return <FriendListDiv></FriendListDiv>;
};
