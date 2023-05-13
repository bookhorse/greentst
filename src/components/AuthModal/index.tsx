import { useState } from 'react';
import { Credentials } from '@/lib/greenapi/types';
import TextInput from '../TextInput';
import Modal from '../Modal';

interface Props {
  auth: Credentials | null;
  open: boolean;
  onChange: (data: Credentials) => void;
  onClose: () => void;
};

const AuthModal = ({auth, open, onChange, onClose}: Props) => {
  const [token, setToken] = useState(auth?.apiToken || '');
  const [instance, setInstance] = useState(auth?.waInstance || '');

  const handleSave = () => {
    if (token && instance) {
      onChange({
        apiToken: token,
        waInstance: instance
      });
    }
  };

  if (!open) return null;

  return (
    <Modal
      title="Credentials"
      open={open}
      onClose={onClose}
      onAction={handleSave}
    >
      <TextInput label="API token" value={token} onChange={setToken} />
      <TextInput label="Instance" value={instance} onChange={setInstance} />
    </Modal>
  );
};

export default AuthModal;
