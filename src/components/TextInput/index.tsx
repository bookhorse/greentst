import styles from '../styles.module.scss';

type InputProps = Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> & {
  label: string;
  onChange: (value: string) => void;
};

const TextInput = ({ label, value, onChange, ...restProps }: InputProps) => {
  return (
    <label className={styles.input_wrap}>
      <div className={styles.caption}>{label}</div>
      <input
        className={styles.input}
        {...restProps}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

export default TextInput;
