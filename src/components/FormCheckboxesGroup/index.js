import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.scss'
import './styles.scss'

import FormCheckbox from './FormCheckbox'
import FormErrorMessage from '../../components/FormErrorMessage'
import Tooltip from '../Tooltip'

const renderCheckboxes = (checkbox, id, selectedCheckboxes, setCheckboxStates, customSetCheckboxStates, errorMessage, descriptionId, formId, currentTooltip, setCurrentTooltip, tooltipOffsetElementId) => {
    return (
        <FormCheckbox
            key={`formCheckbox-${id}`}
            label={checkbox.label}
            tooltip={checkbox.tooltip}
            description={checkbox.description}
            value={checkbox.value}
            icon={checkbox.icon || false}
            checkboxState={selectedCheckboxes}
            setCheckboxState={setCheckboxStates}
            customSetCheckboxStates={customSetCheckboxStates}
            errorMessage={errorMessage}
            descriptionId={descriptionId}
            formId={formId}
            currentTooltip={!!checkbox.tooltip ? currentTooltip : null}
            setCurrentTooltip={!!checkbox.tooltip ? setCurrentTooltip : null}
            tooltipOffsetElementId={!!checkbox.tooltip ? tooltipOffsetElementId : null}
        />
    )
}

const FormCheckboxesGroup = props => {
    const {
        label,
        tooltip,
        currentTooltip,
        setCurrentTooltip,
        tooltipOffsetElementId,
        instructions,
        id,
        emphasized,
        flex,
        center,
        icons,
        checkboxes,
        selectedCheckboxes,
        setCheckboxStates,
        customSetCheckboxStates,
        errorMessage,
        formId
    } = props
    /*
    console.log('%c FormCheckboxesGroup props: ', 'color: orange; font-weight: bold;')
    console.log(props)
    */
    return (
        <fieldset
            className={`${styles.formCheckboxesGroup} formCheckboxesGroup${errorMessage ? ' ' + styles['formCheckboxesGroup--error'] : ''}${emphasized ? ' formCheckboxesGroup--emphasized' : ''}`}
            id={`error-${id}`}
            tabIndex='-1'
        >
            {
                !!label &&
                    <legend
                        className={`formCheckboxesGroup__legend ${styles.formCheckboxesGroup__legend}`}
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
            {
                instructions &&
                    <p>{instructions}</p>
            }
            <div className={flex ? `formCheckboxesGroup__flex ${styles.formCheckboxesGroup__flex}` : !flex && center ? `formCheckboxesGroup__center ${styles.formCheckboxesGroup__center}` : !flex && icons ? `formCheckboxesGroup__icons ${styles.formCheckboxesGroup__icons}` : null}>
                {
                    checkboxes.map((checkbox, i) => {
                        return renderCheckboxes(checkbox, i, selectedCheckboxes, setCheckboxStates, customSetCheckboxStates, errorMessage, id, formId, currentTooltip, setCurrentTooltip, tooltipOffsetElementId)
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

FormCheckboxesGroup.defaultName = 'FormCheckboxesGroup'

FormCheckboxesGroup.defaultProps = {
    emphasized: false,
    flex: true,
    center: false,
    icons: false,
    customSetCheckboxStates: false
}

FormCheckboxesGroup.propTypes = {
    label: PropTypes.string,
    tooltip: PropTypes.string,
    instructions: PropTypes.string,
    id: PropTypes.string.isRequired,
    emphasized: PropTypes.bool,
    flex: PropTypes.bool,
    center: PropTypes.bool,
    icons: PropTypes.bool,
    checkboxes: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    })).isRequired,
    selectedCheckboxes: PropTypes.objectOf(PropTypes.bool).isRequired,
    setCheckboxStates: PropTypes.func.isRequired,
    customSetCheckboxStates: PropTypes.bool,
    errorMessage: PropTypes.string,
    formId: PropTypes.string,
    currentTooltip: PropTypes.string,
    setCurrentTooltip: PropTypes.func,
    tooltipOffsetElementId: PropTypes.string
}

export default FormCheckboxesGroup