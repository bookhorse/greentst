import { useEffect, useState } from 'react';
import useStore from '@/store';
import TextInput from '../TextInput';
import Modal from '../Modal';

interface Props {
  open: boolean;
  onClose: () => void;
};

const AuthModal = ({ open, onClose }: Props) => {
  const [auth, setAuth] = useStore(store => [store.auth, store.setAuth]);
  const [token, setToken] = useState('');
  const [instance, setInstance] = useState('');

  useEffect(() => {
    setToken(auth?.apiToken || '');
    setInstance(auth?.waInstance || '');
  }, [auth]);

  const handleSave = () => {
    if (token && instance) {
      setAuth({
        apiToken: token,
        waInstance: instance
      });
      onClose();
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
