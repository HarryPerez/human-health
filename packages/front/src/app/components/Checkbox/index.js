import React from 'react';
import cn from 'classnames';
import { bool, func, string } from 'prop-types';

import styles from './styles.module.scss';

function Checkbox({
  containerClassName,
  label,
  disabled,
  checked,
  labelClassName,
  checkboxClassName,
  onChange,
  defaultChecked,
  ...checkboxProps
}) {
  return (
    <div className={containerClassName}>
      <span className={labelClassName}>{label}</span>
      <label className={cn(styles.checkboxLabel, checkboxClassName)}>
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          defaultChecked={defaultChecked}
          {...checkboxProps}
        />
        <span className={styles.checkboxCustom} />
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  checkboxClassName: string,
  checked: bool,
  containerClassName: string,
  defaultChecked: bool,
  disabled: bool,
  label: string,
  labelClassName: string,
  onChange: func
};

export default Checkbox;
