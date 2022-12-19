import React, { useEffect, useState } from 'react';
import ErrorPage from './../pages/ErrorPage';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import placeholder from '../assets/img/placeholder.png';
import ModalExplore from './ModalExplore';
import { MdVerified } from 'react-icons/md';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { BiSend } from 'react-icons/bi';
import { likePost } from '../api/PostRequest';
const Div = styled.div`
  div {
    img {
      max-width: 300px;
      cursor: pointer;
    }
  }
`;

const Div2 = styled.div`
  height: 100vh;
  background-color: #0000007d;
  position: absolute;
  color: ${({ theme }) => theme.text};

  right: 0;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    padding: 20px;
    background-color: ${({ theme }) => theme.cardColor};

    display: flex;

    img {
      width: 500px;
    }
  }
  .card {
    border-radius: 10px;
  }
  .divText {
    min-width: 400px;
    max-width: 500px;
    justify-content: space-between;
    flex-direction: column;
  }
  .headerText {
    border-bottom: 1px solid ${({ theme }) => theme.hr};
    width: 100%;
  }
  .footer {
    border-top: 1px solid ${({ theme }) => theme.hr};
    display: flex;
    flex-direction: column;
    gap: -1rem;
    .icons {
      background-color: transparent;
      z-index: 10;
      margin-top: -20px;
      margin-top: -20px;
      gap: 1.5rem;
      svg {
        font-size: 20px;
      }
    }
  }
`;

const PostsExplore = ({ Data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [PostInfo, setPostInfo] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const [userIdt, setUserIdt] = useState([]);
  const [liked, setLiked] = useState(Data.likes.includes(user._id));
  const [likes, setLikes] = useState(Data.likes.length);

  const Post = PostInfo.userId;

  useEffect(() => {
    axios.get(`http://localhost:5000/user/${Post}`).then((response) => {
      const results = response.data;

      setUserIdt(results);
    });
  }, [Post]);

  const handleClick = () => {
    setLiked((prev) => !prev);
    likePost(Data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  console.log(userIdt);

  const modal = () => {
    setModalOpen((e) => !e);
    setPostInfo(Data);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const imagePost = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    document.body.style.overflowY = modalOpen ? 'hidden' : 'auto';
  }, [modalOpen]);
  return (
    <div>
      <Div>
        <div style={{}}>
          <img
            onClick={modal}
            className='image'
            src={imagePost + Data?.image}
            alt=''
          />
        </div>
      </Div>
      {modalOpen === true ? (
        <Div2 onClick={modal}>
          <div className='card' style={{ zIndex: '1001' }} onClick={closeModal}>
            <img
              onClick={modal}
              className='image'
              src={imagePost + Data?.image}
              alt=''
            />
            <div className='divText' style={{}}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  className='headerText'
                  style={{
                    display: 'flex',
                    height: '30px',
                    marginTop: '-30px',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <img
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50px',
                    }}
                    onClick={modal}
                    className='image'
                    src={imagePost + userIdt?.profilePicture}
                    alt=''
                  />
                  <p
                    style={{
                      textTransform: 'capitalize',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                    }}
                  >
                    {userIdt.firstname} {userIdt.lastname}{' '}
                    {userIdt.isAdmin ? <MdVerified /> : null}
                  </p>
                  <p style={{ color: '#1a8cd8' }}>Follow</p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    marginLeft: '-20px',
                    marginTop: '-20px',
                    backgroundColor: 'transparent',
                    gap: '0.2rem',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    <img
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50px',
                        marginRight: '10px',
                      }}
                      onClick={modal}
                      className='image'
                      src={imagePost + userIdt?.profilePicture}
                      alt=''
                    />
                    <p
                      style={{
                        textTransform: 'capitalize',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.2rem',
                        fontSize: '12px',
                        fontWeight: '700',
                      }}
                    >
                      {userIdt.firstname} {userIdt.lastname}{' '}
                      {userIdt.isAdmin ? <MdVerified /> : null}:
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        marginTop: '-30px',
                        paddingLeft: '10PX',
                        lineBreak: 'anywhere',
                      }}
                    >
                      {Data.desc}
                    </p>
                  </div>
                </div>
              </div>
              <div className='footer'>
                {console.log(Data)}
                <div className='icons'>
                  {liked ? (
                    <AiFillHeart onClick={handleClick} />
                  ) : (
                    <AiOutlineHeart onClick={handleClick} />
                  )}
                  <FaRegComment />
                  <BiSend />
                </div>
                <div
                  style={{ marginTop: '-30px', backgroundColor: 'transparent' }}
                >
                  {likes} Likes
                </div>
              </div>
            </div>
          </div>
        </Div2>
      ) : null}
    </div>
  );
};

export default PostsExplore;
