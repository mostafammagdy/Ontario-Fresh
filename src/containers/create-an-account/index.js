import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'

import './styles.scss'
import styles from './styles.module.scss'

import { PROFILES } from '../../utils/constants-unmutables'
import { passwordsMatch, requiredCheckbox, characterPresent, validEmail, validPassword } from '../../utils/form-input-validation-tests'
import FormValidationGlobalMutables from '../../utils/form-validation-global-mutables'
import { formInputValidationTestsRunner } from '../../utils/form-input-validation-tests-runner'
import { signupRequest } from './actions'

import FormErrorList from '../../components/FormErrorList'
import FormCheckboxesGroup from '../../components/FormCheckboxesGroup'
import FormInputText from '../../components/FormInputText'
import FormErrorMessageSingle from '../../components/FormErrorMessageSingle'
import FormConfirmationMessage from '../../components/FormConfirmationMessage'

const PROFILE_TYPE_CODES = {
    buyer: 1,
    seller: 2,
    service_provider: 3,
    vendor: 6,
    processor: 5
}
// ALERT: The “organization” profile type code is 4

/**
 * FORM_INPUT_VALIDATION_SETTINGS contains the settings specific to each group of inputs in the form that need to be validated. This object works in conjunction with FORM_INPUT_VALIDATION_TESTS, messageList[], formInputValidationTestsRunner() and validateForm().
 * 
 * Make sure that when you add a new error property, you give it a key that matches the ID of the form’s input or input group that you want to validate. The “focus” property is the ID of the page element you want to focus when the error message is selected by the user.
 */
const FORM_INPUT_VALIDATION_SETTINGS = {
    "profileCheckboxes": [
        {
            "test": paramsObj => requiredCheckbox(paramsObj),
            "message": "You must choose at least one profile.",
            "focus": "profileCheckboxes-legend"
        }
    ],
    "firstName": [
        {
            "test": paramsObj => characterPresent(paramsObj),
            "message": "You must provide a first name.",
            "focus": "firstName"
        }
    ],
    "lastName": [
        {
            "test": paramsObj => characterPresent(paramsObj),
            "message": "You must provide a last name.",
            "focus": "lastName"
        }
    ],
    "jobTitle": [
        {
            "test": paramsObj => characterPresent(paramsObj),
            "message": "You must provide a job title.",
            "focus": "jobTitle"
        }
    ],
    "businessName": [
        {
            "test": paramsObj => characterPresent(paramsObj),
            "message": "You must provide a business name.",
            "focus": "businessName"
        }
    ],
    "email": [
        {
            "test": paramsObj => validEmail(paramsObj),
            "message": "You must provide a valid email address.",
            "focus": "email"
        }
    ],
    "password": [
        {
            "test": paramsObj => validPassword(paramsObj),
            "message": "You must provide a password that is a minimum of eight characters in length and contains at least one letter, one number and one special character.",
            "focus": "password"
        }
    ],
    "reenterPassword": [
        {
            "test": paramsObj => passwordsMatch(paramsObj),
            "message": "Both password fields must match.",
            "focus": "reenterPassword"
        }
    ],
    "termsConditionsCheckbox": [
        {
            "test": paramsObj => requiredCheckbox(paramsObj),
            "message": "You must agree to the terms and conditions.",
            "focus": "terms_conditions"
        }
    ]
}

const FORM_ID = 'createAnAccountForm'

/**
 * TERMS_AND_CONDITIONS contains the unique properties for the terms and conditions checkboxes group. Add or remove objects if you need to add or remove options from the group.
 */
const TERMS_AND_CONDITIONS = [
    {
        "label": "Terms and Conditions",
        "value": "terms_conditions",
        "description": "I have read and accept the <a href='/terms-use' target='_blank' rel='noreferrer'>Terms of Use</a> and <a href='/privacy-policy' target='_blank' rel='noreferrer'>Privacy Policy</a>."
    }
]

let postSubmittingErrorFocused = false

