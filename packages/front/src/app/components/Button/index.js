/* eslint-disable react/button-has-type */
import { func, oneOf, string } from 'prop-types';
import React from 'react';

function Button({ label, onClick, type = 'button', className }) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {label}
    </button>
  );
}

Button.propTypes = {
  className: string,
  label: string,
  type: oneOf(['button', 'submit', 'reset']),
  onClick: func
};

export default Button;
