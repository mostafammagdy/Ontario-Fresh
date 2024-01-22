import React from 'react'

import styles from './styles.module.scss'

const StyledInput = ({
  input,
  label,
  type,
  hintText,
  meta: { touched, error, warning },
  half,
  textarea,
  tallTextArea,
  noResize,
  disabled,
  min,
  max,
  step,
  options,
  select,
  maxlength
}) =>
<div className={half ? styles.half : styles.full} style={{ display: 'inline-block', padding: '0 0.3rem' }}>
  <label>
    <span className={styles.fieldLabel}>{label}</span> {touched &&
      ((error &&
        <span className={styles.fieldError}>
          {error}
        </span>) ||
        (warning &&
          <span className={styles.fieldWarning}>
            {warning}
          </span>))}
  </label>
  <div>
    { textarea ?
        <textarea style={{ resize: noResize ? 'none' : 'vertical' }} rows={tallTextArea ? 7 : 3} {...input} disabled={disabled} placeholder={hintText} type={type} maxLength={maxlength} className={tallTextArea ? styles.fieldTallTextArea : styles.fieldInput} />
      : select ?
        <select {...input} placeholder={hintText} className={styles.fieldInput}>
          {
            options.map(o => <option key={o.value} value={o.value}>{o.name}</option>)
          }
        </select>
      :
        <input {...input} placeholder={hintText} disabled={disabled} min={min} max={max} step={step} type={type} maxLength={maxlength} className={styles.fieldInput} />
    }
   
    </div>
  </div>    

export default StyledInput