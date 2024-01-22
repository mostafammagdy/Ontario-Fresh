import { sortBy, values, map } from 'lodash'

export const convertObjectToSortedArray = (object, key = 'display') => {
  return sortBy(values(object), [key])
}

export const convertObjectToSortedArrayWithKey = (objectOfObjects, key = 'display') => {
  return sortBy(map(objectOfObjects, (value, objectKey) => ({ ...value, key: objectKey })), [key])
}
