import React from 'react';
import i18next from 'i18next';

import styles from './styles.module.scss';
import ButtonExample from './testComponents/ButtonExample';
import CheckboxExample from './testComponents/CheckboxExample';
import SelectExample from './testComponents/SelectExample';
import RadioGroupExample from './testComponents/RadioGroupExample';
import ModalExample from './testComponents/ModalExample';
import DatePickerExample from './testComponents/DatePickerExample';
import InputExample from './testComponents/InputExample';
import FileDropzoneExample from './testComponents/FileDropzoneExample';

function Playground() {
  return (
    <div className={`column center full-width ${styles.playgroundContainer}`}>
      <h1 className="title m-bottom-6">{i18next.t('Playground:title')}</h1>
      <div className={`column full-width ${styles.exampleCardsContainer}`}>
        {/* Include your component's example below... */}
        <ButtonExample />
        <CheckboxExample />
        <SelectExample />
        <RadioGroupExample />
        <ModalExample />
        <DatePickerExample />
        <InputExample />
        <FileDropzoneExample />
      </div>
    </div>
  );
}

export default Playground;
