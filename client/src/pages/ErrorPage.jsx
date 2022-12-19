import React from 'react';
import styled from 'styled-components';
import { ImSad } from 'react-icons/im';
import { Link } from 'react-router-dom';
const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.body};

  div {
    display: flex;
    padding: 20px;
    align-items: center;
    flex-direction: column;
    background-color: ${({ theme }) => theme.cardColor};
    color: ${({ theme }) => theme.text};
    border-radius: 20px;
    h1 {
      font-size: 60px;
    }
    h2 {
      margin-top: -10px;
      font-weight: 500;
    }
    h4 {
      max-width: 400px;
      font-weight: 400;
      text-align: center;
    }
    p {
      a {
        text-decoration: none;
        color: ${({ theme }) => theme.text};
        :hover {
          text-decoration: underline;
        }
      }
    }
    .Link {
      margin-top: 10px;
      background-color: #1a8cd8;
      padding: 10px;
      border-radius: 20px;
      color: ${({ theme }) => theme.text};
      text-decoration: none;
    }
  }
`;
const ErrorPage = ({ title }) => {
  return (
    <Div>
      <div>
        <h1>Oops!</h1>
        <h2>404 - Page {title} Dont Exist Yet</h2>
        <h4>
          The page you are looking for might not ready yet or has been removed
          for maintenanance
        </h4>
        <p>
          <a
            rel='noopener'
            target='_blank'
            href='https://github.com/GabrielSantos23'
          >
            See my github for more info
          </a>
        </p>

        <Link className='Link' to={'/'}>
          BACK TO HOME
        </Link>
      </div>
    </Div>
  );
};

export default ErrorPage;
