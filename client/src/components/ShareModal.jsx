import Modal from '@mui/material/Modal';

import styled from 'styled-components';
import PostShare from './PostShare';

const ModalDiv = styled(Modal)`
  width: 100%;
  display: flex;
  justify-content: center;
  outline: none;
  align-items: flex-start;
  margin-top: 10px;
`;
function ShareModal({ modalOpened, setModalOpened }) {
  return (
    <ModalDiv open={modalOpened} onClose={() => setModalOpened(false)}>
      <div>
        <PostShare />
      </div>
    </ModalDiv>
  );
}

export default ShareModal;
