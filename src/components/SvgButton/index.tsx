import styles from '../styles.module.scss';

interface Props {
  children: React.ReactNode;
  type?: 'button' | 'submit';
};

const SvgButton = ({children, ...restProps}: React.HTMLProps<HTMLButtonElement> & Props) => {
  return (
    <button className={styles.iconbutton} {...restProps}>
      {children}
    </button>
  );
};

export default SvgButton;
