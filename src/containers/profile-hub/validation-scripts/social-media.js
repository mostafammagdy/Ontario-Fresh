import FormValidationGlobalMutables from '../../../utils/form-validation-global-mutables'
import { characterPresent } from '../../../utils/form-input-validation-tests'
import { formInputValidationTestsRunner } from '../../../utils/form-input-validation-tests-runner'
import { SOCIAL_MEDIA_FORM_INPUT_VALIDATION_SETTINGS } from '../validation-settings/social-media'
import { updateProfileUrl } from '../../../containers/editProfileItemsModal/sagas'

const updateWebsiteSocialMediaInformation = async (endpoint, clientToken, dataToPost, setFormValidated, formId) => {
    console.log('%c clientToken, dataToPost:', 'color: turquoise; font-weight: bold, font-style: italic; text-decoration: underline;')
    console.log({ clientToken, body: dataToPost })
    return await fetch(endpoint , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": clientToken ? "Bearer " + clientToken : undefined
        },
        body: JSON.stringify(dataToPost)
    }).then(response => {
        console.log('%c response:', 'color: turquoise; font-weight: bold, font-style: italic; text-decoration: underline;')
        console.log({ response })

        setFormValidated('You have successfully updated your social media information.')
        // Shift focus to the message
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1)
    })
}

export const validateSocialMediaForm = (event, data, setErrorMessages, setFormValidated, formId, client, ids) => {
    event.preventDefault()
    /*
    Unpack the setState() properties for all of the form’s input fields that need to be validated. Fields that don’t need to be validated don’t need to be unpacked.
    */
    const {
        inputWebsite,
        inputOnlineStore,
        inputFacebook,
        inputInstagram,
        inputTwitter,
        inputLinkedIn,
        inputYouTube
    } = data
    /*
    Reset the error messages in the errorMessage useState() property.
    */
    setErrorMessages({
        website: null,
        onlineStore: null,
        facebook: null,
        instagram: null,
        twitter: null,
        linkedIn: null,
        youTube: null,
        messageList: []
    })
    /*
    Reset the error messages in the global messageList array.
    */
    FormValidationGlobalMutables.messageList = []
    /*
    console.log('%c FormValidationGlobalMutables.messageList:', 'color: blue; font-weight: bold;')
    console.log(FormValidationGlobalMutables.messageList)
    */
    // Reset the form submitted success message
    setFormValidated('')
    /*
    Validate the Website (if the user entered a character in the Website input)
    */
    if (characterPresent({ textInputState: inputWebsite }))
        formInputValidationTestsRunner('website', SOCIAL_MEDIA_FORM_INPUT_VALIDATION_SETTINGS, { urlInputState: inputWebsite }, setErrorMessages)
    /*
    Validate the Online store (if the user entered a character in the Online store input)
    */
    if (characterPresent({ textInputState: inputOnlineStore }))
        formInputValidationTestsRunner('onlineStore', SOCIAL_MEDIA_FORM_INPUT_VALIDATION_SETTINGS, { urlInputState: inputOnlineStore }, setErrorMessages)
    /*
    Validate the Facebook address (if the user entered a character in the Facebook input)
    */
    if (characterPresent({ textInputState: inputFacebook }))
        formInputValidationTestsRunner('facebook', SOCIAL_MEDIA_FORM_INPUT_VALIDATION_SETTINGS, { urlInputState: inputFacebook }, setErrorMessages)
    /*
    Validate the Instagram username (if the user entered a character in the Instagram input)
    */
    if (characterPresent({ textInputState: inputInstagram }))
        formInputValidationTestsRunner('instagram', SOCIAL_MEDIA_FORM_INPUT_VALIDATION_SETTINGS, { textInputState: inputInstagram }, setErrorMessages)
    /*
    Validate the Twitter username (if the user entered a character in the Twitter input)
    */
    if (characterPresent({ textInputState: inputTwitter }))
        formInputValidationTestsRunner('twitter', SOCIAL_MEDIA_FORM_INPUT_VALIDATION_SETTINGS, { textInputState: inputTwitter }, setErrorMessages)
    /*
    Validate the LinkedIn address (if the user entered a character in the LinkedIn input)
    */
    if (characterPresent({ textInputState: inputLinkedIn }))
        formInputValidationTestsRunner('linkedIn', SOCIAL_MEDIA_FORM_INPUT_VALIDATION_SETTINGS, { urlInputState: inputLinkedIn }, setErrorMessages)
    /*
    Validate the YouTube address (if the user entered a character in the YouTube input)
    */
    if (characterPresent({ textInputState: inputYouTube }))
        formInputValidationTestsRunner('youTube', SOCIAL_MEDIA_FORM_INPUT_VALIDATION_SETTINGS, { urlInputState: inputYouTube }, setErrorMessages)
    /*
    console.log('%c FormValidationGlobalMutables.messageList:', 'color: red; font-weight: bold;')
    console.log(FormValidationGlobalMutables.messageList)
    */
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


        const postData = {
            id: client.account_id,
            details: {
                website: inputWebsite,
                online_store: inputOnlineStore,
                facebook: inputFacebook,
                instagram: inputInstagram,
                twitter: inputTwitter,
                linkedin: inputLinkedIn,
                youtube: inputYouTube
            }
        }
        console.log('%c Social Media postData:', 'color: red; font-weight: bold;')
        console.log(postData)


        updateWebsiteSocialMediaInformation(updateProfileUrl, client.token, postData, setFormValidated, formId)


        /*
        console.log('%c FORM VALIDATED!', 'color: green; font-weight: bold;')
        */
        /*
        setFormValidated('formSubmitting')
        setTimeout(() => {
            formSubmitting.current.focus()
        }, 1)
        */
        /*
        ...hide the form and show the “next steps” message.
        */
        /*
        setFormValidated('You have successfully updated your social media information.')
        // Shift focus to the message
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1)
        */
    }
}