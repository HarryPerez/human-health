import React from 'react';
import { bool, func, string } from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.scss';

function Input({
  name,
  label,
  hideLabel,
  handleChange,
  error,
  className,
  inputClassName,
  labelClassName,
  errorClassName,
  value,
  ...inputProps
}) {
  return (
    <div className={className}>
      {!hideLabel && (
        <label htmlFor={name} className={`${styles.inputLabel} ${labelClassName}`}>
          {label}
        </label>
      )}
      <input
        name={name}
        className={cn(styles.input, inputClassName, {
          [styles.inputError]: !!error
        })}
        onChange={handleChange}
        value={value}
        {...inputProps}
      />
      {error && <span className={`${styles.error} ${errorClassName}`}>{error}</span>}
    </div>
  );
}

Input.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  className: string,
  error: string,
  errorClassName: string,
  handleChange: func,
  hideLabel: bool,
  inputClassName: string,
  labelClassName: string,
  value: string
};

Input.defaultProps = {
  className: 'column'
};

export default Input;
