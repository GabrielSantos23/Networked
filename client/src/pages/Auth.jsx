import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { login, signUp } from './../actions/AuthAction';
import authReducer from './../reducers/authReducer';

const AuthDiv = styled.div`
  background-color: ${({ theme }) => theme.body};

  width: 100vw;
  height: 100vh;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: relative;
    flex-wrap: wrap;

    .input {
      width: 30%;
      height: 70%;
      background-color: ${({ theme }) => theme.cardColor};

      border-radius: 10px;
      -webkit-box-shadow: -1px 5px 53px -20px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: -1px 5px 53px -20px rgba(0, 0, 0, 0.75);
      box-shadow: -1px 5px 53px -20px rgba(0, 0, 0, 0.75);
    }
  }
`;

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  console.log(loading);
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    password: '',
    confirmpassword: '',
    username: '',
  });

  const [confirmPassword, setConfirmPassword] = useState(true);

  const handleChage = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      data.password === data.confirmpassword
        ? dispatch(signUp(data))
        : setConfirmPassword(false);
    } else {
      dispatch(login(data));
    }
  };

  const resetForm = () => {
    setConfirmPassword(true);
    setData({
      firstname: '',
      lastname: '',
      password: '',
      confirmpassword: '',
      username: '',
    });
  };

  return (
    <AuthDiv>
      <div className='content'>
        <div className='input'>
          <div className='a-left' style={{ height: '100%' }}>
            <InfoForm className='infoForm' onSubmit={handleSubmit}>
              <h3>{isSignUp ? 'Sign Up' : 'Log in'}</h3>

              {isSignUp && (
                <div>
                  <input
                    required
                    type='text'
                    placeholder='First Name'
                    className='infoInput'
                    name='firstname'
                    value={data.firstname}
                    onChange={handleChage}
                  />
                  <input
                    required
                    type='text'
                    placeholder='Last Name'
                    className='infoInput'
                    name='lastname'
                    value={data.lastname}
                    onChange={handleChage}
                  />
                </div>
              )}

              <div>
                <input
                  type='text'
                  className='infoInput'
                  name='username'
                  id=''
                  placeholder='Username'
                  onChange={handleChage}
                  value={data.username}
                />
              </div>
              <div>
                <input
                  type='password'
                  className='infoInput'
                  name='password'
                  id=''
                  placeholder='Password'
                  onChange={handleChage}
                  value={data.password}
                />
                {isSignUp && (
                  <input
                    type='password'
                    className='infoInput'
                    name='confirmpassword'
                    placeholder='Confirm password'
                    onChange={handleChage}
                    value={data.confirmpassword}
                  />
                )}
              </div>
              <span
                style={{
                  display: confirmPassword ? 'none' : 'block',
                  color: 'red',
                  alignSelf: 'flex-end',
                  marginRight: '30px',
                }}
              >
                Password is not the same
              </span>
              <div>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setIsSignUp((prev) => !prev);
                    resetForm();
                  }}
                >
                  {isSignUp
                    ? 'Already have an account? Login!'
                    : 'Dont have an account? SignUp!'}
                </span>
              </div>
              <button className='infoButton' type='submit' disabled={loading}>
                {loading ? 'Loading...' : isSignUp ? 'SingUp' : 'Login'}
              </button>
            </InfoForm>
          </div>
        </div>
      </div>
    </AuthDiv>
  );
};

const InfoForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 100%;

  div {
    display: flex;
    gap: 1rem;
    height: 2rem;
    width: 90%;
  }
  h3 {
    color: ${({ theme }) => theme.text};
  }

  .infoInput {
    border: none;
    outline: none;
    background-color: ${({ theme }) => theme.hrColor};

    padding: 20px;
    border-radius: 8px;
    flex: 1;
  }
  .infoButton {
    width: 6rem;
    height: 2rem;
    align-self: flex-end;
    margin-right: 35px;
    border: none;
    background-color: #1a8cd8;
    border-radius: 5px;
    color: white;
    z-index: 100;
    cursor: pointer;

    :disabled {
      background: silver;
      pointer-events: none;
    }
  }
`;
