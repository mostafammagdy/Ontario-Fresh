import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.scss'
import './styles.scss'
import OntarioFreshLogo from '../../assets/images/ontario-fresh-logo.png'

import { useMailChimp, STATUS } from '../../hooks/useMailChimp'
import { validEmail } from '../../utils/form-input-validation-tests'
import FormValidationGlobalMutables from '../../utils/form-validation-global-mutables'
import { formInputValidationTestsRunner } from '../../utils/form-input-validation-tests-runner'

import FormLoadingMessage from './FormLoadingMessage'
import FormStatusMessage from './FormStatusMessage'
import FormErrorList from '../FormErrorList'
import FormInputText from '../FormInputText'

const MAILCHIMP_URL = 'https://ontariofresh.us7.list-manage.com/subscribe/post-json?u=c6a3a60f1cbd761d42f0cbc82&amp;id=7ba9153d49'
const FORM_ID = 'comingSoonForm'
let formStatus = {}
const FORM_LOADING_MESSAGE_ID = 'formLoadingMessage'
const FORM_STATUS_MESSAGE_ID = 'formStatusMessage'

/**
 * FORM_INPUT_VALIDATION_SETTINGS contains the settings specific to each group of inputs in the form that need to be validated. This object works in conjunction with FORM_INPUT_VALIDATION_TESTS, messageList[], formInputValidationTestsRunner() and validateForm().
 * 
 * Make sure that when you add a new error property, you give it a key that matches the ID of the form’s input or input group that you want to validate. The “focus” property is the ID of the page element you want to focus when the error message is selected by the user.
 */
const FORM_INPUT_VALIDATION_SETTINGS = {
    "comingSoonEmail": [
        {
            "test": paramsObj => validEmail(paramsObj),
            "message": "You must provide a valid email address.",
            "focus": "comingSoonEmail"
        }
    ]
}

const validateForm = (event, data, setErrorMessages, formId, subscribe) => {
    event.preventDefault()
    /*
    Unpack the setState() properties for all of the form’s input fields that need to be validated. Fields that don’t need to be validated don’t need to be unpacked.
    */
    const { inputEmail } = data
    /*
    Reset the error messages in the errorMessage useState() property.
    */
    setErrorMessages({
        comingSoonEmail: null,
        messageList: []
    })
    /*
    Reset the error messages in the global messageList array.
    */
    FormValidationGlobalMutables.messageList = []
    formStatus = {}
    // Validate the email address
    formInputValidationTestsRunner('comingSoonEmail', FORM_INPUT_VALIDATION_SETTINGS, { emailInputState: inputEmail }, setErrorMessages)
    /*
    Update the errorMessages useState() property with any error messages that might’ve been added during the above validation tests.
    */
    setErrorMessages(prevState => ({ ...prevState, messageList: FormValidationGlobalMutables.messageList }))
    /*
    console.log('%c validated:', 'color: red; font-weight: bold;')
    console.log({ validated: messageList < 1 })
    */
    /*
    If at least one of the form inputs that needed to be validated failed their test...
    */
    if (FormValidationGlobalMutables.messageList.length > 0) {
        /*
        ...focus the lead paragraph in the form’s error list area.
        */
        setTimeout(() => {
            document.getElementById(`${formId}-p`).focus()
        }, 1)
    /*
    Else if all of the form inputs that needed to be validated passed their tests...
    */
    } else
        subscribe({ EMAIL: inputEmail })
}

const setDontShowDialog = (localStorageVariable, undoTrapFocus, dialogContainer, setDialogVisible, focusOnClose) => {
    if (!!localStorageVariable) {
        localStorage.setItem(localStorageVariable, true)
        undoTrapFocus(dialogContainer)
        setDialogVisible(false)
        document.getElementById(focusOnClose).focus()
    }
}

