import { useEffect } from 'react';
import AppWrapper from '@/widgets/AppWrapper';
import ChatPane from '@/widgets/ChatPane';
import ChatList from '@/widgets/ChatList';
import useStore from '@/store';
import NotificationHandler from '@/widgets/NotificationHandler';

// nextjs hydration crap
// we need only one initialization
let initLock = false;

const App = () => {
  const initApp = useStore(store => store.init);

  useEffect(() => {
    if (initLock) return;
    initLock = true;
    initApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppWrapper>
      <NotificationHandler />
      <ChatList />
      <ChatPane />
    </AppWrapper>
  );
};

export default App;
