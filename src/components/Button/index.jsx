'use client'
import React from 'react';
import styles from './Button.module.css';

const Button = ({
  children,
  variant = 'default', // Alterado para 'default' como padrão
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  loading = false,
  rounded = 'md',
  className = '',
  ...props
}) => {
  const buttonClasses = [
    styles.base,
    styles[variant],
    styles[size],
    styles[`rounded-${rounded}`],
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading && (
        <span className={styles.loader} aria-hidden="true"></span>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className={styles.iconLeft}>{icon}</span>
      )}
      
      <span className={loading ? styles.textWithLoader : ''}>
        {children}
      </span>
      
      {icon && iconPosition === 'right' && !loading && (
        <span className={styles.iconRight}>{icon}</span>
      )}
    </button>
  );
};

export default Button;