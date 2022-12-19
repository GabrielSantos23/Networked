import React, { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import ModalPeaples from './ModalPeaples';
const ModalMessage = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div style={{}}>
      <ModalPeaples modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default ModalMessage;
