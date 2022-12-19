import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';
import { BiSend } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { likePost } from '../api/PostRequest';
import axios from 'axios';
import placeholder from '../assets/img/placeholder.png';
const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
const imagePost = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
import TimeAgo from 'timeago-react';
import { useParams } from 'react-router-dom';
const PostDiv = styled.div`
  display: flex;
  width: 65%;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.cardColor};
  color: ${({ theme }) => theme.text};
  @media only screen and (max-width: 1000px) {
    margin-left: 100px;
  }
  .marginLeft {
    margin-left: 50px;
    @media only screen and (max-width: 1000px) {
      margin-left: 30px;
    }
  }
  gap: 1rem;
  .comment {
    margin-top: 20px;
    color: ${({ theme }) => theme.text};
    margin-left: 50px;
    margin-bottom: 20px;
    @media only screen and (max-width: 1000px) {
      margin-left: 30px;
    }
    div {
      display: flex;
      gap: 1rem;
      input {
        background-color: ${({ theme }) => theme.body};
        border: none;
        width: 440px;
        height: 40px;
        color: ${({ theme }) => theme.text};
        padding-left: 10px;
        outline: none;
        border-radius: 10px;
        @media only screen and (max-width: 1000px) {
          width: 200px;
        }
        @media only screen and (max-width: 500px) {
          width: 150px;
        }
      }
      button {
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        background-color: ${({ theme }) => theme.body};
        border: none;
        color: ${({ theme }) => theme.text};
      }
    }
  }
  .all {
    hr {
      background-color: ${({ theme }) => theme.hr};
      border: none;
      height: 2.5px;
    }
  }
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
  .postReact {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-right: 10px;
    .ml-1 {
      margin-left: 50px;
      @media only screen and (max-width: 1000px) {
        margin-left: 0px;
      }
    }
    @media only screen and (max-width: 1000px) {
      padding-left: 30px;
    }
  }
  .img {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
  }
  .detail {
    display: flex;
    align-items: center;
    gap: 1rem;
    .image {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 50%;
    }
    div {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 25px;

      p {
        text-transform: capitalize;
        margin-bottom: 1px;
      }
    }
  }
`;

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [createdPost, setCreatedPost] = useState();
  const userId = data.userId;

  const handleClick = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/user/${userId}`).then((response) => {
      const results = response.data;
      setCreatedPost(results);
    });
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PostDiv>
        <div className='all' style={{ marginRight: '30px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div className='img'>
              <img className='image' src={user.firstname} alt='' />
            </div>
            <div className='detail'>
              <img
                className='image'
                src={
                  createdPost?.profilePicture
                    ? serverPublic + createdPost?.profilePicture
                    : placeholder
                }
                alt=''
              />
              <div>
                <p
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.1rem',
                  }}
                >
                  {createdPost?.firstname} {createdPost?.lastname}{' '}
                  {createdPost?.isAdmin ? <MdVerified /> : ''}
                </p>
                <TimeAgo
                  datetime={data.createdAt}
                  locale='BR'
                  style={{ color: '#999', fontSize: '12px' }}
                />
              </div>
            </div>
          </div>
          <span
            style={{
              marginLeft: '50px',
              display: 'flex',
              textAlign: 'start',
              marginBottom: '20px',
              fontWeight: '400',
              maxWidth: '600px',
              lineBreak: 'anywhere',
            }}
          >
            {data.desc}
          </span>
          <img
            className='marginLeft'
            style={{
              width: '90%',
              right: 0,
              marginBottom: '10px',
            }}
            src={data?.image ? imagePost + data.image : ''}
            alt=''
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginRight: '10px',
              color: '#999',
              fontSize: '14px',
            }}
            className='marginLeft'
          >
            <p>{likes} Likes</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <p>{data.comments.length} Comments</p>
              <p>{data.shares.length} Shares</p>
            </div>
          </div>
          <hr
            style={{
              marginRight: '10px',
            }}
          />
          <div className='postReact'>
            <div onClick={handleClick} className='ml-1'>
              {liked ? (
                <p
                  style={{
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  <AiFillHeart
                    style={{
                      color: '#1a8cd8',
                      fontSize: '14px',
                    }}
                  />
                  Liked
                </p>
              ) : (
                <p
                  style={{
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  <AiOutlineHeart />
                  Like
                </p>
              )}
            </div>
            <p
              style={{
                display: 'flex',
                gap: '5px',
                alignItems: 'center',
                fontSize: '14px',
              }}
            >
              <FaRegComment />
              Comments
            </p>
            <p
              style={{
                display: 'flex',
                gap: '5px',
                alignItems: 'center',
                fontSize: '14px',
              }}
            >
              <FiShare /> Shares
            </p>
          </div>
          <hr
            style={{
              marginRight: '10px',
            }}
          />
          <div
            style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
            className='comment'
          >
            <img
              className='image'
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
              src={
                user.profilePicture
                  ? serverPublic + user.profilePicture
                  : placeholder
              }
              alt=''
            />
            <div>
              <input type='text' placeholder='Write a comment...' />
              <button>
                <BiSend />
              </button>
            </div>
          </div>
        </div>
      </PostDiv>
    </div>
  );
};

export default Post;
