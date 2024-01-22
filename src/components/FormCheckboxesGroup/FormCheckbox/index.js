import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'

import styles from '../styles.module.scss'
import '../styles.scss'

import InputCheckboxChecked from '../../../assets/images/components/InputCheckboxChecked'
import Tooltip from '../../Tooltip'

const checkboxSelected = (state, set, custom, value, setAnimatedBurst, formId) => {
    /*
    console.log(`%c event.target.checked:`, 'color: blue; font-weight: bold;')
    console.log(event.target.checked)
    */
    /*
    console.log(`%c state[${value}]:`, 'color: blue; font-weight: bold;')
    console.log(state[value])
    */
    if (!custom) {
        if (!state[value])
            set(prevState => ({ ...prevState, [value]: true }))
        else
            set(prevState => ({ ...prevState, [value]: false }))
    } else {
        set(value, formId)
    }
    setAnimatedBurst(' animateBurst')
    setTimeout(() => {
        setAnimatedBurst('')
    }, 500);
}

const FormCheckbox = props => {
    const { label, tooltip, description, value, icon, checkboxState, setCheckboxState, customSetCheckboxStates, disabled, errorMessage, descriptionId, formId, currentTooltip, setCurrentTooltip, tooltipOffsetElementId, showInput } = props
    const [ animateBurst, setAnimatedBurst ] = useState('')
    /*
    console.log(`%c ${label} defaultChecked?:`, 'color: orange; font-weight: bold;')
    console.log(checkboxState[value])
    */
    /*
    console.log('%c tooltip:', 'color: red; font-weight: bold;')
    console.log({ tooltip })
    */
    /*
    console.log('%c showInput:', 'color: red; font-weight: bold;')
    console.log({ showInput })
    */
    if (!showInput)
        return null
    return (
        <div className={`formCheckboxesGroup__container ${styles.formCheckboxesGroup__container}${icon ? ' formCheckboxesGroup__container--icon' : ''}`}>
            {
                disabled ?
                        <p
                            id={!!formId ? `${formId}-${value}` : value}
                            tabIndex='-1'
                        >
                            <strong>{label}</strong>
                        </p>
                    :
                    <div className={tooltip ? `formCheckboxesGroup__labelTooltip ${styles.formCheckboxesGroup__labelTooltip}` : null}>
                        <div className={tooltip ? `formCheckboxesGroup__labelTooltip__labelWrapper ${styles.formCheckboxesGroup__labelTooltip__labelWrapper}` : null}>
                            <label
                                className={`formCheckboxesGroup__label ${styles.formCheckboxesGroup__label}${icon ? ' formCheckboxesGroup__label--icon ' + styles['formCheckboxesGroup__label--icon'] : ''}`}
                                htmlFor={!!formId ? `${formId}-${value}` : value}
                            >
                                <span className={`formCheckboxesGroup__input ${styles.formCheckboxesGroup__input}${icon ? ' ' + styles['formCheckboxesGroup__input--icon'] : ''}`}>
                                    <input
                                        type='checkbox'
                                        name={!!formId ? `${formId}-${value}` : value}
                                        id={!!formId ? `${formId}-${value}` : value}
                                        className={`formCheckboxesGroup__checkbox ${styles.formCheckboxesGroup__checkbox}`}
                                        value={value}
                                        checked={checkboxState[value]}
                                        aria-checked={checkboxState[value]}
                                        disabled={disabled}
                                        onChange={() => checkboxSelected(checkboxState, setCheckboxState, customSetCheckboxStates, value, setAnimatedBurst, formId)}
                                        aria-describedby={errorMessage ?
                                                `${descriptionId}-desc`
                                            : description ?
                                                    `${!!formId ? `${formId}-${value}` : value}-desc`
                                                : null
                                        }
                                    />
                                    {
                                        icon ?
                                                <img
                                                    src={`/uploads/icons/icon_${value}.svg`}
                                                    alt=''
                                                    className={`formCheckboxesGroup__icon ${styles.formCheckboxesGroup__icon}`}
                                                />
                                            :
                                            <span
                                                className={`formCheckboxesGroup__styledCheckbox ${styles.formCheckboxesGroup__styledCheckbox}`}
                                                aria-hidden='true'
                                                focusable='false'
                                            >
                                                <div className={`checkboxButtonBurst${animateBurst}`}>&nbsp;</div>
                                                <InputCheckboxChecked
                                                    svgClassName='checkboxButtonChecked'
                                                />
                                            </span>
                                    }
                                </span>
                                <span className={`formCheckboxesGroup__labelText ${styles.formCheckboxesGroup__labelText}${icon ? ' ' + styles['formCheckboxesGroup__labelText--hidden'] : ''}`}>
                                    {`${label}`}
                                </span>
                            </label>
                            {
                                tooltip &&
                                    <Tooltip
                                        id={!!formId ? `${formId}-${value}` : value}
                                        tip={tooltip}
                                        currentTooltip={currentTooltip}
                                        setCurrentTooltip={setCurrentTooltip}
                                        tooltipOffsetElementId={tooltipOffsetElementId}
                                    />
                            }
                            {
                                description &&
                                    <p
                                        className={styles.formCheckboxesGroup__description}
                                        id={`${!!formId ? `${formId}-${value}` : value}-desc`}
                                        dangerouslySetInnerHTML={{
                                            __html: description
                                        }}
                                        aria-hidden={description && !errorMessage}
                                    />
                            }
                        </div>
                    </div>
            }
        </div>
    )
}

FormCheckbox.defaultName = 'FormCheckbox'

FormCheckbox.defaultProps = {
    icon: false,
    customSetCheckboxStates: false,
    disabled: false,
    showInput: true
}

FormCheckbox.propTypes = {
    label: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
    description: PropTypes.string,
    value: PropTypes.string.isRequired,
    icon: PropTypes.bool,
    checkboxState: PropTypes.object.isRequired,
    setCheckboxState: PropTypes.func.isRequired,
    customSetCheckboxStates: PropTypes.bool,
    disabled: PropTypes.bool,
    errorMessage: PropTypes.string,
    descriptionId: PropTypes.string,
    formId: PropTypes.string,
    currentTooltip: PropTypes.string,
    setCurrentTooltip: PropTypes.func,
    tooltipOffsetElementId: PropTypes.string,
    showInput: PropTypes.bool
}

export default FormCheckbox