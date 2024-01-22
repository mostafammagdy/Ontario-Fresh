import { map, isString, isObject, flatten, compact } from 'lodash'

export default function classNames (...args) {
  return compact(
    flatten(
      args.map((className) => {
        if (isString(className)) {
          return className
        } else if (Array.isArray(className)) {
          return className[1] ? className[0] : null
        } else if (isObject(className)) {
          return map(className, (val, key) => (val ? key : null))
        }
        return null
      }),
    ),
  ).join(' ')
}
