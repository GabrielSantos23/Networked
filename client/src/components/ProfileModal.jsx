import { useMantineTheme } from '@mantine/core';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../actions/uploadAction';
import { updateUser } from '../actions/userAction';

const InfoInputDiv = styled.div`
  display: flex;
  width: 100%;
  input {
    margin: 10px;
    padding: 15px;
    width: 100%;
    background-color: ${({ theme }) => theme.bol};
    border-radius: 10px;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.text};
  }
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.cardColor};
  border-radius: 20px;
  width: 50%;
  height: 70%;

  button {
    margin-top: 10px;
    padding: 10px;
    border: none;
    color: white;
    background-color: #1a8cd8;
    border-radius: 5px;
    margin-right: 10px;
    align-self: flex-end;
  }

  h3 {
    display: flex;
    align-self: center;
  }
`;
const ModalDiv = styled(Modal)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
`;
function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === 'profileImage'
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append('name', fileName);
      data.append('file', profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append('name', fileName);
      data.append('file', coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  return (
    <ModalDiv open={modalOpened} onClose={() => setModalOpened(false)}>
      <Form className='infoForm'>
        <h3>Your Info</h3>
        <InfoInputDiv>
          <input
            type='text'
            className='infoinfoInput'
            name='firstName'
            placeholder='First Name'
            onChange={handleChange}
            value={formData.firstname || ''}
          />
          <input
            type='text'
            className='infoInput'
            name='lastName'
            placeholder='Last Name'
            onChange={handleChange}
            value={formData.lastname || ''}
          />
        </InfoInputDiv>
        <InfoInputDiv>
          <input
            type='text'
            className='infoInput'
            name='worksat'
            placeholder='Works at'
            onChange={handleChange}
            value={formData.worksat || ''}
          />
        </InfoInputDiv>
        <InfoInputDiv>
          <input
            type='text'
            className='infoinfoInput'
            name='livesin'
            placeholder='Lives in'
            onChange={handleChange}
            value={formData.livesin || ''}
          />
          <input
            type='text'
            className='infoInput'
            name='country'
            placeholder='Country'
            onChange={handleChange}
            value={formData.country || ''}
          />
        </InfoInputDiv>
        <InfoInputDiv>
          <input
            type='text'
            placeholder='RelationShip Status'
            name='relationship'
            onChange={handleChange}
            value={formData.relationship || ''}
          />
          <input
            type='text'
            placeholder='Born In'
            name='bornin'
            onChange={handleChange}
            value={formData.bornin || ''}
          />
        </InfoInputDiv>
        <InfoInputDiv>
          <input
            type='text'
            placeholder='Gender'
            name='gender'
            onChange={handleChange}
            value={formData.gender || ''}
          />
          <input
            type='text'
            placeholder='Twitter'
            name='twitter'
            onChange={handleChange}
            value={formData.twitter || ''}
          />
        </InfoInputDiv>
        <InfoInputDiv>
          <input
            type='text'
            placeholder='Facebook'
            name='facebook'
            onChange={handleChange}
            value={formData.facebook || ''}
          />
          <input
            type='text'
            placeholder='Instagram'
            name='instagram'
            onChange={handleChange}
            value={formData.instagram || ''}
          />
        </InfoInputDiv>
        <InfoInputDiv>
          <input
            type='text'
            placeholder='Website'
            name='website'
            onChange={handleChange}
            value={formData.website || ''}
          />
        </InfoInputDiv>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '10px',
            }}
          >
            Profile Image
            <input type='file' name='profileImage' onChange={onImageChange} />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginRight: '10px',
            }}
          >
            Cover Image
            <input type='file' name='coverImage' onChange={onImageChange} />
          </div>
        </div>

        <button onClick={handleSubmit}>Update</button>
      </Form>
    </ModalDiv>
  );
}

export default ProfileModal;
