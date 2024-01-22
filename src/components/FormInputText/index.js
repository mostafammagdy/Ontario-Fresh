import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import './style.scss'
import styles from './style.module.scss'

import FormErrorMessage from '../../components/FormErrorMessage'
import Tooltip from '../Tooltip'

const FormInputText = props => {
    const {
        label,
        tooltip,
        currentTooltip,
        setCurrentTooltip,
        tooltipOffsetElementId,
        description,
        id,
        type,
        setInputState,
        placeholder,
        value,
        required,
        rows,
        maxLength,
        errorMessage,
        focus,
        formInputTextStyles,
        labelStyles,
        inputStyles,
        errorMessageStyles,
        onFocusFunc,
        hideColon
    } = props
    /*
    console.log('%c FormInputText props.value:', 'color: red; font-weight: bold;')
    console.log({ value })
    */
   const inputElement = useRef(null)
   useEffect(() => {
        if (focus)
            inputElement.current.focus()
   }, [])

    return (
        <div className={`formInputText ${styles.formInputText}${errorMessage ? ' formInputText--error '  + styles['formInputText--error'] : ''}`}>
            <div className={tooltip ? styles.formInputText__labelTooltip : null}>
                <div className={tooltip ? styles.formInputText__labelTooltip__labelWrapper : null}>
                    <label
                        className={`formInputText__label ${styles.formInputText__label}`}
                        htmlFor={id}
                    >
                        {`${label}${required ? ' (required)' : ''}${!hideColon ? ':' : ''}`}
                    </label>
                    {
                        tooltip &&
                            <Tooltip
                                id={id}
                                tip={tooltip}
                                currentTooltip={currentTooltip}
                                setCurrentTooltip={setCurrentTooltip}
                                tooltipOffsetElementId={tooltipOffsetElementId}
                            />
                    }
                </div>
            </div>
            {
                type !== 'textarea' ?
                        <input
                            type={type}
                            name={id}
                            id={id}
                            ref={inputElement}
                            className={`formInputText__input ${styles.formInputText__input}`}
                            onChange={e => setInputState(e.target.value)}
                            placeholder={placeholder}
                            value={value}
                            required={required ? 'required' : null}
                            maxLength={!!maxLength ? `${maxLength}` : null}
                            aria-describedby={errorMessage ?
                                    `${id}-desc`
                                : description ?
                                        `${id}-description`
                                    : null
                            }
                            onFocus={onFocusFunc ? e => onFocusFunc(e) : null}
                            onKeyDown={onFocusFunc ? e => onFocusFunc(e) : null}
                        />
                    :
                    <textarea
                        name={id}
                        id={id}
                        ref={inputElement}
                        className={`formInputText__input ${styles.formInputText__input}`}
                        onChange={e => setInputState(e.target.value)}
                        placeholder={placeholder}
                        value={value}
                        required={required ? 'required' : null}
                        rows={rows}
                        maxLength={!!maxLength ? `${maxLength}` : null}
                        aria-describedby={errorMessage ?
                                `${id}-desc`
                            : description ?
                                    `${id}-description`
                                : null
                        }
                    />
            }
            {
                description &&
                    <p
                        className={`${styles.formInputText__description} formInputText__description`}
                        id={`${id}-description`}
                        dangerouslySetInnerHTML={{
                            __html: description
                        }}
                        aria-hidden={description && !errorMessage}
                    />
            }
            {
                required && errorMessage &&
                    <FormErrorMessage
                        id={id}
                        errorMessage={errorMessage}
                        errorMessageStyles={errorMessageStyles}
                    />
            }
        </div>
    )
}

FormInputText.defaultName = 'FormInputText'

FormInputText.defaultProps = {
    placeholder: null,
    required: false,
    rows: 2,
    errorMessage: null,
    focus: false,
    hideColon: false
}

FormInputText.propTypes = {
    label: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
    currentTooltip: PropTypes.string,
    setCurrentTooltip: PropTypes.func,
    tooltipOffsetElementId: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    setInputState: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf([
        'text',
        'email',
        'password',
        'tel',
        'url',
        'textarea'
    ]).isRequired,
    value: PropTypes.string,
    required: PropTypes.bool.isRequired,
    rows: PropTypes.number,
    maxLength: PropTypes.number,
    errorMessage: PropTypes.string,
    focus: PropTypes.bool,
    formInputTextStyles: PropTypes.string,
    labelStyles: PropTypes.string,
    inputStyles: PropTypes.string,
    errorMessageStyles: PropTypes.string,
    hideColon: PropTypes.bool
}

export default FormInputText;