import { GET_DAY, GET_MONTH, WEEKEND_DAYS } from './constants';

// Getters
const currentDate = () => new Date();
export const todayStringES = GET_DAY.ES[new Date().getDay()];
export const currentYear = currentDate().getFullYear();

// Formatting

// DD de Mes de YYYY
export const buildDateES = date =>
  `${date.getDate()} de ${GET_MONTH.ES[date.getMonth()]} de ${date.getFullYear()}`;

// Dia DD de Mes de YYYY
export const buildFullDateES = date => `${GET_DAY.ES[date.getDay()]} ${buildDateES(date)}`;

// If the date time has only one digit, it adds a left 0
export const formatTime = time => `0${time}`.slice(-2);

// HH:MM
export const dateToTime = date => `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`;

// DD/MM/YYYY, HH:MM
export const buildDateAndHour = date => `${date.toLocaleDateString()}, ${dateToTime(date)}`;

export const dateToUTC = date =>
  new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );

// Setters
export const addYears = (date, years) => {
  const validDate = new Date(date);
  validDate.setFullYear(validDate.getFullYear() + years);
  return validDate;
};
export const addDays = (date, days) => {
  const validDate = new Date(date);
  validDate.setDate(validDate.getDate() + days);
  return validDate;
};
export const addHours = (date, hours) => {
  const validDate = date && new Date(date);
  validDate.setHours(validDate.getHours() + hours);
  return validDate;
};
export const addMinutes = (date, minutes) => {
  const validDate = date && new Date(date);
  validDate.setMinutes(validDate.getMinutes() + minutes);
  return validDate;
};

// Mappers
export const mapDatesToYears = dates => dates && dates.map(date => new Date(date).getFullYear());

// Validations
export const isDateTimeBefore = (startDateTime, endDateTime) =>
  new Date(startDateTime).getTime() < new Date(endDateTime).getTime();

export const isBefore = (date, compareDate) => new Date(date) < new Date(compareDate);

export const isAfter = (date, compareDate) => new Date(date) > new Date(compareDate);

export const isBeforeNow = date => isBefore(date, currentDate());

export const isAfterNow = date => isAfter(date, currentDate());

export const isFromCurrentYear = date => new Date(date).getFullYear() === currentYear;

export const isSameWeekDay = (date, day) => new Date(date).getDay() === day;

export const isInvalidDate = (date, invalidDays) => invalidDays.includes(new Date(date).getDay());

export const isWeekendDay = date => isInvalidDate(date, WEEKEND_DAYS);

export const isWorkingDay = date => !isWeekendDay(date);

export const isSameDate = (date, compareDate) =>
  date.getDate() === compareDate.getDate() &&
  date.getMonth() === compareDate.getMonth() &&
  date.getFullYear() === compareDate.getFullYear();

export const passedMoreThanNdays = (date, numberOfDays) =>
  isBefore(addDays(date, numberOfDays), currentDate());

export const isOutOfRange = (date, initialDate, endDate) =>
  isBefore(date, initialDate) || isAfter(date, endDate);

// Ranges
export const getDatesRange = (startDate, endDate) => {
  const dateArray = [];
  let date = new Date(startDate);
  while (date <= endDate) {
    dateArray.push(new Date(date));
    date = addDays(date, 1);
  }
  return dateArray;
};

export const getFilteredDatesRange = (startDate, endDate, filter) =>
  getDatesRange(startDate, endDate).filter(day => filter(day));

export const getWorkingDatesRange = (startDate, endDate) =>
  getFilteredDatesRange(startDate, endDate, isWorkingDay);

export const getTimeRange = (startDate, endDate) => {
  const startHour = dateToTime(new Date(startDate));
  const endHour = dateToTime(new Date(endDate));
  return `${startHour} - ${endHour}`;
};

// It includes both dates
export const getNumberOfDaysBetween = (startDate, endDate) => getDatesRange(startDate, endDate).length;

export const isValidDate = date => !isNaN(date) && date instanceof Date;
