import FormValidationGlobalMutables from '../../../utils/form-validation-global-mutables'
import { formInputValidationTestsRunner } from '../../../utils/form-input-validation-tests-runner'
import { GENERAL_BUSINESS_INFORMATION_FORM_INPUT_VALIDATION_SETTINGS } from '../validation-settings/general-business-information'
import { updateProfileUrl } from '../../../containers/editProfileItemsModal/sagas'

const apiUrl = process.env.REACT_APP_API_URL

const updateGeneralBusinessInformation = async (endpoint, clientToken, dataToPost, setFormValidated, formId) => {
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


        setFormValidated('You have successfully updated your general business information.')
        // Shift focus to the message
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1)
    })
}

export const validateGeneralBusinessInformationForm = (event, data, setErrorMessages, setFormValidated, formId, client, ids) => {
    event.preventDefault()
    /*
    Unpack the setState() properties for all of the form’s input fields that need to be validated. Fields that don’t need to be validated don’t need to be unpacked.
    */
    console.log('%c data:', 'color: blue; font-weight: bold;')
    console.log({ data })
    const {
        inputBusinessName,
        inputFirstName,
        inputLastName,
        inputTitle,
        inputOntarioAddress,
        inputCityTown,
        inputPostalCode,
        inputEmail,
        inputBusinessDescription
    } = data
    /*
    Reset the error messages in the errorMessage useState() property.
    */
    setErrorMessages({
        businessName: null,
        firstName: null,
        lastName: null,
        title: null,
        /*
        ontarioAddress: null,
        cityTown: null,
        postalCode: null,
        */
        email: null,
        businessDescription: null,
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
    // Validate the Business Name
    formInputValidationTestsRunner('businessName', GENERAL_BUSINESS_INFORMATION_FORM_INPUT_VALIDATION_SETTINGS, { textInputState: inputBusinessName }, setErrorMessages)
    // Validate the First Name
    formInputValidationTestsRunner('firstName', GENERAL_BUSINESS_INFORMATION_FORM_INPUT_VALIDATION_SETTINGS, { textInputState: inputFirstName }, setErrorMessages)
    // Validate the Last Name
    formInputValidationTestsRunner('lastName', GENERAL_BUSINESS_INFORMATION_FORM_INPUT_VALIDATION_SETTINGS, { textInputState: inputLastName }, setErrorMessages)
    // Validate the Title
    formInputValidationTestsRunner('title', GENERAL_BUSINESS_INFORMATION_FORM_INPUT_VALIDATION_SETTINGS, { textInputState: inputTitle }, setErrorMessages)
    // Validate the Ontario Address
    // formInputValidationTestsRunner('ontarioAddress', GENERAL_BUSINESS_INFORMATION_FORM_INPUT_VALIDATION_SETTINGS, { textInputState: inputOntarioAddress }, setErrorMessages)
    // Validate the City/Town
    // formInputValidationTestsRunner('cityTown', GENERAL_BUSINESS_INFORMATION_FORM_INPUT_VALIDATION_SETTINGS, { textInputState: inputCityTown }, setErrorMessages)
    // Validate the Postal Code
    // formInputValidationTestsRunner('postalCode', GENERAL_BUSINESS_INFORMATION_FORM_INPUT_VALIDATION_SETTINGS, { textInputState: inputPostalCode }, setErrorMessages)
    // Validate the email address
    formInputValidationTestsRunner('email', GENERAL_BUSINESS_INFORMATION_FORM_INPUT_VALIDATION_SETTINGS, { emailInputState: inputEmail }, setErrorMessages)
    // Validate the Business Description
    // formInputValidationTestsRunner('businessDescription', GENERAL_BUSINESS_INFORMATION_FORM_INPUT_VALIDATION_SETTINGS, { textInputState: inputBusinessDescription }, setErrorMessages)
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
                business_name: inputBusinessName,
                first_name: inputFirstName,
                last_name: inputLastName,
                title: inputTitle,
                address_1: inputOntarioAddress,
                city: inputCityTown,
                postal_code: inputPostalCode,
                greenbelt_location: data.checkboxGreenbeltRegion.greenbeltRegion,
                email: inputEmail,
                fax: data.inputFax ? data.inputFax : null,
                phone: data.inputPhone ? data.inputPhone : null,
                description: inputBusinessDescription,
                hide_personal_info: data.checkboxHidePersonalInfo.hidePersonalInfo
            }
        }
        /*
        console.log('%c General Business Information postData:', 'color: pink; font-weight: bold;')
        console.log({ postData })
        */

        updateGeneralBusinessInformation(updateProfileUrl, client.token, postData, setFormValidated, formId)

        /*
            If you're a vendor, submit the seasonal information

            https://github.com/ontario-fresh/ontariofresh_backend/blob/staging/highlight_test.md#update-highlight-1
        */

        if (data.selectedVendorSeasons && ids.vendor_highlight_id) {
            const postVendorData = {
                id: ids.vendor_highlight_id,
                details: {
                    specific_directions: data.inputVendorSpecificDirections,
                    is_open_spring: data.selectedVendorSeasons.is_open_spring,
                    is_open_summer: data.selectedVendorSeasons.is_open_summer,
                    is_open_fall: data.selectedVendorSeasons.is_open_fall,
                    is_open_winter: data.selectedVendorSeasons.is_open_winter,
                    open_year_round: data.selectedVendorSeasons.is_open_year_round,
                    business_hour_details: data.inputVendorFurtherDetails
                }
            }
            updateGeneralBusinessInformation(`${apiUrl}/accounts/update_highlight/`, client.token, postVendorData, setFormValidated, formId)
        }










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
        setFormValidated('You have successfully updated your general business information.')
        // Shift focus to the message
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1)
        */
    }
}