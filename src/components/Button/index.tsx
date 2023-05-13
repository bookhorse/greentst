import styles from './styles.module.scss';

interface Props {
  type?: 'button' | 'submit';
};

type ButtonProps = React.HTMLProps<HTMLButtonElement> & Props;

const Button = ({ children, ...restProps }: ButtonProps) =>
  <button className={styles.button} {...restProps}>
    {children}
  </button>;

export default Button;
