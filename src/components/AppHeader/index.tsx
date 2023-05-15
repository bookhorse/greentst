import styles from '../styles.module.scss';

interface Props {
  children: React.ReactNode;
}

const AppHeader = ({ children }: Props) => {
  return (
    <div className={styles.appheader}>
      {children}
    </div>
  );
};

export default AppHeader;
