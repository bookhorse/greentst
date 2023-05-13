import AppWrapper from '@/components/AppWrapper';
import Chat from '@/components/Chat';
import ChatList from '@/components/ChatList';

const App = () => {
  return (
    <AppWrapper>
      <ChatList />
      <Chat />
    </AppWrapper>
  );
};

export default App;
