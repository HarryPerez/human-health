import React from 'react';
import { array, arrayOf, func, instanceOf, object, oneOf, shape, string } from 'prop-types';
import DayPicker, { DateUtils } from 'react-day-picker';

import 'react-day-picker/lib/style.css';

function DatePicker({
  selectedDate = new Date(),
  selectedDays,
  modifiers = {},
  modifiersStyles,
  containerClassName = '',
  className = '',
  label,
  labelClassName = '',
  localeUtils,
  ...props
}) {
  const dayInRange = day => selectedDays && DateUtils.isDayInRange(day, selectedDays);

  const selectedDaysModifiers = selectedDays
    ? {
        dayInRange,
        ...selectedDays
      }
    : selectedDays;

  return (
    <div className={containerClassName}>
      <h2 className={labelClassName}>{label}</h2>
      <DayPicker
        className={className}
        showOutsideDays
        modifiers={{ ...modifiers, ...selectedDaysModifiers, selectedDate }}
        selectedDays={selectedDays && [selectedDays.from, { from: selectedDays.from, to: selectedDays.to }]}
        modifiersStyles={modifiersStyles}
        localeUtils={localeUtils}
        {...props}
      />
    </div>
  );
}

DatePicker.propTypes = {
  className: string,
  containerClassName: string,
  label: string,
  labelClassName: string,
  localeUtils: shape({
    formatDate: func,
    formatDay: func,
    formatMonthTitle: func,
    formatWeekdayLong: func,
    formatWeekdayShort: func,
    getFirstDayOfWeek: func,
    getMonths: func,
    parseDate: func
  }),
  modifiers: oneOf([object, array]),
  modifiersStyles: oneOf([object, array]),
  selectedDate: instanceOf(Date),
  selectedDays: arrayOf(instanceOf(Date))
};

export default DatePicker;
