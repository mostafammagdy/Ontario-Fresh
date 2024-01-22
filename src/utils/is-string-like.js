import { isString } from 'lodash'

export default function isStringLike(node) {
  if (!node) {
    return false
  }
  return isString(node)
}
