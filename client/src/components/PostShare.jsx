import { useState, useRef } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';

import { BiImageAlt } from 'react-icons/bi';
import { BsPlayCircle } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import { AiOutlineSchedule, AiOutlineClose } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import authReducer from './../reducers/authReducer';
import { uploadImage } from './../actions/uploadAction';
import { uploadPost } from '../actions/uploadAction';
import placeholder from '../assets/img/placeholder.png';

const PostShareDiv = styled.div`
  display: flex;
  gap: 1rem;
  background-color: ${({ theme }) => theme.cardColor};
  color: ${({ theme }) => theme.text};
  padding: 1rem;
  border-radius: 1rem;
  @media only screen and (max-width: 1000px) {
    margin-left: 100px;
    width: 70%;
  }
  .image {
    border-radius: 50%;
    width: 3rem;
    height: 2.5rem;
  }

  div {
    display: flex;
    flex-direction: column;
    width: 90%;
    gap: 1rem;

    input {
      background-color: ${({ theme }) => theme.body};
      border-radius: 10px;
      padding: 10px;
      font-size: 17px;
      border: none;
      outline: none;
      color: ${({ theme }) => theme.color};
      width: 90%;
    }
  }
  .postOptions {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    .option {
      padding: 5px;
      padding-left: 10px;
      padding-right: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      @media only screen and (max-width: 1000px) {
        span {
          display: none;
        }
      }

      :hover {
        cursor: pointer;
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
  }
  .previewImage {
    position: relative;

    svg {
      position: absolute;
      right: 1rem;
      top: 0.5rem;
      cursor: pointer;
    }
    img {
      width: 100%;
      max-width: 60rem;
      object-fit: cover;
      border-radius: 5px;
    }
  }
`;
const PostShare = () => {
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };
  const reset = () => {
    setImage(null);
    desc.current.value = '';
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append('name', filename);
      data.append('file', image);
      newPost.image = filename;
      console.log(newPost);

      try {
        dispatch(uploadImage(data));
      } catch (e) {
        console.log(e);
      }
    }
    dispatch(uploadPost(newPost));
    reset();
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PostShareDiv>
        <img
          className='image'
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : placeholder
          }
          alt=''
        />
        <div>
          <input
            maxLength={446}
            ref={desc}
            required
            type='text'
            placeholder="What's happening?"
          />
          <div className='postOptions'>
            <div className='option' onClick={() => imageRef.current.click()}>
              <BiImageAlt />
              <span>Photo</span>
            </div>
            <div className='option'>
              <BsPlayCircle />
              <span>Video</span>
            </div>
            <div className='option'>
              <IoLocationOutline />
              <span>Location</span>
            </div>
            <div className='option'>
              <AiOutlineSchedule />
              <span>Shedule</span>
            </div>
            <button className='' onClick={handleSubmit} disabled={loading}>
              {loading ? 'Uploading...' : 'Share'}
            </button>
            <div style={{ display: 'none' }}>
              <input
                type='file'
                name='myImage'
                ref={imageRef}
                onChange={onImageChange}
              />
            </div>
          </div>
          {image && (
            <div className='previewImage'>
              <AiOutlineClose onClick={() => setImage(null)} />
              <img
                src={URL.createObjectURL(image)}
                alt=''
                style={{ maxWidth: '500px' }}
              />
            </div>
          )}
        </div>
      </PostShareDiv>
    </div>
  );
};

export default PostShare;
