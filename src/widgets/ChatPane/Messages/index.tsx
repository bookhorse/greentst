import { ChatMsg } from '@/types';
import styles from '../styles.module.scss';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';


interface Props {
  msgs: ChatMsg[];
};

const Messages = ({ msgs }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [msgs]);

  const items = msgs.map((el, idx) =>
    <div
      key={`${el.message}_${idx}`}
      className={classNames(styles.msg_container, {
        [styles.own_message]: el.side
      })}>
      <div className={styles.bubble}>
        {el.message}
      </div>
    </div>
  );

  return (
    <div className={styles.chat_main}>
      <div className={styles.spacer}></div>
      <div className={styles.message_list}>
        {items}
      </div>
      <span ref={ref}></span>
    </div>
  );
};

export default Messages;
