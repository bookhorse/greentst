import useStore from '@/store';
import Welcome from './Welcome';
import Conversation from './Conversation';

export default function Chat() {
  const selectedChat = useStore(store => store.selectedChat);

  return selectedChat === -1
    ? <Welcome />
    : <Conversation />;
};


