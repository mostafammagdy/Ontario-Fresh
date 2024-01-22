import { map } from 'lodash'
import React from 'react'

/* 
 * allow new lines to be displayed in a div. it is recommended that this function is called in a <div></div>
 * currently used for messages and profile descriptions
 */

export const formatText = (string) => {
  if (typeof string !== 'string') {
    return string
  }

  let result = []
  map(string.split("\n"), (substring, index) => {
    if (index > 0) {
      result.push(<br key={index} />)
    }
    result.push(substring)
  })

  return result
}
