/* eslint-disable max-statements */
import {
  alphabeticCompare,
  camelToSnakeCase,
  capitalize,
  concatenate,
  decapitalize,
  dropNCharacters,
  getFirstWordFrom,
  isBlank,
  isString,
  onlyNumbers,
  removeNumbers,
  repeat,
  replaceSpacesWithDashes,
  reverse,
  snakeToCamelCase,
  takeNCharacters
} from './index';

describe('string', () => {
  it('should be falsy that an object is a string', () => {
    expect(isString({})).toBeFalsy();
  });
  it('should be truthy that an empty string is a string', () => {
    expect(isString('')).toBeTruthy();
  });
  it('should convert a styled snake case string to camel case', () => {
    expect(snakeToCamelCase('string_prueba')).toBe('stringPrueba');
  });
  it('should return a string that is equal to the given one if it is in camel case', () => {
    expect(snakeToCamelCase('stringPrueba')).toBe('stringPrueba');
  });
  it('should convert a styled camel case string to snake case', () => {
    expect(camelToSnakeCase('stringPrueba')).toBe('string_prueba');
  });
  it('should return a string that is equal to the given one if it is in snake case', () => {
    expect(camelToSnakeCase('string_prueba')).toBe('string_prueba');
  });
  it('should take the first 4 characters of the string', () => {
    const take4Characters = takeNCharacters(4);
    expect(take4Characters('string')).toBe('stri');
  });
  it('should be an empty string if the given number is 0', () => {
    const take0Characters = takeNCharacters(0);
    expect(take0Characters('string')).toBe('');
  });
  it('should take all the characters if the number passed is greater than the length of the string', () => {
    const take10Characters = takeNCharacters(10);
    expect(take10Characters('string')).toBe('string');
  });
  it('should drop the first 4 characters of the string', () => {
    const drop4Characters = dropNCharacters(4);
    expect(drop4Characters('string')).toBe('ng');
  });
  it('shouldn`t drop characters of the string', () => {
    const drop0Characters = dropNCharacters(0);
    expect(drop0Characters('string')).toBe('string');
  });
  it('should drop all the characters if the number passed is greater than the length of the string', () => {
    const drop10Characters = dropNCharacters(10);
    expect(drop10Characters('string')).toBe('');
  });
  it('should concatanate all the strings passed', () => {
    expect(concatenate('Carlos', 'Pedro', 'Pablo')).toBe('Carlos Pedro Pablo');
  });
  it('shouldn`t concatanate if no string is passed', () => {
    expect(concatenate()).toBe('');
  });
  it('should be truthy that an empty string is blank', () => {
    expect(isBlank('')).toBeTruthy();
  });
  it('should be falsy that a not empty string is blank', () => {
    expect(isBlank('string')).toBeFalsy();
  });
  it('should remove all the numbers of the given string', () => {
    expect(removeNumbers('1234s5t5r5i5n5g6789')).toBe('string');
  });
  it('should remove all the letters of the given string', () => {
    expect(onlyNumbers('1234s5t5r5i5n5g6789')).toBe('1234555556789');
  });
  it('should replace all the spaces of the given string with dashes', () => {
    expect(replaceSpacesWithDashes(' Carlos     Pedro     Pablo ')).toBe('-Carlos-----Pedro-----Pablo-');
  });
  it('should capitalize the string if it´s not capitalized', () => {
    expect(capitalize('cArLoS')).toBe('Carlos');
  });
  it('should decapitalize the string if it is capitalized', () => {
    expect(decapitalize('Carlos')).toBe('carlos');
  });
  it('should get the first word from the given sentence', () => {
    expect(getFirstWordFrom('Soso gracias por renunciar, andate a rosario')).toBe('Soso');
  });
  it('should get the first word from the given sentence with spaces before and after', () => {
    expect(getFirstWordFrom('  Carlos fue a   manejar   en su auto  ')).toBe('Carlos');
  });
  it('should return a negative number if the first string is alphabetically before the second one', () => {
    expect(alphabeticCompare('Carlos', 'Pablo')).toBeLessThan(0);
  });
  it('should return a positive number if the second string is alphabetically before the first one', () => {
    expect(alphabeticCompare('Pablo', 'Carlos')).toBeGreaterThan(0);
  });
  it('should return 0 if both strings are equals', () => {
    expect(alphabeticCompare('Carlos', 'Carlos')).toBe(0);
  });
  it('should reverse the given string', () => {
    expect(reverse('Carlos')).toBe('solraC');
  });
  it('should reverse the empty string', () => {
    expect(reverse('')).toBe('');
  });
  it('should repeat the given string 3 times', () => {
    const repeat3times = repeat(3);
    expect(repeat3times('String')).toBe('StringStringString');
  });
  it('shouldn`t repeat the given string if the number passed is 0', () => {
    const repeat0times = repeat(0);
    expect(repeat0times('String')).toBe('');
  });
  it('shouldn`t repeat an empty string', () => {
    const repeat10times = repeat(10);
    expect(repeat10times('')).toBe('');
  });
});
