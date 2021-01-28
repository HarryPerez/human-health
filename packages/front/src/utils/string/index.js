import {
  BLANK_REGEX,
  CAPITAL_LETTERS_REGEX,
  LETTERS_REGEX,
  NUMBERS_REGEX,
  SNAKE_CASE_REGEX,
  SPACES_REGEX
} from './regex';

export const isString = value => typeof value === 'string';

export const snakeToCamelCase = string =>
  string.replace(SNAKE_CASE_REGEX, substring => substring?.[1].toUpperCase());

export const camelToSnakeCase = string =>
  string.replace(CAPITAL_LETTERS_REGEX, letter => `_${letter.toLowerCase()}`);

export const takeNCharacters = n => text => text.slice(0, n);

export const dropNCharacters = n => text => text.slice(n, text.length);

export const concatenate = (...strings) => strings.join(' ');

export const isBlank = string => BLANK_REGEX.test(string);

export const removeNumbers = string => string.replace(NUMBERS_REGEX, '');

export const onlyNumbers = string => string.replace(LETTERS_REGEX, '');

export const replaceSpacesWithDashes = string => string.replace(SPACES_REGEX, '-');

export const capitalize = string => string?.[0].toUpperCase().concat(string.slice(1).toLowerCase());

export const decapitalize = string => string?.[0].toLowerCase().concat(string.slice(1));

export const getFirstWordFrom = string => string.split(' ').find(newString => newString !== '');

export const alphabeticCompare = (aString, otherString) => aString.localeCompare(otherString);

export const reverse = string => string.split('').reverse().join('');

export const repeat = n => string => new Array(n + 1).join(string);
