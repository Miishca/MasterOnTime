import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  icon,
}) => (
  <div className={styles.inputContainer}>
    {icon && <span className={styles.icon}>{icon}</span>}
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles.input}
    />
  </div>
);

export default Input;
