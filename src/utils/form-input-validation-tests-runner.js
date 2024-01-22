import FormValidationGlobalMutables from './form-validation-global-mutables'

/**
 * formInputValidationTestsRunner() runs the tests in the FORM_INPUT_VALIDATION_SETTINGS object provided to it, and based on the test results, sends back the test results and the accompanying error messages. This function works in conjunction with FORM_INPUT_VALIDATION_TESTS, FORM_INPUT_VALIDATION_SETTINGS, messageList[] and validateForm().
 * 
 * @param {string} inputId ID value for the form input(s) that is/are being validated.
 * @param {object} validationSettingsObj An object containing the form input validation settings for each set of inputs that needs to be validated.
 * @param {any} inputStateObj React useState() property value for the form input(s) that is/are being validated.
 * @param {function} setErrorMessages React useState() set function for the form’s error messages.
 * @returns {void} Sets the error messages for any input groups that don’t pass its validation test and adds a message to the global messageList[] array.
 */
export const formInputValidationTestsRunner = (inputId, validationSettingsObj, inputStateObj, setErrorMessages) => {
    /*
    For each input group in the form’s FORM_INPUT_VALIDATION_SETTINGS object...
    */
    for (let i = 0; i < validationSettingsObj[inputId].length; i++) {
        /*
        ...set the current set of validation settings to run for the input group.
        */
        const errorType = validationSettingsObj[inputId][i]
        // If the validation test fails...
        if (!errorType.test(inputStateObj)) {
            /*
            ...set the form’s error message useState() property with the input’s error message.
            */
            setErrorMessages(prevState => ({
                ...prevState,
                [inputId]: errorType.message
            }))
            /*
            Include the input’s error message for the form’s error list.
            */
            FormValidationGlobalMutables.messageList.push({
                id: inputId,
                message: errorType.message,
                focus: errorType.focus
            })
            /*
            Break out of the validation tests loop for the current input group being vaidated.
            */
            break
        }
    }
}