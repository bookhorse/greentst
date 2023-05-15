import classNames from 'classnames';
import styles from '../styles.module.scss';

const Welcome = () => {
  const cls = classNames(styles.container, styles.welcome_screen);
  return (
    <div className={cls}>
      <div className={styles.welcome_msg}>
        Click new chat icon to start messaging
      </div>
    </div>
  );
};

export default Welcome;
