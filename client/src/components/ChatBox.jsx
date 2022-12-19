import React, { useEffect, useState } from 'react';
import { getUser } from '../api/UserRequest';
import styled from 'styled-components';
const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
import placeholder from '../assets/img/placeholder.png';
import { addMessage, getMessages } from '../api/MessageRequest';
import { format } from 'timeago.js';
import InputEmoji from 'react-input-emoji';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
const ChatDiv = styled.div`
  .chat-sender {
    display: flex;
    position: fixed;
    bottom: 10px;
    width: 40%;
    @media only screen and (max-width: 1150px) {
      width: 70%;
      bottom: 100px;
    }
    @media only screen and (max-width: 800px) {
      width: 80%;
    }
    @media only screen and (max-width: 600px) {
      width: 70%;
    }

    .plus {
      display: flex;
      width: 50px;
      align-items: center;
      justify-content: center;
      background-color: #4e5d78;
      border-radius: 10px;
    }
    input {
      width: 100%;
      background-color: ${({ theme }) => theme.body};
      color: ${({ theme }) => theme.text};
      border: none;
      outline: none;
      padding-left: 10px;
    }
    .send-button {
      display: flex;
      align-items: center;
      padding: 10px;
      background-color: #377dff;
      border-radius: 10px;
    }
  }
  .chat-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;

    .message {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;

      .span {
        padding: 20px;
        border-radius: 15px 15px 15px 0px;
        background-color: #377dff;
        width: 90%;
      }
    }
    .own {
      display: flex;
      border-radius: 15px 15px 0 15px;
      align-items: flex-end;
      align-self: flex-end;
      .mine {
        background-color: ${({ theme }) => theme.body};
        padding: 20px;
        border-radius: 15px 15px 0 15px;
      }
    }
    .time {
      width: 100%;
      font-size: 10px;
      margin-top: -50px;
      margin-bottom: 20px;
      padding: 20px;
      flex-direction: column;
      width: 96%;
      color: #999;
    }
    .me {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
    }
  }

  padding: 20px;
  img {
    border-radius: 50px;
  }
  hr {
    margin-top: 20px;
    width: 100%;
    border: transparent;
    background-color: ${({ theme }) => theme.hr};
    height: 2px;
  }
`;

export const ChatBox = ({
  chat,
  currentUser,
  setSendMessage,
  receivedMessage,
  modal,
  setModal,
}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };
  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage('');
    } catch {
      console.log('error');
    }
  };

  // Receive Message from parent component
  useEffect(() => {
    console.log('Message Arrived: ', receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  return (
    <>
      <ChatDiv>
        {chat ? (
          <>
            <div>
              <div>
                <div
                  className=''
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <img
                    className='followerimg'
                    style={{ width: '50px', height: '50px' }}
                    src={
                      userData
                        ? serverPublic + userData.profilePicture
                        : placeholder
                    }
                  />
                  <div
                    className='name'
                    style={{
                      fontSize: '0.8rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignItems: 'center',
                    }}
                  >
                    <span>
                      {userData?.firstname}
                      {userData?.lastname}
                    </span>
                    {modal ? <></> : <AiOutlineClose fontSize='20' />}
                  </div>
                </div>
                <hr />
              </div>
            </div>
            <div className='chat-body' ref={scroll}>
              {messages?.map((message) => {
                return (
                  <>
                    <div
                      ref={scroll}
                      className={
                        message.senderId === currentUser
                          ? 'message own'
                          : 'message'
                      }
                    >
                      <span
                        className={
                          message.senderId === currentUser
                            ? 'span mine'
                            : 'span'
                        }
                      >
                        {message?.text}
                      </span>
                    </div>
                    <span
                      className={
                        message.senderId === currentUser ? 'time me' : 'time'
                      }
                    >
                      {format(message?.createdAt)}
                    </span>
                  </>
                );
              })}
            </div>
            <div className='chat-sender'>
              <div className='plus'>+</div>
              <input value={newMessage} onChange={handleChange} />
              <div className='send-button' onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          ''
        )}
      </ChatDiv>
    </>
  );
};
