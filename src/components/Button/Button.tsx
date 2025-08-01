import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'secondaryFooter' | 'searchButton';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => (
  <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
    {label}
  </button>
);

export default Button;