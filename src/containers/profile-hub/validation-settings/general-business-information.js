import { characterPresent, validPostalCode, validEmail } from '../../../utils/form-input-validation-tests'

/**
 * GENERAL_BUSINESS_INFORMATION_FORM_INPUT_VALIDATION_SETTINGS contains the settings specific to each group of inputs in the form that need to be validated. This object works in conjunction with FORM_INPUT_VALIDATION_TESTS, messageList[], formInputValidationTestsRunner() and validateForm().
 * 
 * Make sure that when you add a new error property, you give it a key that matches the ID of the form’s input or input group that you want to validate. The “focus” property is the ID of the page element you want to focus when the error message is selected by the user.
 */
export const GENERAL_BUSINESS_INFORMATION_FORM_INPUT_VALIDATION_SETTINGS = {
    "businessName": [
        {
            "test": paramsObj => characterPresent(paramsObj),
            "message": "You must provide a business name.",
            "focus": "businessName"
        }
    ],
    "firstName": [
        {
            "test": paramsObj => characterPresent(paramsObj),
            "message": "You must provide your first name.",
            "focus": "firstName"
        }
    ],
    "lastName": [
        {
            "test": paramsObj => characterPresent(paramsObj),
            "message": "You must provide your last name.",
            "focus": "lastName"
        }
    ],
    "title": [
        {
            "test": paramsObj => characterPresent(paramsObj),
            "message": "You must provide your job title.",
            "focus": "title"
        }
    ],
    /*
    "ontarioAddress": [
        {
            "test": paramsObj => characterPresent(paramsObj),
            "message": "You must provide an Ontario address.",
            "focus": "ontarioAddress"
        }
    ],
    "cityTown": [
        {
            "test": paramsObj => characterPresent(paramsObj),
            "message": "You must provide an Ontario city or town.",
            "focus": "cityTown"
        }
    ],
    "postalCode": [
        {
            "test": paramsObj => validPostalCode(paramsObj),
            "message": "You must provide a valid postal code.",
            "focus": "postalCode"
        }
    ],
    */
    "email": [
        {
            "test": paramsObj => validEmail(paramsObj),
            "message": "You must provide a valid email address.",
            "focus": "email"
        }
    ],
    "businessDescription": [
        {
            "test": paramsObj => characterPresent(paramsObj),
            "message": "You must provide a description of your business.",
            "focus": "businessDescription"
        }
    ]
}