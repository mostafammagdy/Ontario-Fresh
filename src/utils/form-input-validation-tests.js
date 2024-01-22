/**
 * Use when you want to validate that there is at least one charater entered in a text field.
 * @param {string} textInputState The text input’s value.
 * @returns {boolean} True if at least one character is present in the value, false if the value is empty.
 */
export function characterPresent({ textInputState }) {
    return (!!textInputState)
}

/**
 * Use when you want to validate that two password fields’ values match one another.
 * @param {string} passwordInputState1 The first password to compare.
 * @param {string} passwordInputState2 The second password to compare.
 * @returns {boolean} True if the two passwords match, false if they don’t.
 */
export function passwordsMatch({ passwordInputState1, passwordInputState2 }) {
    return (passwordInputState1 === passwordInputState2)
}

/**
 * Use when you want to make sure at least one checkbox in a group is selected.
 * @param {object} checkboxesStates An object containing a key for each checkbox input in the group with a boolean value indicating whether the checkbox has been selected or not.
 * @returns {boolean} Returns true if at least one password is selected, and false none are selected.
 */
export function requiredCheckbox({ checkboxesStates, minimumRequired = 1 }) {
    /*
        Create an array of all of the checkbox inputs in a group that have been selected.
    */
    const checkboxSelected = Object.entries(checkboxesStates).filter(([ key, val ]) => val)
    return checkboxSelected.length > (minimumRequired - 1)
}

/**
 * Use when you want to make sure at least one checkbox in a group is selected.
 * @param {object} radioButtonsState An object containing a key for each checkbox input in the group with a boolean value indicating whether the checkbox has been selected or not.
 * @returns {boolean} Returns true if at least one password is selected, and false none are selected.
 */
export function requiredRadioButton({ radioButtonsState }) {
    /*
        Create an array of all of the checkbox inputs in a group that have been selected.
    */
    return !!radioButtonsState
}

/**
 * Use when you want to make sure the content of an email input are a properly formatted email address.
 * @param {string} emailInputState The email address to be tested.
 * @returns {boolean} Retrns true if the email address is properly formatted and false if it isn’t properly formatted.
 */
export function validEmail({ emailInputState }) {
    const emailTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailTest.test(String(emailInputState).toLowerCase())
}

/**
 * Use when you want to make sure the content of a text input is a properly formatted Canadian postal code.
 * @param {string} textInputState The postal code to be tested.
 * @returns {boolean} Retrns true if the postal code is properly formatted and false if it isn’t properly formatted.
 */
export function validPostalCode({ textInputState }) {
    const postalCodeTest = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/
    return postalCodeTest.test(String(textInputState).toUpperCase())
}

/**
 * Usen when you want to make sure a password input’s value is a minimum eight characters and contains at least one letter, one number and one special character.
 * @param {string} passwordInputState The password to be tested.
 * @returns {boolean} Returns true if it matches the pattern and false if it doesn’t.
 */
export function validPassword({ passwordInputState }) {
    /*
    Test on the password string is for a minimum of eight characters, at least one letter, one number and one special character.
    */
    const passwordTest = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    return passwordTest.test(String(passwordInputState))
}

/**
 * Usen when you want to make sure a password input’s value is a minimum eight characters and contains at least one letter, one number and one special character.
 * @param {string} urlInputState The password to be tested.
 * @returns {boolean} Returns true if it matches the pattern and false if it doesn’t.
 */
export function validWebsiteAddress({ urlInputState }) {
    /*
    Test on the url string is a valid URL.
    */
    const urlTest = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
    return urlTest.test(String(urlInputState).toLowerCase())
}

/**
 * Usen when you want to make sure a password input’s value is a minimum eight characters and contains at least one letter, one number and one special character.
 * @param {string} urlInputState The password to be tested.
 * @returns {boolean} Returns true if it matches the pattern and false if it doesn’t.
 */
export function validFacebookAddress({ urlInputState }) {
    /*
    Test on the url string is a valid Facebook URL.
    */
    const urlTest = /((http|https):\/\/|)(www\.|)facebook\.com\/[a-zA-Z0-9.]{1,}/
    return urlTest.test(String(urlInputState).toLowerCase())
}

/**
 * Usen when you want to make sure a password input’s value is a minimum eight characters and contains at least one letter, one number and one special character.
 * @param {string} textInputState The password to be tested.
 * @returns {boolean} Returns true if it matches the pattern and false if it doesn’t.
 */
export function validInstagramUsername({ textInputState }) {
    /*
    Test on the url string is a valid Twitter username.
    */
    const textTest = /^@(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/
    return textTest.test(String(textInputState).toLowerCase())
}

/**
 * Usen when you want to make sure a password input’s value is a minimum eight characters and contains at least one letter, one number and one special character.
 * @param {string} textInputState The password to be tested.
 * @returns {boolean} Returns true if it matches the pattern and false if it doesn’t.
 */
export function validTwitterUsername({ textInputState }) {
    /*
    Test on the url string is a valid Twitter username.
    */
    const textTest = /^@(\w){1,15}$/
    return textTest.test(String(textInputState).toLowerCase())
}

/**
 * Usen when you want to make sure a password input’s value is a minimum eight characters and contains at least one letter, one number and one special character.
 * @param {string} urlInputState The password to be tested.
 * @returns {boolean} Returns true if it matches the pattern and false if it doesn’t.
 */
export function validLinkedInAddress({ urlInputState }) {
    /*
    Test on the url string is a valid LinkedIn URL.
    */
    const urlTest = /((http|https):\/\/|)(www\.|)linkedin\.com\/[a-zA-Z0-9.]{1,}/
    return urlTest.test(String(urlInputState).toLowerCase())
}

/**
 * Usen when you want to make sure a password input’s value is a minimum eight characters and contains at least one letter, one number and one special character.
 * @param {string} urlInputState The password to be tested.
 * @returns {boolean} Returns true if it matches the pattern and false if it doesn’t.
 */
export function validYouTubeAddress({ urlInputState }) {
    /*
    Test on the url string is a valid YouTube URL.
    */
    const urlTest = /((http|https):\/\/|)(www\.|)youtube\.com\/[a-zA-Z0-9.]{1,}/
    return urlTest.test(String(urlInputState).toLowerCase())
}

/**
 * Use when you want to make sure at least one checkbox in a group is selected.
 * @param {object} checkboxesStates An object containing a key for each checkbox input in the group with a boolean value indicating whether the checkbox has been selected or not.
 * @returns {boolean} Returns true if the number of selected checkboxes is less than or equal to the maximum allowed, and false if more than the maximum allowed have been selected.
 */
export function selectedCheckboxMaximum({ checkboxesStates, maximumAllowed }) {
    /*
        Create an array of all of the checkbox inputs in a group that have been selected.
    */
    const checkboxSelected = Object.entries(checkboxesStates).filter(([ key, val ]) => val)
    return checkboxSelected.length <= maximumAllowed
}