const DialogComingSoon = props => {
    const { localStorageVariable, undoTrapFocus, dialogContainer, setDialogVisible, focusOnClose } = props
    const { subscribe, status, error, value } = useMailChimp(MAILCHIMP_URL)
    // const status = STATUS.error;
    const initialFocusElement = useRef(null)
    // useState() hook for the Email email input.
    const [ inputEmail, setInputEmail ] = useState('')
    // useState() hook for the form’s error messages.
    const [ errorMessages, setErrorMessages ] = useState({
        comingSoonEmail: null,
        messageList: []
    })
    /*
    useState() hook to display the form’s “Next steps” message when the form is being/has been submitted.
    */
    // const [ formStatus, setFormStatus ] = useState({})
    // useRef() hooks for directing focus to the form’s two submit cycle messages.
    // const formStatusMessage = useRef(null)
    useEffect(() => initialFocusElement.current.focus(), [])
    /*
    console.log('%c status and value:', 'color: red; font-weight: bold;')
    console.log({ status, value })
    */
    if (status === STATUS.loading) {
        formStatus = { status: 'loading' }
        // Shift focus to the message
        setTimeout(() => {
            document.getElementById(FORM_LOADING_MESSAGE_ID).focus()
        }, 1)
    }
    
    if (status === STATUS.error) {
        formStatus = { status: 'error', error }
        // Shift focus to the message
        setTimeout(() => {
            document.getElementById(FORM_STATUS_MESSAGE_ID).focus()
        }, 1)
    }
    
    if (value && value.includes('Already subscribed')) {
        formStatus = { status: 'alreadySubscribed' }
        // Shift focus to the message
        setTimeout(() => {
            document.getElementById(FORM_STATUS_MESSAGE_ID).focus()
        }, 1)
    }
    
    if (value) {
        formStatus = { status: 'success' }
        // Shift focus to the message
        setTimeout(() => {
            document.getElementById(FORM_STATUS_MESSAGE_ID).focus()
        }, 1)
    }

    return (
        <div className={`comingSoonDialog ${styles.comingSoonDialog}`}>
            <a href='https://ontariofresh.ca/'>
                <img
                    src={OntarioFreshLogo}
                    alt='Visit Ontario Fresh dot C.A.'
                    className={styles.comingSoonDialog__logo}
                />
            </a>
            <h1
                className={styles.comingSoonDialog__heading}
                ref={initialFocusElement}
                tabIndex='0'
            >
                Looking to Support and Buy Local?
            </h1>
            <p className={styles.comingSoonDialog__paragraph}><strong>Ontario</strong><em>fresh</em>.ca is making it easier for you to buy from local growers, producers & retailers, including Ontario wine, beer & cider! Sign up for our newsletter to be notified when we launch to the public and stay updated on all things local!</p>
            {
                formStatus.status === 'loading' &&
                    <FormLoadingMessage
                        formLoadingMessageStyles={styles.comingSoonDialog__loadingMessage}
                        spinnerContainerStyles={styles.comingSoonDialog__loadingMessage__spinnerContainer}
                        svgStyles={styles.comingSoonDialog__loadingMessage__spinnerContainer__svg}
                        pathStyles={styles.comingSoonDialog__loadingMessage__spinnerContainer__path}
                        messageStyles={styles.comingSoonDialog__loadingMessage__message}
                        messageId={FORM_LOADING_MESSAGE_ID}
                    />
            }
            {
                formStatus.status === 'error' &&
                    <FormStatusMessage
                        styles={`${styles.comingSoonDialog__submittedMessage} ${styles['comingSoonDialog__submittedMessage--error']}`}
                        id={FORM_STATUS_MESSAGE_ID}
                        statusMessage={`${formStatus.error}`}
                    />
            }
            {
                formStatus.status === 'alreadySubscribed' &&
                    <FormStatusMessage
                        styles={styles.comingSoonDialog__submittedMessage}
                        id={FORM_STATUS_MESSAGE_ID}
                        statusMessage='You are already subscribed to the mailing list.'
                    />
            }
            {
                formStatus.status === 'success' &&
                    <FormStatusMessage
                        styles={styles.comingSoonDialog__submittedMessage}
                        id={FORM_STATUS_MESSAGE_ID}
                        statusMessage='Your information has been successfully submitted.'
                    />
            }
            {
                !formStatus.status &&
                    <form
                        className={`comingSoonDialog__form ${styles.comingSoonDialog__form}${!!errorMessages.messageList.length ? ' comingSoonDialog__form--error' : ''}`}
                        id={FORM_ID}
                        noValidate
                        onSubmit={e => validateForm(e, { inputEmail }, setErrorMessages, FORM_ID, subscribe)}
                    >
                        <FormErrorList
                            formId={FORM_ID}
                            errorMessages={errorMessages.messageList}
                            formErrorListStyles={styles.comingSoonDialog__form__formErrorList}
                            formErrorListErrorStyles={styles['comingSoonDialog__form__formErrorList--error']}
                            alertStyles={styles.comingSoonDialog__form__formErrorList__alert}
                            errorListStyles={styles.comingSoonDialog__form__formErrorList__errorList}
                            errorListErrorStyles={styles.comingSoonDialog__form__formErrorList__errorList__error}
                            errorListErrorAnchorStyles={styles.comingSoonDialog__form__formErrorList__errorList__error__anchor}
                        />
                        <fieldset className={styles.comingSoonDialog__form__fieldset}>
                            <FormInputText
                                label='Email address'
                                id='comingSoonEmail'
                                type='email'
                                setInputState={setInputEmail}
                                required={true}
                                errorMessage={errorMessages['comingSoonEmail']}
                                formInputTextStyles={styles.comingSoonDialog__form__fieldset__formInputText}
                                labelStyles={styles.comingSoonDialog__form__fieldset__formInputText__label}
                                inputStyles={styles.comingSoonDialog__form__fieldset__formInputText__input}
                                errorMessageStyles={styles.comingSoonDialog__form__fieldset__formInputText__formErrorMessage}
                            />
                        </fieldset>
                        <input
                            className={`comingSoonDialog__form__submit ${styles.comingSoonDialog__form__submit}`}
                            type='submit'
                            value='Submit'
                        />
                    </form>
            }
            <div className={styles.comingSoonDialog__buttonFlex}>
                <button
                    className={styles.comingSoonDialog__button__dont}
                    onClick={() => setDontShowDialog(localStorageVariable, undoTrapFocus, dialogContainer, setDialogVisible, focusOnClose)}
                >
                    Don’t show this dialog window again.
                </button>
                {/*
                <a
                    href='https://ontariofresh.ca/'
                    className={styles.comingSoonDialog__button__dont}
                >
                    Visit <strong>Ontario</strong><em>fresh</em>.ca
                </a>
                */}
            </div>
        </div>
    )
}

DialogComingSoon.defaultName = 'DialogComingSoon'

DialogComingSoon.defaultProps = {
    focusOnClose: 'headerLogo'
}

DialogComingSoon.propTypes = {
    localStorageVariable: PropTypes.string,
    undoTrapFocus: PropTypes.func.isRequired,
    dialogContainer: PropTypes.string.isRequired,
    setDialogVisible: PropTypes.func.isRequired,
    focusOnClose: PropTypes.string
}

export default DialogComingSoon