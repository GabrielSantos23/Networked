import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle, AiOutlineEdit } from 'react-icons/ai';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { getAllUser } from './../api/UserRequest';
import { Link } from 'react-router-dom';
import CreateChat from './CreateChat';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#191C21',
    borderRadius: '10px',
    border: 'none',
  },
  overlay: {
    backgroundColor: '#0000006f',
    zIndex: '100',
  },
};
const Div = styled.div`
  p {
    color: ${({ theme }) => theme.text};
  }
  button {
    align-self: flex-end;
  }
`;
const ModalPeaples = ({}) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [Persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  function openModal() {
    setModalOpened(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function closeModal() {
    setModalOpened(false);
  }
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);
  return (
    <Div>
      <AiOutlineEdit onClick={openModal} style={{ marginRight: '20px' }} />
      <Modal
        isOpen={modalOpened}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Modal'
        ariaHideApp={false}
      >
        <div
          style={{
            display: 'flex',
            marginRight: '20px',
            justifyContent: 'space-between',
          }}
        >
          Create a Chat with:
          <button
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: 'none',
            }}
            onClick={closeModal}
          >
            <AiOutlineCloseCircle fontSize={20} />
          </button>
        </div>
        {Persons.map((person, i) => {
          if (person._id !== user._id) {
            return (
              <Div>
                <p>
                  <CreateChat person={person} userId={user._id} />
                </p>
                <div></div>
              </Div>
            );
          }
        })}
      </Modal>
    </Div>
  );
};

export default ModalPeaples;
