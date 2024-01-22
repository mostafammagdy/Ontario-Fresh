import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'

import '../styles.scss'
import styles from '../styles.module.scss'

import InputRadioChecked from '../../../assets/images/components/InputRadioChecked'
import Tooltip from '../../Tooltip'

const radioSelected = setAnimatedBurst => {
    setAnimatedBurst(' animateBurst')
    setTimeout(() => {
        setAnimatedBurst('')
    }, 500);
}

const RadioButton = props => {
    const { label, tooltip, group, value, masthead, radioButtonState, setRadioButtonState, errorMessage, descriptionId, formId, currentTooltip, setCurrentTooltip, tooltipOffsetElementId } = props
    const [ animateBurst, setAnimatedBurst ] = useState('')
    /*
    console.log(`%c ${label} defaultChecked?:`, 'color: orange; font-weight: bold;')
    console.log(checkboxState[value])
    */
    return (
        <div className={`formRadioButtonsGroup__container ${styles.formRadioButtonsGroup__container}${masthead ? ' formRadioButtonsGroup__container--masthead' : ''}`}>
            <div className={tooltip ? `formRadioButtonsGroup__labelTooltip ${styles.formRadioButtonsGroup__labelTooltip}` : null}>
                <div className={tooltip ? `formRadioButtonsGroup__labelTooltip__labelWrapper ${styles.formRadioButtonsGroup__labelTooltip__labelWrapper}` : null}>
                    <label
                        className={`formRadioButtonsGroup__label ${styles.formRadioButtonsGroup__label}${masthead ? ' formRadioButtonsGroup__label--masthead ' + styles['formRadioButtonsGroup__label--masthead'] : ''}`}
                        htmlFor={!!formId ? `${formId}-${value}` : value}
                    >
                        <span className={`formRadioButtonsGroup__input ${styles.formRadioButtonsGroup__input}${masthead ? ' ' + styles['formRadioButtonsGroup__input--masthead'] : ''}`}>
                            <input
                                type='radio'
                                name={!!formId ? `${formId}-${group}` : group}
                                id={!!formId ? `${formId}-${value}` : value}
                                className={`formRadioButtonsGroup__radio ${styles.formRadioButtonsGroup__radio}`}
                                value={value}
                                checked={radioButtonState === value}
                                aria-checked={radioButtonState === value}
                                onChange={() => {
                                    setRadioButtonState(value)
                                    radioSelected(setAnimatedBurst)
                                }}
                                aria-describedby={errorMessage ? `${descriptionId}-desc` : null}
                            />
                            {
                                masthead ?
                                        <img
                                            src={`/uploads/masthead/${value}.png`}
                                            alt=''
                                            className={`formRadioButtonsGroup__masthead ${styles.formRadioButtonsGroup__masthead}`}
                                        />
                                    :
                                    <span
                                        className={`formRadioButtonsGroup__styledRadio ${styles.formRadioButtonsGroup__styledRadio}`}
                                        aria-hidden='true'
                                        focusable='false'
                                    >
                                        <div className={`radioButtonBurst${animateBurst}`}>&nbsp;</div>
                                        <InputRadioChecked
                                            svgClassName='radioButtonChecked'
                                        />
                                    </span>
                            }
                        </span>
                        <span className={`formRadioButtonsGroup__labelText ${styles.formRadioButtonsGroup__labelText}${masthead ? ' ' + styles['formRadioButtonsGroup__labelText--hidden'] : ''}`}>
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
                </div>
            </div>
        </div>
    )
}

RadioButton.defaultName = 'RadioButton'

RadioButton.defaultProps = {
    masthead: false
}

RadioButton.propTypes = {
    label: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
    group: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    masthead: PropTypes.bool,
    radioButtonState: PropTypes.string.isRequired,
    setRadioButtonState: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    descriptionId: PropTypes.string,
    formId: PropTypes.string,
    currentTooltip: PropTypes.string,
    setCurrentTooltip: PropTypes.func,
    tooltipOffsetElementId: PropTypes.string
}

export default RadioButton