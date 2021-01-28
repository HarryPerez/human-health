import React, { useState } from 'react';
import i18next from 'i18next';

import Select from '~app/components/Select';

import { OPTIONS } from './constants';
import styles from './styles.module.scss';

function SelectExample() {
  const [message, setMessage] = useState('');
  const handleChange = e => {
    setMessage(e.target.value);
  };
  return (
    <div className={`full-width m-bottom-3 ${styles.container}`}>
      <span className="subtitle bold">{i18next.t('SelectExample:subtitle')}</span>
      <Select
        className={`row middle center m-bottom-2 ${styles.selectContainer}`}
        placeholder={i18next.t('SelectExample:placeholder')}
        selectClassName={`full-width full-height ${styles.select}`}
        options={OPTIONS}
        handleChange={handleChange}
      />
      <span className={styles.message}>{message}</span>
    </div>
  );
}

export default SelectExample;
