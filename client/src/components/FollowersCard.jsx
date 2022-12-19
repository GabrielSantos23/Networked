import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Followers } from '../Data/FollowersData';
import User from './User';
import { useSelector } from 'react-redux';
import authReducer from './../reducers/authReducer';
import { getAllUser } from '../api/UserRequest';
const FollowersCardDiv = styled.div`
  margin-left: -100px;
  margin-top: 15px;
  width: 100%;
  border-radius: 0.7rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  background-color: ${({ theme }) => theme.cardColor};
  padding: 20px;
`;

const Follower = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  return (
    <FollowersCardDiv>
      <h3>People you may know</h3>
      {persons.map((person, id) => {
        if (person._id !== user._id) {
          return <User person={person} key={id} />;
        }
      })}
    </FollowersCardDiv>
  );
};

export default FollowersCard;