const validateForm = (event, data, setErrorMessages, formId, signupRequest) => {
    event.preventDefault()
    /*
    Unpack the setState() properties for all of the form’s input fields that need to be validated. Fields that don’t need to be validated don’t need to be unpacked.
    */
    const {
        selectedProfiles,
        inputFirstName,
        inputLastName,
        inputJobTitle,
        inputBusinessName,
        inputEmail,
        inputPassword,
        inputReenterPassword,
        selectedTermsConditions
    } = data
    /*
    console.log('%c validateForm data:', 'color: red; font-weight: bold;')
    console.log({ data })
    */
    /*
    Reset the error messages in the errorMessage useState() property.
    */
    setErrorMessages({
        profileCheckboxes: null,
        firstName: null,
        lastName: null,
        jobTitle: null,
        businessName: null,
        email: null,
        password: null,
        reenterPassword: null,
        termsConditionsCheckbox: null,
        messageList: []
    })
    /*
    Reset the error messages in the global messageList array.
    */
    FormValidationGlobalMutables.messageList = []
    // Validate the Profile checkboxes
    formInputValidationTestsRunner('profileCheckboxes', FORM_INPUT_VALIDATION_SETTINGS, { checkboxesStates: selectedProfiles, minimumRequired: 1 }, setErrorMessages)
    formInputValidationTestsRunner('firstName', FORM_INPUT_VALIDATION_SETTINGS, { textInputState: inputFirstName }, setErrorMessages)
    formInputValidationTestsRunner('lastName', FORM_INPUT_VALIDATION_SETTINGS, { textInputState: inputLastName }, setErrorMessages)
    formInputValidationTestsRunner('jobTitle', FORM_INPUT_VALIDATION_SETTINGS, { textInputState: inputJobTitle }, setErrorMessages)
    formInputValidationTestsRunner('businessName', FORM_INPUT_VALIDATION_SETTINGS, { textInputState: inputBusinessName }, setErrorMessages)
    // Validate the email address
    formInputValidationTestsRunner('email', FORM_INPUT_VALIDATION_SETTINGS, { emailInputState: inputEmail }, setErrorMessages)
    // Validate the password
    formInputValidationTestsRunner('password', FORM_INPUT_VALIDATION_SETTINGS, { passwordInputState: inputPassword }, setErrorMessages)
    // Validate the “double-check” password
    formInputValidationTestsRunner('reenterPassword', FORM_INPUT_VALIDATION_SETTINGS, { passwordInputState1: inputPassword, passwordInputState2: inputReenterPassword }, setErrorMessages)
    // Validate the Terms and Conditions checkbox
    formInputValidationTestsRunner('termsConditionsCheckbox', FORM_INPUT_VALIDATION_SETTINGS, { checkboxesStates: selectedTermsConditions, minimumRequired: 1 }, setErrorMessages)
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
    } else {
        const roles = []
        Object.entries(selectedProfiles).forEach(([ key, value ]) => {
            if (selectedProfiles[key])
                roles.push(PROFILE_TYPE_CODES[key])
        })
        /*
        const values = {
            type: 'SIGNUP_REQUESTING',
            email: inputEmail,
            password: inputPassword,
            first_name: 'Mike',
            last_name: 'Nice',
            title: 'Farmer',
            business_name: 'Farmer Nice',
            roles
        }
        */
        const values = {
            email: inputEmail,
            password: inputPassword,
            first_name: inputFirstName,
            last_name: inputLastName,
            title: inputJobTitle,
            business_name: inputBusinessName,
            roles
        }
        /*
        console.log('%c create-an-account values:', 'color: blue; font-weight: bold;')
        console.log({ values })
        */
        signupRequest(Object.assign(values))
        postSubmittingErrorFocused = false
    }
}

