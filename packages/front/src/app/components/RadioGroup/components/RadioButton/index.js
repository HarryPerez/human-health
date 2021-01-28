import React from 'react';
import cn from 'classnames';
import { bool, func, string } from 'prop-types';

import styles from './styles.module.scss';

const RadioButton = ({
  className,
  label,
  key,
  checked,
  labelClassName,
  onClick,
  radioClassName,
  ...props
}) => (
  <div className={cn(styles.container, className)} key={key}>
    <label className={labelClassName}>{label}</label>
    <input type="radio" checked={checked} {...props} />
    <span className={cn(styles.checkmark, radioClassName)} onClick={onClick} />
  </div>
);

RadioButton.propTypes = {
  checked: bool,
  className: string,
  key: string,
  label: string,
  labelClassName: string,
  radioClassName: string,
  onClick: func
};

export default RadioButton;
