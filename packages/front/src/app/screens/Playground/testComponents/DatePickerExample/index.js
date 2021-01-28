import i18next from 'i18next';
import React, { useState } from 'react';
import { DateUtils } from 'react-day-picker';

import DatePicker from '~app/components/DatePicker';

import { modifiersStyles, multipleDaysStyles } from './constants';
import styles from './styles.module.scss';

function DatePickerExample() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({});

  const handleDateClick = date => {
    setSelectedDate(date);
  };

  const handleMultipleDays = date => {
    const range = DateUtils.addDayToRange(date, selectedRange);
    setSelectedRange(range);
  };

  return (
    <div className="row space-evenly">
      <span className={`subtitle ${styles.title}`}>{i18next.t('DatePickerExample:title')}</span>
      <DatePicker
        label={i18next.t('DatePickerExample:labelSingleDay')}
        selectedDay={selectedDate}
        containerClassName="column center"
        labelClassName="subtitle"
        selectedDate={selectedDate}
        modifiersStyles={modifiersStyles}
        onDayClick={handleDateClick}
      />
      <DatePicker
        label={i18next.t('DatePickerExample:labelMultipleDays')}
        selectedDays={selectedRange}
        containerClassName="column center"
        labelClassName="subtitle"
        modifiersStyles={multipleDaysStyles}
        onDayClick={handleMultipleDays}
      />
    </div>
  );
}

export default DatePickerExample;
