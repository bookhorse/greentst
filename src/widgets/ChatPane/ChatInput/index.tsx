import { useState } from 'react';
import styles from '../styles.module.scss';

interface Props {
  onMessage: (message: string) => void;
};

const ChatInput = (props: Props) => {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.onMessage(value);
      setValue('');
    }
  };

  return (
    <footer className={styles.chat_footer}>
      <input
        autoFocus
        placeholder="Type a message"
        className={styles.chat_input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </footer>
  );
};

export default ChatInput;
