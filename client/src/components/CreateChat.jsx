import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
import placeholder from '../assets/img/placeholder.png';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  div {
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    p {
      width: 130px;
    }
  }
  button {
    margin-right: 20px;
    background-color: #1a8cd8;
    border: none;
    color: white;
    padding: 5px;
    border-radius: 5px;
    :hover {
      cursor: pointer;
      background-color: transparent;
      border: 1px solid #1a8cd8;
    }
    :disabled {
      cursor: not-allowed;
      background-color: transparent;
      :hover {
        border: none;
      }
    }
  }
`;

const CreateChat = ({ person, userId }) => {
  const personId = person._id;
  const [chatExist, setChatExist] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/chat/find/${userId}/${person._id}`)
      .then((response) => {
        const results = response.data;

        setChatExist(results);
      });
  }, []);
  const fetch = async () => {
    if (chatExist === null) {
      window.location.reload(true);
      const res = await axios.post('http://localhost:5000/chat', {
        senderId: userId,
        receiverId: person._id,
      });
      return res.data;
    }
  };

  console.log(chatExist);

  return (
    <Div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img
          src={
            person.profilePicture
              ? serverPublic + person.profilePicture
              : serverPublic + placeholder
          }
          alt=''
        />
        <p>
          {person.firstname} {person.lastname}
        </p>
      </div>
      <button disabled={chatExist ? true : false} onClick={fetch}>
        {chatExist === null ? 'Create Chat' : 'Already Exist'}
      </button>
    </Div>
  );
};

export default CreateChat;
