import { arrayOf, func, shape, string } from 'prop-types';
import React, { useState } from 'react';

import RadioButton from './components/RadioButton';

function RadioGroup({ defaultOption, options, className, onChange, labelClassName, radioClassName }) {
  const [checkedOp, setCheckedOp] = useState(defaultOption.value);
  const handleChange = option => {
    setCheckedOp(option.value);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className={className}>
      {options.map(({ value, label, ...optionProps }, index) => (
        <div key={value}>
          <RadioButton
            checked={checkedOp === value}
            label={label}
            onClick={() => handleChange(options[index])}
            labelClassName={labelClassName}
            radioClassName={radioClassName}
            {...optionProps}
          />
        </div>
      ))}
    </div>
  );
}

RadioGroup.propTypes = {
  options: arrayOf(shape({ label: string, value: string })).isRequired,
  className: string,
  defaultOption: shape({ value: string, label: string }),
  labelClassName: string,
  radioClassName: string,
  onChange: func
};

RadioGroup.defaultProps = {
  defaultOption: ''
};

export default RadioGroup;
