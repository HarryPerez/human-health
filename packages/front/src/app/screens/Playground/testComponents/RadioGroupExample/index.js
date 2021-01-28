import i18next from 'i18next';
import React, { useState } from 'react';
import cn from 'classnames';

import RadioGroup from '~components/RadioGroup';

import { RADIO_OPTIONS } from './constants';
import styles from './styles.module.scss';

function RadioGroupExample() {
  const defaultOption = RADIO_OPTIONS[1];
  const [value, setValue] = useState(defaultOption.value);
  const handleChange = option => setValue(option.value);
  return (
    <div className={cn('full-width row space-around middle m-bottom-3', styles.container)}>
      <div className="col subtitle">{i18next.t('RadioGroupExample:title')}</div>
      <div className="col">
        <RadioGroup
          options={RADIO_OPTIONS}
          className={`full-width space-around middle ${styles.container}`}
          defaultOption={defaultOption}
          radioClassName="m-right-2"
          onChange={handleChange}
          labelClassName="m-right-3"
        />
      </div>
      <div className="col">
        {i18next.t('RadioGroupExample:selectedOption')}
        {i18next.t(`RadioGroupExample:${value}`)}
      </div>
    </div>
  );
}

export default RadioGroupExample;
