import { useEffect, useState } from 'react';
import SettingsIcon from '@/icons/settings.svg';
import NewChatIcon from '@/icons/new_chat.svg';
import SvgButton from '@/components/SvgButton';
import styles from '../styles.module.scss';
import AuthModal from '@/components/AuthModal';
import NewChatModal from '@/components/NewChatModal';
import Tooltip from '@/components/Tooltip';
import AppHeader from '@/components/AppHeader';
import useStore from '@/store';

const Header = () => {
  const [auth, appLoaded] = useStore(store => [store.auth, store.appLoaded]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);

  useEffect(() => {
    if (auth === null && appLoaded) {
      setAuthModalOpen(true);
    }
  }, [auth, appLoaded]);

  const settingsHandler = () => {
    setAuthModalOpen(true);
  };

  const newChatHandler = () => {
    setChatModalOpen(true);
  };

  return (
    <AppHeader>
      <div className={styles.header}>
        <AuthModal
          open={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
        <NewChatModal
          open={chatModalOpen}
          onClose={() => setChatModalOpen(false)}
        />
        <Tooltip text="Settings">
          <SvgButton onClick={settingsHandler}>
            <SettingsIcon />
          </SvgButton>
        </Tooltip>
        <Tooltip text="New chat">
          <SvgButton onClick={newChatHandler}>
            <NewChatIcon />
          </SvgButton>
        </Tooltip>
      </div>
    </AppHeader>
  );
};

export default Header;
