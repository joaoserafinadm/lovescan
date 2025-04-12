// Input.js
import React, { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onBlur,
  onFocus,
  name,
  id,
  variant = 'default',
  size = 'md',
  disabled = false,
  readOnly = false,
  error = false,
  success = false,
  fullWidth = false,
  rounded = 'md',
  prefix,
  suffix,
  label,
  helperText,
  className = '',
  ...props
}, ref) => {
  
  const inputClasses = [
    styles.input,
    styles[variant],
    styles[size],
    styles[`rounded-${rounded}`],
    error ? styles.error : '',
    success ? styles.success : '',
    fullWidth ? styles.fullWidth : '',
    prefix ? styles.hasPrefix : '',
    suffix ? styles.hasSuffix : '',
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    styles.container,
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : ''
  ].filter(Boolean).join(' ');

  const helperClasses = [
    styles.helperText,
    error ? styles.errorText : '',
    success ? styles.successText : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      
      <div className={styles.inputWrapper}>
        {prefix && <div className={styles.prefix}>{prefix}</div>}
        
        <input
          ref={ref}
          type={type}
          name={name}
          id={id}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          readOnly={readOnly}
          {...props}
        />
        
        {suffix && <div className={styles.suffix}>{suffix}</div>}
      </div>
      
      {helperText && (
        <div className={helperClasses}>
          {helperText}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;