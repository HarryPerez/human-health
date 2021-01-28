import React, { useState } from 'react';
import i18next from 'i18next';

import Checkbox from '~components/Checkbox';

import styles from './styles.module.scss';

function CheckboxExample() {
  const [checked, setChecked] = useState(false);
  const handleChange = () => setChecked(!checked);

  return (
    <div className={`row middle space-evenly full-width m-top-5 m-bottom-5 ${styles.container}`}>
      <span className="subtitle">{i18next.t('PlaygroundCheckbox:checkbox')}</span>
      <div className="col m-bottom-2 m-top-2">
        <Checkbox
          label={i18next.t('PlaygroundCheckbox:styled')}
          containerClassName="row middle"
          checkboxClassName={styles.checkbox}
          labelClassName="m-right-2"
          onChange={handleChange}
        />
        <span className="row center m-top-1">
          {i18next.t(`PlaygroundCheckbox:${checked ? 'checked' : 'unchecked'}`)}
        </span>
      </div>
      <Checkbox
        label={i18next.t('PlaygroundCheckbox:default')}
        containerClassName="row middle m-top-2 m-bottom-2"
        labelClassName="m-right-2"
        defaultChecked
      />
      <Checkbox
        label={i18next.t('PlaygroundCheckbox:disabled')}
        containerClassName="row middle m-top-2 m-bottom-2"
        labelClassName="m-right-2"
        disabled
      />
    </div>
  );
}

export default CheckboxExample;
