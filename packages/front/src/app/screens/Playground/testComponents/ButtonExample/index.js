import React, { useState } from 'react';
import i18next from 'i18next';

import Button from '~app/components/Button';

import styles from './styles.module.scss';

function ButtonExample() {
  const [active, setActive] = useState();
  const toggleOnOff = () => setActive(!active);

  return (
    <div className={`full-width m-bottom-3 ${styles.exampleButtonContainer}`}>
      <span className="subtitle bold">{i18next.t('PlaygroundButton:button')}</span>
      <Button
        label={i18next.t('PlaygroundButton:label')}
        onClick={toggleOnOff}
        type="button"
        className={`full-width m-bottom-2 ${styles.exampleButton}`}
      />
      <span className={styles.activeBox}>{i18next.t(`PlaygroundButton:button${active ? 'On' : 'Off'}`)}</span>
    </div>
  );
}

export default ButtonExample;
