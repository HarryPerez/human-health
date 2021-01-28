/* eslint-disable camelcase */
import { CAMEL_VERIFICATION_REGEX, SNAKE_VERIFICATION_REGEX, WHITE_SPACES_REGEX } from './regex';

import {
  assignValueToAllKeys,
  deleteNull,
  deleteUndefined,
  findKeyByValue,
  generatePKObject,
  isEmptyObject,
  isObject,
  merge,
  objectToCamelCase,
  objectToSnakeCase,
  objectTrim,
  removeEmptyKeys
} from './index';

describe('object', () => {
  it('should be falsy that an empty string is an object', () => {
    expect(isObject('')).toBeFalsy();
  });
  it('should be truthy that an empty object is an object', () => {
    expect(isObject({})).toBeTruthy();
  });
  it('should convert all styled snake case strings inside an object to camel case', () => {
    const object = objectToCamelCase({
      string_prueba: 'string_prueba',
      sebastian_torrico: 'sebastian_torrico',
      edgardo_bauza: 'edgardo_bauza'
    });
    const keys = Object.keys(object);
    expect(keys.every(key => key.match(CAMEL_VERIFICATION_REGEX))).toBeTruthy();
  });
  it('should convert all styled camel case strings inside an object to snake case', () => {
    const object = objectToSnakeCase({
      stringPrueba: 'stringPrueba',
      sebastianTorrico: 'sebastianTorrico',
      edgardoBauza: 'edgardoBauza'
    });
    const keys = Object.keys(object);
    expect(keys.every(key => key.match(SNAKE_VERIFICATION_REGEX))).toBeTruthy();
  });
  it('should be truthy that an empty object is empty', () => {
    expect(isEmptyObject({})).toBeTruthy();
  });
  it('should be falsy that a object with keys and values is empty', () => {
    expect(isEmptyObject({ a: 'a', b: 'b', c: 'c' })).toBeFalsy();
  });
  it('should find the wanted key by value', () => {
    expect(
      findKeyByValue({ a: 'stringPrueba', b: 'sebastianTorrico', c: 'edgardoBauza' }, 'edgardoBauza')
    ).toBe('c');
  });
  it('should delete all the undefined values', () => {
    const object = deleteUndefined({
      a: null,
      b: 'sebastianTorrico',
      c: undefined,
      d: 0,
      f: undefined
    });
    const values = Object.values(object);
    expect(values.some(value => value === undefined)).toBeFalsy();
  });
  it('should delete all the null values', () => {
    const object = deleteNull({
      a: null,
      b: 'sebastianTorrico',
      c: undefined,
      d: 0,
      f: undefined
    });
    const values = Object.values(object);
    expect(values.some(value => value === null)).toBeFalsy();
  });
  it('should delete all the empty keys', () => {
    const object = removeEmptyKeys({
      a: null,
      b: 'sebastianTorrico',
      c: undefined,
      d: 0,
      f: undefined
    });
    const values = Object.values(object);
    expect(values.some(value => [undefined, null].includes(value))).toBeFalsy();
  });
  it('should trim all the values of an object', () => {
    const object = objectTrim({
      a: '    stringPrueba    ',
      b: '    sebastianTorrico',
      c: 'edgardoBauza        '
    });
    const values = Object.values(object);
    expect(values.every(value => !value.match(WHITE_SPACES_REGEX))).toBeTruthy();
  });
  it('should assign the value to all the keys', () => {
    const object = assignValueToAllKeys(
      {
        a: 'a',
        b: 'b',
        c: 'c'
      },
      'edgardoBauza'
    );
    const values = Object.values(object);
    expect(values.every(value => value === 'edgardoBauza')).toBeTruthy();
  });
  it('should merge all the objects into one', () => {
    const objects = [
      {
        a: 'a',
        b: 'b',
        c: 'c'
      },
      {
        d: 'd',
        e: 'e'
      },
      {
        stringPrueba: 'stringPrueba',
        sebastianTorrico: 'sebastianTorrico',
        edgardoBauza: 'edgardoBauza'
      }
    ];
    expect(merge(objects)).toStrictEqual({
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e',
      stringPrueba: 'stringPrueba',
      sebastianTorrico: 'sebastianTorrico',
      edgardoBauza: 'edgardoBauza'
    });
  });
  it('should generate PK object', () => {
    const objects = [
      {
        id: 'a',
        value: 'edgardoBauza'
      },
      {
        id: 'b',
        value: 'sebastianTorrico'
      },
      {
        id: 'c',
        value: 'angelCorrea'
      }
    ];
    expect(generatePKObject(objects, 'id')).toStrictEqual({
      a: {
        id: 'a',
        value: 'edgardoBauza'
      },
      b: {
        id: 'b',
        value: 'sebastianTorrico'
      },
      c: {
        id: 'c',
        value: 'angelCorrea'
      }
    });
  });
});
