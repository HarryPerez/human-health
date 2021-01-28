import {
  getWorkingDatesRange,
  isWorkingDay,
  isBefore,
  isAfter,
  formatTime,
  addDays,
  addHours,
  addMinutes,
  mapDatesToYears,
  isDateTimeBefore,
  isSameWeekDay,
  isSameDate,
  passedMoreThanNdays,
  isOutOfRange,
  getDatesRange,
  getNumberOfDaysBetween
} from './index';

describe('date', () => {
  const today = new Date();
  const yesterday = addDays(today, -1);
  const tomorrow = addDays(today, 1);
  const oneWeekLater = addDays(today, 7);

  it('should be truthy that a filtered dates array by working days do not include weekend days', () => {
    const dayBefore = new Date().setMonth(today.getMonth - 1);
    const workingDaysBetween = getWorkingDatesRange(dayBefore, today);
    expect(workingDaysBetween.every(day => isWorkingDay(day))).toBeTruthy();
  });
  it('should be truthy that yesterday is before than today', () => {
    expect(isBefore(yesterday, today)).toBeTruthy();
  });
  it('should be truthy that today is after today', () => {
    expect(isAfter(today, yesterday)).toBeTruthy();
  });
  it('should be formatted and get into two an initial one digit time', () => {
    const dateTime = new Date().setHours(8);
    expect(formatTime(dateTime.getHours)).toHaveLength(2);
  });
  it('should be april 4th if its added 6 days to march 29th', () => {
    const marchTwentyNineth = new Date(2020, 2, 29);
    expect(addDays(marchTwentyNineth, 6)).toStrictEqual(new Date(2020, 3, 4));
  });
  it('should be april 14:30hs if its added 3 hours to 11:30hs', () => {
    const eleven = new Date().setHours(11, 0);
    const fourteenThirthy = new Date().setHours(14, 30);
    expect(addMinutes(addHours(eleven, 3), 30).getTime()).toStrictEqual(fourteenThirthy);
  });
  it('should be transformed into an 3 years array a list of 3 dates', () => {
    const date2000 = new Date(2000, 4, 30);
    const date2005 = new Date(2005, 11, 3);
    const date2008 = new Date(2008, 7, 12);
    const dates = [date2000, date2005, date2008];
    expect(mapDatesToYears(dates)).toStrictEqual([2000, 2005, 2008]);
  });
  it('should be falsy that now is a dateTime before that now with 3 more hours', () => {
    expect(isDateTimeBefore(addHours(today, 2), today)).toBeFalsy();
  });
  it('should be truthy that now is a dateTime before that tomorrow', () => {
    expect(isDateTimeBefore(today, tomorrow)).toBeTruthy();
  });
  it('should be truthy that now is a dateTime before that now', () => {
    expect(isDateTimeBefore(today, today)).toBeFalsy();
  });
  it('should be truthy that tomorrow is after now', () => {
    expect(isDateTimeBefore(today, tomorrow)).toBeTruthy();
  });
  it('should be falsy that tomorrow is before now', () => {
    expect(isDateTimeBefore(tomorrow, today)).toBeFalsy();
  });
  it('should be falsy that tomorrow is the same week day that today', () => {
    expect(isSameWeekDay(today, tomorrow)).toBeFalsy();
  });
  it('should be truthy that today is the same week day that one week later', () => {
    expect(isSameWeekDay(today, oneWeekLater.getDay())).toBeTruthy();
  });
  it('should be falsy that today is the same date that tomorrow', () => {
    expect(isSameDate(tomorrow, yesterday)).toBeFalsy();
  });
  it('should be truthy that today is the same date that today', () => {
    expect(isSameDate(today, today)).toBeTruthy();
  });
  it('should be truthy that passed more than 3 days from 4 days ago', () => {
    const fourDaysAgo = addDays(today, -4);
    expect(passedMoreThanNdays(fourDaysAgo, 3)).toBeTruthy();
  });
  it('should be falsy that passed more than 3 days from 2 days ago', () => {
    const twoDaysAgo = addDays(today, -2);
    expect(passedMoreThanNdays(twoDaysAgo, 3)).toBeFalsy();
  });
  it('should be truthy that August 23rd is out of August 24th and November 3rd range', () => {
    const twentyThird = new Date(2021, 7, 23);
    const twentyFourth = new Date(2021, 7, 24);
    const third = new Date(2021, 10, 3);
    expect(isOutOfRange(twentyThird, twentyFourth, third)).toBeTruthy();
  });
  it('should be falsy that August 23rd is out of August 20th and August 23rd range', () => {
    const twentyThird = new Date(2021, 7, 23);
    const twenty = new Date(2021, 7, 20);
    expect(isOutOfRange(twentyThird, twentyThird, twenty)).toBeTruthy();
  });
  it('should be truthy that a dates range between today and one week later includes tomorrow', () => {
    expect(getDatesRange(today, oneWeekLater)).toContainEqual(tomorrow);
  });
  it('should be falsy that a dates range between today and one week later includes yesterday', () => {
    expect(getDatesRange(today, oneWeekLater)).not.toContainEqual(yesterday);
  });
  it('should be truthy that between today and two weeks after are 15 days (including both of them)', () => {
    expect(getNumberOfDaysBetween(today, addDays(today, 14))).toStrictEqual(15);
  });
  it('should be truthy that today is the same date that today', () => {
    expect(isSameDate(today, today)).toBeTruthy();
  });
  it('should be falsy that today is the same date that tomorrow', () => {
    expect(isSameDate(today, tomorrow)).toBeFalsy();
  });
});
