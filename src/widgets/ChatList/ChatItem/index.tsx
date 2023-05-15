import { ChatWithData } from '@/types';
import styles from '../styles.module.scss';
import classNames from 'classnames';

interface Props {
  chat: ChatWithData;
  highlight?: boolean;
};

const ChatItem = ({ chat, highlight, ...restProps }: React.HTMLProps<HTMLDivElement> & Props) => {
  const cls = classNames(styles.chat_item, {
    [styles.highlight]: highlight
  });

  const lastMsg = chat.msgs.length
    ? chat.msgs[chat.msgs.length - 1].message
    : null;

  return (
    <div className={cls} {...restProps}>
      <div>{chat.name || chat.telephone}</div>
      <div className={styles.last_message}>{lastMsg}</div>
    </div>
  );
};

export default ChatItem;
