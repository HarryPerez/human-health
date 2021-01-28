import React, { useState } from 'react';
import i18next from 'i18next';

import Input from '~app/components/Input';

import styles from './styles.module.scss';
import { VALID_NAME } from './validations';

function InputExample() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const handleInputChange = event => {
    const { value } = event?.currentTarget;
    if (VALID_NAME.test(value)) {
      setName(value);
      setError('');
    } else {
      setError(i18next.t('PlaygroundInput:invalidName'));
    }
  };
  return (
    <div className={`full-width m-bottom-3 ${styles.exampleInputContainer}`}>
      <span className="subtitle">{i18next.t('PlaygroundInput:input')}</span>
      <Input
        label={i18next.t('PlaygroundInput:label')}
        name="testInput"
        handleChange={handleInputChange}
        error={error}
        className={`m-bottom-2 ${styles.exampleInputElement}`}
        value={name}
      />
      <p className={`subtitle ${styles.exampleInputElement}`}>{name}</p>
    </div>
  );
}

export default InputExample;