const CreateAnAccount = props => {
    const { createAnAccount, signupRequest } = props
    /*
    console.log('%c CreateAnAccount createAnAccount:', 'color: blue; font-weight: bold;')
    console.log({ createAnAccount })
    */
    // createAnAccount.successful = true
    /*
    console.log('%c CreateAnAccount signupRequest:', 'color: blue; font-weight: bold;')
    console.log({ signupRequest })
    */
    // useState() hook for the Profiles checkbox inputs.
    const [ selectedProfiles, setSelectedProfiles ] = useState({
        buyer: false,
        seller: false,
        vendor: false,
        processor: false,
        service_provider: false
    })
    /*
    console.log('%c selectedProfiles:', 'color: red; font-weight: bold;')
    console.log(selectedProfiles)
    */
    const [ inputFirstName, setInputFirstName ] = useState('')
    const [ inputLastName, setInputLastName ] = useState('')
    const [ inputJobTitle, setInputJobTitle ] = useState('')
    const [ inputBusinessName, setInputBusinessName ] = useState('')
    // useState() hook for the Email email input.
    const [ inputEmail, setInputEmail ] = useState('')
    // useState() hook for the Password password input.
    const [ inputPassword, setInputPassword ] = useState('')
    /*
    useState() hook for the Re-enter Password password input.
    */
    const [ inputReenterPassword, setInputReenterPassword ] = useState('')
    /*
    console.log('%c Text Inputs:', 'color: red; font-weight: bold;')
    console.log({ inputEmail, inputPassword, inputReenterPassword })
    */
   /*
   useState() hook for the Terms and Conditions checkbox inputs.
   */
    const [ selectedTermsConditions, setSelectedTermsConditions ] = useState({
        terms_conditions: false
    })
    /*
    console.log('%c selectedTermsConditions:', 'color: red; font-weight: bold;')
    console.log(selectedTermsConditions)
    */
    // useState() hook for the form’s error messages.
   const [ errorMessages, setErrorMessages ] = useState({
       profileCheckboxes: null,
       firstName: null,
       lastName: null,
       jobTitle: null,
       businessName: null,
       email: null,
       password: null,
       reenterPassword: null,
       termsConditionsCheckbox: null,
       messageList: []
   })
   const [ currentTooltip, setCurrentTooltip ] = useState('')

   if (createAnAccount.errors.length > 0 && !postSubmittingErrorFocused) {
       setTimeout(() => {
           document.getElementById(`${FORM_ID}-formPostSubmittingError-message`).focus()
           postSubmittingErrorFocused = true
       }, 1);
   }

    if (!createAnAccount.requesting && createAnAccount.successful) {
        setTimeout(() => {
            if (!!document.getElementById(`${FORM_ID}-formSubmitted-message`))
                document.getElementById(`${FORM_ID}-formSubmitted-message`).focus()
        }, 1);
    }

   if (createAnAccount.requesting) {
       postSubmittingErrorFocused = false
       setTimeout(() => {
           document.getElementById(`${FORM_ID}-formSubmitting-message`).focus()
       }, 1);
   }

    return (
        <div className={styles.formContainer}>
            <div className={`${styles.formContainer__block}`}>
                <h1 className={`${styles.formContainer__heading}`}>Register Your Business</h1>
                <hr className={`${styles.formContainer__rule}`} />
                <p className={styles.formContainer__paragraph}><strong>Ontario</strong><em>fresh</em>.ca is a network for buyers, sellers, vendors, and processors of Ontario food and beverage. Service providers, who cater to the local food sector, may also join.</p>
                <p className={styles.formContainer__paragraph}>Ontario food is any food product with at least 80% Ontario-sourced ingredients by volume. <a href='https://www.ontario.ca/foodland/foodland-ontario' target='_blank' rel='noreferrer'>Visit Foodland Ontario for more information.</a></p>
                {
                    !createAnAccount.requesting && !createAnAccount.successful &&
                        <form
                            className={styles.formContainer__form}
                            id={FORM_ID}
                            noValidate
                            onSubmit={e => validateForm(e, {
                                selectedProfiles,
                                inputFirstName,
                                inputLastName,
                                inputJobTitle,
                                inputBusinessName,
                                inputEmail,
                                inputPassword,
                                inputReenterPassword,
                                selectedTermsConditions
                            }, setErrorMessages, FORM_ID, signupRequest)}
                        >
                            {
                                createAnAccount.errors.length > 0 && errorMessages.messageList.length < 1 &&
                                    <p
                                        className={styles.formContainer__submittedMessage}
                                    >
                                        {
                                            createAnAccount.errors[createAnAccount.errors.length - 1].body === 'Error: email already exists' ?
                                                    <FormErrorMessageSingle
                                                        anchor='email'
                                                        id={FORM_ID}
                                                        message='The email address you submitted already exists. Please try another.'
                                                    />
                                                :
                                                <FormErrorMessageSingle
                                                    anchor='buyer'
                                                    id={FORM_ID}
                                                    message='Something unexpected happened. Please try again.'
                                                />
                                        }
                                    </p>
                            }
                            <FormErrorList
                                formId={FORM_ID}
                                errorMessages={errorMessages.messageList}
                            />
                            <FormCheckboxesGroup
                                label='Select the roles that best describe your business:'
                                currentTooltip={currentTooltip}
                                setCurrentTooltip={setCurrentTooltip}
                                tooltipOffsetElementId='createAnAccountForm'
                                id='profileCheckboxes'
                                flex={false}
                                center={true}
                                checkboxes={PROFILES}
                                selectedCheckboxes={selectedProfiles}
                                setCheckboxStates={setSelectedProfiles}
                                errorMessage={errorMessages['profileCheckboxes']}
                            />
                            <p>Are you a member based organization or a farmers’ market looking to expand your visibility?<br />
                                Contact us @ <a href='mailto:support@ontariofresh.ca'>support@ontariofresh.ca</a> to learn more!</p>
                            <fieldset className={styles.formContainer__fieldset}>
                                <div className={`formContainer__flex ${styles.formContainer__flex}`}>
                                    <FormInputText
                                        label='First Name'
                                        id='firstName'
                                        type='text'
                                        setInputState={setInputFirstName}
                                        value={inputFirstName}
                                        required={true}
                                        errorMessage={errorMessages['firstName']}
                                    />
                                    <FormInputText
                                        label='Last Name'
                                        id='lastName'
                                        type='text'
                                        setInputState={setInputLastName}
                                        value={inputLastName}
                                        required={true}
                                        errorMessage={errorMessages['lastName']}
                                    />
                                </div>
                                <div className={`formContainer__flex ${styles.formContainer__flex}`}>
                                    <FormInputText
                                        label='Job Title'
                                        id='jobTitle'
                                        type='text'
                                        setInputState={setInputJobTitle}
                                        value={inputJobTitle}
                                        required={true}
                                        errorMessage={errorMessages['jobTitle']}
                                    />
                                    <FormInputText
                                        label='Business Name'
                                        id='businessName'
                                        type='text'
                                        setInputState={setInputBusinessName}
                                        value={inputBusinessName}
                                        required={true}
                                        errorMessage={errorMessages['businessName']}
                                    />
                                </div>
                                <FormInputText
                                    label='Email address'
                                    id='email'
                                    type='email'
                                    setInputState={setInputEmail}
                                    value={inputEmail}
                                    required={true}
                                    errorMessage={errorMessages['email']}
                                />
                                <div className={`formContainer__flex ${styles.formContainer__flex}`}>
                                    <FormInputText
                                        label='Password'
                                        description='Passwords must be a minimum of eight characters in length and contains at least one letter, one number and one special character.'
                                        id='password'
                                        type='password'
                                        setInputState={setInputPassword}
                                        value={inputPassword}
                                        required={true}
                                        errorMessage={errorMessages['password']}
                                    />
                                    <FormInputText
                                        label='Re-enter password'
                                        description='Passwords must be a minimum of eight characters in length and contains at least one letter, one number and one special character.'
                                        id='reenterPassword'
                                        type='password'
                                        setInputState={setInputReenterPassword}
                                        value={inputReenterPassword}
                                        required={true}
                                        errorMessage={errorMessages['reenterPassword']}
                                    />
                                </div>
                            </fieldset>
                            <FormCheckboxesGroup
                                id='termsConditionsCheckbox'
                                flex={false}
                                checkboxes={TERMS_AND_CONDITIONS}
                                selectedCheckboxes={selectedTermsConditions}
                                setCheckboxStates={setSelectedTermsConditions}
                                errorMessage={errorMessages['termsConditionsCheckbox']}
                            />
                            <input
                                className={`formContainer__button ${styles.formContainer__button}`}
                                type='submit'
                                value='Create Account'
                            />
                        </form>
                }
                {
                    !createAnAccount.requesting && createAnAccount.successful &&
                        <FormConfirmationMessage
                            id={`${FORM_ID}-formSubmitted`}
                            message='Your information has been successfully submitted.'
                            link={{
                                to: '/login',
                                text: 'You may now attempt to log in.'
                            }}
                        />
                }
                {
                    createAnAccount.requesting &&
                        <FormConfirmationMessage
                            id={`${FORM_ID}-formSubmitting`}
                            message='Signing up…'
                        />
                }
            </div>
        </div>
    )
}

CreateAnAccount.defaultName = 'CreateAnAccount'

CreateAnAccount.propTypes = {
    signupRequest: PropTypes.func,
    createAnAccount: PropTypes.shape({
        requesting: PropTypes.bool,
        successful: PropTypes.bool,
        messages: PropTypes.array,
        errors: PropTypes.array,
    })
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
    createAnAccount: state.createAnAccount,
})

/*
Connect our component to redux and attach the `signup` piece 
of state to our `props` in the component.  Also attach the 
`signupRequest` action to our `props` as well.
const connected = connect(mapStateToProps, { signupRequest })(CreateAnAccount)
*/

/*
Connect our connected component to Redux Form.  It will 
namespace the form we use in this component as `signup`.

const formed = reduxForm({
  form: 'signup',
  initialValues: {
    roles: [],
  }
})(connected)

export default formed
*/

const connected = connect(mapStateToProps, { signupRequest })

export default connected(CreateAnAccount)