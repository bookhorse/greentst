import { useState } from 'react';
import useStore from '@/store';
import TextInput from '../TextInput';
import Modal from '../Modal';

interface Props {
  open: boolean;
  onClose: () => void;
};

const NewChatModal = ({open, onClose}: Props) => {
  const createChat = useStore(store => store.createChat);
  const [chatName, setChatName] = useState('');
  const [telephone, setTelephone] = useState('');

  const handleSave = () => {
    if (chatName && telephone) {
      createChat(chatName, telephone);
      onClose();
    }
  };

  return (
    <Modal
      title="Create new chat"
      open={open}
      onClose={onClose}
      onAction={handleSave}
    >
      <TextInput label="Name" value={chatName} onChange={setChatName} />
      <TextInput label="Telephone" value={telephone} onChange={setTelephone} />
    </Modal>
  );

};

export default NewChatModal;
