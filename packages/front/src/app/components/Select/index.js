import React from 'react';
import { string, shape, func, arrayOf } from 'prop-types';

import Placeholder from './components/Placeholder';

const Select = ({
  name,
  placeholder,
  options,
  handleChange,
  defaultValue,
  error,
  className,
  selectClassName,
  errorClassName,
  optionClassName,
  ...selectProps
}) => (
  <div className={className}>
    <select
      onChange={handleChange}
      name={name}
      className={selectClassName}
      defaultValue={defaultValue}
      {...selectProps}>
      <Placeholder label={placeholder} optionClassName={optionClassName} />
      {options.map(({ label, value, ...optionProps }) => (
        <option key={value} value={value} className={optionClassName} {...optionProps}>
          {label}
        </option>
      ))}
    </select>
    {error && <span className={errorClassName}>{error}</span>}
  </div>
);

Select.propTypes = {
  options: arrayOf(shape({ label: string, value: string })).isRequired,
  className: string,
  defaultValue: string,
  error: string,
  errorClassName: string,
  handleChange: func,
  name: string,
  optionClassName: string,
  placeholder: string,
  selectClassName: string
};

Select.defaultProps = {
  className: '',
  error: '',
  errorClassName: '',
  name: '',
  optionClassName: '',
  placeholder: '',
  selectClassName: ''
};

export default Select;
