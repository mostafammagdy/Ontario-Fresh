import FormValidationGlobalMutables from '../../../utils/form-validation-global-mutables'
import { formInputValidationTestsRunner } from '../../../utils/form-input-validation-tests-runner'
import { generateFormInputValidationSettings } from '../validation-settings/locations-business-hours'
import { LOCATIONS_BUSINESS_HOURS_DEFAULT, LOCATIONS_BUSINESS_HOURS_ERROR_MESSAGES_DEFAULT } from '../../../utils/constants-unmutables'

const env = process.env.REACT_APP_API_URL

const addLocationDetails = async (endpoint, clientToken, dataToPost, updatedLocations, formInt, setLocations, setFormValidatedMessage, formId) => {
    return await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": clientToken ? "Bearer " + clientToken : undefined
        },
        body: JSON.stringify(dataToPost)
    }).then(response => {
        /*
        console.log('%c response:', 'color: turquoise; font-weight: bold, font-style: italic; text-decoration: underline;')
        console.log({ response })
        */
        return response.json()
    }).then(data => {
        /*
        console.log('%c data:', 'color: turquoise; font-weight: bold;')
        console.log({ data })
        */
        updatedLocations[formInt] = {
            id: data.id,
            description: data.description,
            address_1: data.address_1,
            address_2: data.address_2,
            city: data.city,
            province: data.province,
            country: data.country,
            postal_code: data.postal_code,
            phone: data.phone
        }
        setLocations([ ...updatedLocations ])


        setFormValidatedMessage('You have successfully updated this location.')
        // Shift focus to the message
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1)
    })
}

export const validateLocationsBusinessHoursForm = (event, data, setErrorMessages, setFormValidatedMessage, setFormRemovedMessage, formId, formInt, locations, setLocations, client, ids) => {
    event.preventDefault()
    /*
    Unpack the setState() properties for all of the form’s input fields that need to be validated. Fields that don’t need to be validated don’t need to be unpacked.
    */
    const {
        // checkboxPrimaryLocation,
        id,
        inputDescription,
        inputAddress1,
        inputAddress2,
        inputCity,
        province,
        inputPostalCode,
        country,
        inputPhone
    } = data
    /*
    Reset the error messages in the errorMessage useState() property.
    */
    setErrorMessages({ ...LOCATIONS_BUSINESS_HOURS_ERROR_MESSAGES_DEFAULT })
    /*
    Reset the error messages in the global messageList array.
    */
    FormValidationGlobalMutables.messageList = []
    /*
    console.log('%c FormValidationGlobalMutables.messageList:', 'color: blue; font-weight: bold;')
    console.log(FormValidationGlobalMutables.messageList)
    */
    // Reset the form submitted success message
    setFormValidatedMessage('')
    setFormRemovedMessage('')
    // Generate the unique form input validation settings
    const formInputValidationSettings = generateFormInputValidationSettings(formId)
    // Validate the Business Name
    formInputValidationTestsRunner('description', formInputValidationSettings, { textInputState: inputDescription }, setErrorMessages)
    // Validate the First Name
    formInputValidationTestsRunner('address_1', formInputValidationSettings, { textInputState: inputAddress1 }, setErrorMessages)
    // Validate the Ontario Address
    formInputValidationTestsRunner('city', formInputValidationSettings, { textInputState: inputCity }, setErrorMessages)
    // Validate the City/Town
    formInputValidationTestsRunner('postal_code', formInputValidationSettings, { textInputState: inputPostalCode }, setErrorMessages)
    
    /*
    console.log('%c selectedSeasons RIGHT BEFORE VALIDATION!:', 'color: lime; font-weight: bold;')
    console.log({ selectedSeasons })
    */
    // Validate the Postal Code
    // formInputValidationTestsRunner('seasonsCheckboxes', formInputValidationSettings, { checkboxesStates: selectedSeasons, minimumRequired: 1 }, setErrorMessages)
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

        const updatedLocations = [ ...locations ];

        /*
            Steps:

            IF this form’s primaryLocation checkbox is checked, and 
            if it’s instance in updatedLocations isn’t checked, cycle 
            through all of the other primaryLocation checkboxes in 
            updatedLocations and uncheck them.

            Otherwise, there should be no need to perform this search, 
            because this form's primaryLocation checkbox wasn’t 
            checked.
        */
        /*
        console.log('%c updatedLocations:', 'color: red; font-weight: bold;')
        console.log(updatedLocations)
        */
        /*
        if (checkboxPrimaryLocation['primaryLocation'] && !updatedLocations[formInt].primaryLocation) {
            for (const location in updatedLocations) {
                updatedLocations[location].primaryLocation = false
            }
        }
        */








        if (!id) {
            const createAddressPostData = {
                profile_id: ids.profile_current_id,
                description: inputDescription,
                address_1: inputAddress1,
                address_2: inputAddress2,
                city: inputCity,
                province,
                postal_code: inputPostalCode,
                country,
                phone: inputPhone
            }
            addLocationDetails(`${env}/accounts/create_address/`, client.token, createAddressPostData, updatedLocations, formInt, setLocations, setFormValidatedMessage, formId)
        } else {
            const updateAddressPostData = {
                id,
                description: inputDescription,
                address_1: inputAddress1,
                address_2: inputAddress2,
                city: inputCity,
                province,
                postal_code: inputPostalCode,
                country,
                phone: inputPhone
            }
            addLocationDetails(`${env}/accounts/update_address/`, client.token, updateAddressPostData, updatedLocations, formInt, setLocations, setFormValidatedMessage, formId)
        }











        /*
            ALERT: The following two lines...you're not going to process these until after you get 
            success response back from the server. Reason is: you'll need to get the new address'
            ID value back from the server and inject it in with the location so it can be updated if the 
            user updates the location in the same session.
        
        updatedLocations[formInt] = { ...updateLocationObj }
        setLocations([ ...updatedLocations ])
        */


        /*
        const postData = { locationsBusinessHours: updatedLocations }
        console.log('%c Locations Business Hours postData:', 'color: red; font-weight: bold;')
        console.log(postData)
        */

        /*
        console.log('%c FORM VALIDATED!', 'color: green; font-weight: bold;')
        */
        /*
        setFormValidatedMessage('formSubmitting')
        setTimeout(() => {
            formSubmitting.current.focus()
        }, 1)
        */
        /*
        ...hide the form and show the “next steps” message.
        */
        /*
        setFormValidatedMessage('You have successfully updated this location.')
        // Shift focus to the message
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1)
        */
    }
}