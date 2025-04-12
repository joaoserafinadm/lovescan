// Select.js
import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Select.module.css';

const Select = forwardRef(({
  options = [],
  value,
  onChange,
  onBlur,
  onFocus,
  name,
  id,
  placeholder = 'Selecione uma opção',
  variant = 'default',
  size = 'md',
  disabled = false,
  error = false,
  success = false,
  fullWidth = false,
  rounded = 'md',
  prefix,
  label,
  helperText,
  required = false,
  multiple = false,
  className = '',
  ...props
}, ref) => {
  
  const selectRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  // Combinar a ref fornecida com a ref local
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(selectRef.current);
      } else {
        ref.current = selectRef.current;
      }
    }
  }, [ref]);

  const selectClasses = [
    styles.select,
    styles[variant],
    styles[size],
    styles[`rounded-${rounded}`],
    error ? styles.error : '',
    success ? styles.success : '',
    fullWidth ? styles.fullWidth : '',
    prefix ? styles.hasPrefix : '',
    isFocused ? styles.focused : '',
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

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const getDisplayValue = () => {
    if (!value) return '';
    
    if (multiple && Array.isArray(value)) {
      const selectedOptions = options.filter(option => value.includes(option.value));
      return selectedOptions.map(option => option.label).join(', ');
    }
    
    const selectedOption = options.find(option => option.value === value);
    return selectedOption ? selectedOption.label : '';
  };

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={styles.selectWrapper}>
        {prefix && <div className={styles.prefix}>{prefix}</div>}
        
        <select
          ref={selectRef}
          name={name}
          id={id}
          className={selectClasses}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          multiple={multiple}
          {...props}
        >
          {placeholder && (
            <option value="" disabled={required}>
              {placeholder}
            </option>
          )}
          
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {!multiple && (
          <div className={styles.indicator}>
            <ChevronDown size={16} />
          </div>
        )}
      </div>
      
      {helperText && (
        <div className={helperClasses}>
          {helperText}
        </div>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;