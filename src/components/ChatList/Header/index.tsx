import { useState } from 'react';
import SettingsIcon from '@/icons/settings.svg';
import NewChatIcon from '@/icons/new_chat.svg';
import SvgButton from '@/components/SvgButton';
import styles from '../styles.module.scss';
import AuthModal from '@/components/AuthModal';
import useStore from '@/store';
import { Credentials } from '@/lib/greenapi/types';

const Header = () => {
  const [auth, setAuth] = useStore(store => [store.auth, store.setAuth]);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const settingsHandler = () => {
    setAuthModalOpen(true);
  };

  const onSettingChange = (data: Credentials) => {
    setAuthModalOpen(false);
    setAuth(data);
  };

  const newChatHandler = () => {
    alert('anus');
  };

  return (
    <div className={styles.header}>
      <AuthModal
        title="Credentials"
        auth={auth}
        open={authModalOpen}
        onChange={onSettingChange}
        onClose={() => setAuthModalOpen(false)}
      />
      <SvgButton onClick={settingsHandler}>
        <SettingsIcon />
      </SvgButton>
      <SvgButton onClick={newChatHandler}>
        <NewChatIcon />
      </SvgButton>
    </div>
  );
};

export default Header;
