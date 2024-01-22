import { characterPresent, validPostalCode } from '../../../utils/form-input-validation-tests'

/**
 * LOCATIONS_BUSINESS_HOURS_FORM_INPUT_VALIDATION_SETTINGS contains the settings specific to each group of inputs in the form that need to be validated. This object works in conjunction with FORM_INPUT_VALIDATION_TESTS, messageList[], formInputValidationTestsRunner() and validateForm().
 * 
 * Make sure that when you add a new error property, you give it a key that matches the ID of the form’s input or input group that you want to validate. The “focus” property is the ID of the page element you want to focus when the error message is selected by the user.
 */
export const generateFormInputValidationSettings = formId => {
    const formInputValidationSettings = {
        "description": [
            {
                "test": paramsObj => characterPresent(paramsObj),
                "message": "You must provide a location name.",
                "focus": `${formId}-description`
            }
        ],
        "address_1": [
            {
                "test": paramsObj => characterPresent(paramsObj),
                "message": "You must provide an Ontario address.",
                "focus": `${formId}-address_1`
            }
        ],
        "city": [
            {
                "test": paramsObj => characterPresent(paramsObj),
                "message": "You must provide a city or town.",
                "focus": `${formId}-city`
            }
        ],
        "postal_code": [
            {
                "test": paramsObj => validPostalCode(paramsObj),
                "message": "You must provide a valid postal code.",
                "focus": `${formId}-postal_code`
            }
        ]
    }
    return formInputValidationSettings
}