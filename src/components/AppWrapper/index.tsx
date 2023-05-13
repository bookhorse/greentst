import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
};

const AppWrapper = (props: Props) => {
  return (
    <div className={styles.app_wrapper}>
      {props.children}
    </div>
  );
};

export default AppWrapper;
