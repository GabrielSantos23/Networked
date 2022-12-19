import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { userChats } from '../api/ChatRequest';
import { Conversation } from './../components/Conversation';
import { ChatBox } from '../components/ChatBox';
import { GiHamburgerMenu } from 'react-icons/gi';
import { io } from 'socket.io-client';
import { AiOutlineEdit } from 'react-icons/ai';
import ModalMessage from '../components/ModalMessage';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  max-width: 1320px;
  margin-left: 300px;
  margin-top: -100px;
  .columns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    .chatColumn {
      margin-top: 250px;
      height: 100vh;
      margin-left: 50px;
      width: 300px;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      background-color: ${({ theme }) => theme.cardColor};
      margin-right: 100px;
      @media only screen and (max-width: 1000px) {
        display: none;
      }
    }
    .messageColumn {
      margin-top: 250px;
      width: 900px;
      border-radius: 20px;
      margin-left: 50px;
      background-color: ${({ theme }) => theme.cardColor};
      @media only screen and (max-width: 1000px) {
        height: 100vh;
        width: 700px;
      }
      @media only screen and (max-width: 700px) {
        width: 600px;
      }
      @media only screen and (max-width: 600px) {
        width: 500px;
      }
      @media only screen and (max-width: 500px) {
        width: 400px;
      }
      @media only screen and (max-width: 400px) {
        width: 300px;
      }
      @media only screen and (max-width: 200px) {
        width: 100px;
      }
    }
  }
`;

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [modal, setModal] = useState(true);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io('ws://localhost:8800');
    socket.current.emit('new-user-add', user._id);
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on('recieve-message', (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginRight: '350px',
      }}
    >
      <Div>
        <div className='columns'>
          <div className='chatColumn'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <p style={{ paddingLeft: '20px', fontSize: '1.5rem' }}>Chat </p>
              <ModalMessage />
            </div>
            <div>
              {chats.map((chat) => (
                <div onClick={() => setCurrentChat(chat)}>
                  <Conversation
                    data={chat}
                    online={checkOnlineStatus(chat)}
                    currentUserId={user._id}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='messageColumn'>
            <ChatBox
              chat={currentChat}
              setSendMessage={setSendMessage}
              currentUser={user._id}
              receivedMessage={receivedMessage}
              modal={modal}
              setModal={setModal}
            />
          </div>
        </div>
      </Div>
    </div>
  );
};

export default Chat;
