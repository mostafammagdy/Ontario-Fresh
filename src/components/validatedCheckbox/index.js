import React from 'react'
import { Checkbox } from 'redux-form-material-ui'

import styles from './styles.module.scss'

export class ValidatedCheckbox extends Checkbox {
  render() {
    const { meta: { touched, error } } = this.props
    return (
      <div>
        {super.render()}{touched && ((error && <span className={styles.fieldError}>{error}</span>))}
      </div>
    )
  }
}