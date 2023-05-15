import useStore from '@/store';
import Header from './Header';
import styles from './styles.module.scss';
import ChatItem from './ChatItem';
import { ChatDesc } from '@/types';

const ChatList = () => {
  const [chats, selectedChat, selectChat] = useStore(store => [
    store.chats, store.selectedChat, store.selectChat
  ]);

  const handleChatClick = (chat: ChatDesc, idx: number) => {
    selectChat(idx);
  };

  const renderedChats = chats.map((el, idx) => (
    <ChatItem
      key={idx}
      chat={el}
      highlight={idx === selectedChat}
      onClick={() => handleChatClick(el, idx)}
    />
  ));

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.chat_list}>
        {
          renderedChats.length
            ? renderedChats
            : <div className={styles.empty}>No chats</div>
        }
      </div>
    </div>
  );
};

export default ChatList;
