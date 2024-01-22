import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.scss'
import './styles.scss'

import FormRadioButton from './FormRadioButton'
import FormErrorMessage from '../../components/FormErrorMessage'
import Tooltip from '../Tooltip'

const renderRadioButtons = (radioButton, id, selectedRadioButtons, setRadioButtonsStates, errorMessage, descriptionId, formId) => {
    return (
        <FormRadioButton
            key={`formRadioButton-${id}`}
            label={radioButton.label}
            group={radioButton.group}
            value={radioButton.value}
            masthead={radioButton.masthead || false}
            radioButtonState={selectedRadioButtons}
            setRadioButtonState={setRadioButtonsStates}
            errorMessage={errorMessage}
            descriptionId={descriptionId}
            formId={formId}
        />
    )
}

const FormRadioButtonsGroup = props => {
    const {
        label,
        tooltip,
        currentTooltip,
        setCurrentTooltip,
        tooltipOffsetElementId,
        id,
        flex,
        radioButtons,
        selectedRadioButtons,
        setRadioButtonsStates,
        errorMessage,
        formId
    } = props
    /*
    console.log('%c selectedRadioButtons: ', 'color: red; font-weight: bold;')
    console.log(selectedRadioButtons)
    */
    return (
        <fieldset
            className={`${styles.formRadioButtonsGroup}${errorMessage ? ' ' + styles['formRadioButtonsGroup--error'] : ''}`}
            id={`error-${id}`}
            tabIndex='-1'
        >
            {
                !!label &&
                    <legend
                        className={`formRadioButtonsGroup__legend ${styles.formRadioButtonsGroup__legend}`}
                        id={`${id}-legend`}
                        tabIndex='-1'
                    >
                        {label}
                        {
                            tooltip &&
                                <Tooltip
                                    id={`${id}-legend`}
                                    tip={tooltip}
                                    currentTooltip={currentTooltip}
                                    setCurrentTooltip={setCurrentTooltip}
                                    tooltipOffsetElementId={tooltipOffsetElementId}
                                />
                        }
                    </legend>
            }
            <div className={flex ? `formRadioButtonsGroup__flex ${styles.formRadioButtonsGroup__flex}` : null}>
                {
                    radioButtons.map((checkbox, i) => {
                        return renderRadioButtons(checkbox, i, selectedRadioButtons, setRadioButtonsStates, errorMessage, id, formId)
                    })
                }
            </div>
            {
                errorMessage &&
                    <FormErrorMessage
                        id={id}
                        errorMessage={errorMessage}
                    />
            }
        </fieldset>
    )
}

FormRadioButtonsGroup.defaultName = 'FormRadioButtonsGroup'

FormRadioButtonsGroup.defaultProps = {
    flex: true
}

FormRadioButtonsGroup.propTypes = {
    label: PropTypes.string,
    tooltip: PropTypes.string,
    id: PropTypes.string.isRequired,
    flex: PropTypes.bool,
    checkboxes: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        group: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        masthead: PropTypes.bool
    })),
    selectedCheckboxes: PropTypes.objectOf(PropTypes.bool),
    setCheckboxStates: PropTypes.func,
    errorMessage: PropTypes.string,
    formId: PropTypes.string,
    currentTooltip: PropTypes.string,
    setCurrentTooltip: PropTypes.func,
    tooltipOffsetElementId: PropTypes.string
}

export default FormRadioButtonsGroup