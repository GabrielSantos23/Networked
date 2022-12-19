import React, { useEffect } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  width: 100%;
  height: 100%;
  background-color: #0000007d;
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
  }
`;

const ModalExplore = ({
  modalOpen,
  setModalOpen,
  PostInfo,
  closeModal,
  modal,
}) => {
  console.log(modalOpen);
  const test = () => {
    setModalOpen(true);
  };
  const test2 = () => {
    setModalOpen(false);
  };
  return (
    <Div onClick={test2}>
      <div style={{ zIndex: '1001' }} onClick={test2}>
        {' '}
        <p>a</p>
      </div>
    </Div>
  );
};

export default ModalExplore;
