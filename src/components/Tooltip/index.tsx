import classNames from 'classnames';
import styles from '../styles.module.scss';

type Props = React.HTMLProps<HTMLDivElement> & {
  text: string;
  children: React.ReactNode;
};

const Tooltip = ({ text, children, ...restProps }: Props) => {
  const cls = classNames(styles.tooltip_text, styles.pos_bottom);

  return (
    <div className={styles.tooltip} {...restProps}>
      {children}
      <div className={cls}>
        {text}
        <span className={styles.arrow}></span>
      </div>

    </div>
  );
};

export default Tooltip;
