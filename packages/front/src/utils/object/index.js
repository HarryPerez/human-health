import { camelToSnakeCase, isString, snakeToCamelCase } from '~utils/string';

export const isObject = value => typeof value === 'object';

const changeCaseObject = ({ originalObject, caseFunction, nestedCaseFunction }) => {
  const newObject = {};
  Object.entries(originalObject).forEach(([key, value]) => {
    newObject[caseFunction(key)] =
      isObject(value) && Object.keys(value).length ? nestedCaseFunction(value.dataValues) : value;
  });
  return newObject;
};

export const objectToCamelCase = snakeCaseObject =>
  changeCaseObject({
    originalObject: snakeCaseObject,
    caseFunction: snakeToCamelCase,
    nestedCaseFunction: objectToCamelCase
  });

export const objectToSnakeCase = camelCaseObject =>
  changeCaseObject({
    originalObject: camelCaseObject,
    caseFunction: camelToSnakeCase,
    nestedCaseFunction: objectToSnakeCase
  });

export const isEmptyObject = object => !Object.keys(object).length;

export const generatePKObject = (list, primaryKey) => {
  const object = {};
  list.forEach(elem => {
    object[elem[primaryKey]] = elem;
  });
  return object;
};

export const findKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value);

export const deleteUndefined = object => {
  const newObject = { ...object };
  Object.keys(newObject).forEach(key => newObject[key] === undefined && delete newObject[key]);
  return newObject;
};

// Removes keys with values undefined or null
export const removeEmptyKeys = object => {
  const values = [undefined, null];
  if (isObject(object) && !Array.isArray(object)) {
    const newObject = {};
    Object.keys(object)
      .filter(key => !values.includes(object[key]))
      .forEach(key => {
        newObject[key] = removeEmptyKeys(object[key]);
      });
    return newObject;
  }
  return object;
};

const reduceObject = (element, reducer) => {
  if (!isObject(element) || !element) {
    return element;
  }
  const elementCopy = { ...element };
  return Object.keys(element).reduce((acum, key) => reducer(acum, key, elementCopy), {});
};

export const objectTrim = values =>
  reduceObject(values, (accumulator, key) => {
    accumulator[key] = isString(values[key]) ? values[key].trim() : objectTrim(values[key]);
    return accumulator;
  });

export const deleteNull = values =>
  reduceObject(values, (accumulator, key) => {
    if (values[key] !== null) {
      accumulator[key] = deleteNull(values[key]);
    }
    return accumulator;
  });

export const assignValueToAllKeys = (object, value) =>
  reduceObject(object, (accumulator, key) => ({ ...accumulator, [key]: value }));

/*
  Returns the union of multiple objects but if the properties of the last objects
  are repeated in the first ones then they will be overwritten.

  Example:
    const objects = [{ a: 1, b: 2 }, { b: 3, c: 4 }, { c: 5, d: 6 }];
    const newObject = merge(objects);
    console.log(newObject);
  expected output: { a: 1, b: 3, c: 5, d:6 }
*/
export const merge = objects => {
  const newObject = {};
  objects.map(object => Object.assign(newObject, object));
  return newObject;
};
