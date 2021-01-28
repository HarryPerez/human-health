import React from 'react';
import { string } from 'prop-types';

const Placeholder = ({ label, optionClassName }) => (
  <option value="" className={optionClassName} selected disabled hidden>
    {label}
  </option>
);

Placeholder.propTypes = {
  label: string,
  optionClassName: string
};

export default Placeholder;
