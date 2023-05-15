import AppHeader from '@/components/AppHeader';
import styles from '../styles.module.scss';
import ChatInput from '../ChatInput';
import classNames from 'classnames';
import useStore from '@/store';
import Messages from '../Messages';

const Conversation = () => {
  const [chats, selectedChat, appendMessage] = useStore(store => [
    store.chats, store.selectedChat, store.appendMessage
  ]);
  const cls = classNames(styles.container, styles.conversation);

  const currentChat = chats[selectedChat];
  if (!currentChat) return null;

  const messages = currentChat.msgs;

  const handleSendMessage = (message: string) => {
    appendMessage({
      chatId: currentChat.telephone,
      message,
      side: true
    });
  };

  return (
    <div className={cls}>
      <AppHeader>Chat with {currentChat.name}</AppHeader>
      <Messages msgs={messages} />
      <ChatInput onMessage={handleSendMessage} />
    </div>
  );
};

export default Conversation;
