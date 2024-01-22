import FormValidationGlobalMutables from '../../../utils/form-validation-global-mutables'
import { formInputValidationTestsRunner } from '../../../utils/form-input-validation-tests-runner'
import { PUBLIC_VENDOR_PROFILE_HIGHLIGHTS_FORM_INPUT_VALIDATION_SETTINGS } from '../validation-settings/public-vendor-profile-highlights'
// import { updateProfileUrl } from '../../../containers/editProfileItemsModal/sagas'

const env = process.env.REACT_APP_API_URL

const updateVendorProfileHighlights = async (endpoints, clientToken, datasToPost, setFormValidated, formId) => {
    /*
    console.log('%c clientToken, datasToPost[0]:', 'color: turquoise; font-weight: bold, font-style: italic; text-decoration: underline;')
    console.log({ clientToken, body: datasToPost[0] })
    */
    return await fetch(endpoints[0] , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": clientToken ? "Bearer " + clientToken : undefined
        },
        body: JSON.stringify(datasToPost[0])
    }).then(response => {
        /*
        console.log('%c First response:', 'color: turquoise; font-weight: bold, font-style: italic; text-decoration: underline;')
        console.log({ response })
        */
        if (response.status !== 500) {
            console.log('%c First POST was successful!:', 'color: blue; font-weight: bold;')
        }
    }).then(() => {
        /*
        console.log('%c clientToken, datasToPost[1]:', 'color: turquoise; font-weight: bold, font-style: italic; text-decoration: underline;')
        console.log({ clientToken, body: datasToPost[1] })
        */
        return fetch(endpoints[1] , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": clientToken ? "Bearer " + clientToken : undefined
            },
            body: JSON.stringify(datasToPost[1])
        })
    }).then(response => {
        /*
        console.log('%c Second response:', 'color: turquoise; font-weight: bold, font-style: italic; text-decoration: underline;')
        console.log({ response })
        */
        if (response.status !== 500) {
            console.log('%c Second POST was successful!:', 'color: blue; font-weight: bold;')

            setFormValidated('You have successfully updated your public B2C vendor profile highlights information.')
            // Shift focus to the message
            setTimeout(() => {
                document.getElementById(`${formId}-validatedMessage`).focus()
            }, 1)
        }
    })
}

export const validatePublicVendorProfileHighlightsForm = (event, data, setErrorMessages, setFormValidated, formId, client, ids) => {
    event.preventDefault()
    /*
    Unpack the setState() properties for all of the form’s input fields that need to be validated. Fields that don’t need to be validated don’t need to be unpacked.
    */
    const {
        selectedVendorIcons,
        selectedProfileMasthead,
        selectedBusinessClassifications
    } = data
    /*
    Reset the error messages in the errorMessage useState() property.
    */
    setErrorMessages({
        vendorIconsCheckboxes: null,
        profileMastheadRadioButtons: null,
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
    // Validate the Profile checkboxes
    formInputValidationTestsRunner('vendorIconsCheckboxes', PUBLIC_VENDOR_PROFILE_HIGHLIGHTS_FORM_INPUT_VALIDATION_SETTINGS, { checkboxesStates: selectedVendorIcons, maximumAllowed: 3 }, setErrorMessages)
    /*
    console.log('%c FormValidationGlobalMutables.messageList:', 'color: red; font-weight: bold;')
    console.log(FormValidationGlobalMutables.messageList)
    */
    // Validate the Profile checkboxes
    formInputValidationTestsRunner('profileMastheadRadioButtons', PUBLIC_VENDOR_PROFILE_HIGHLIGHTS_FORM_INPUT_VALIDATION_SETTINGS, { radioButtonsState: selectedProfileMasthead }, setErrorMessages)
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


        /*
        const postData = {
            b2cVendorIcons: selectedVendorIcons,
            profileMasthead: selectedProfileMasthead,
            businessClassifications: selectedBusinessClassifications
        }
        */

        const postDataHighlight = {
            id: ids.vendor_highlight_id,
            details: {
                alcoholic_beverages: selectedVendorIcons.alcoholic_beverages,
                dairy_eggs: selectedVendorIcons.dairy_eggs,
                delivery: selectedVendorIcons.delivery,
                fish: selectedVendorIcons.fish,
                fruits_vegetables: selectedVendorIcons.fruits_vegetables,
                grains: selectedVendorIcons.grains,
                halal: selectedVendorIcons.halal,
                kosher: selectedVendorIcons.kosher,
                masthead: selectedProfileMasthead,
                meat: selectedVendorIcons.meat,
                non_alcoholic_beverages: selectedVendorIcons.non_alcoholic_beverages,
                nuts_seeds_herbs: selectedVendorIcons.nuts_seeds_herbs,
                online_store: selectedVendorIcons.online_store,
                open_seasonaly: selectedVendorIcons.open_seasonaly,
                // open_year_round: selectedVendorIcons.open_year_round,
                organic: selectedVendorIcons.organic,
                prepared_food: selectedVendorIcons.prepared_food
            }
        }
        /*
        console.log('%c Public B2C Vendor Profile Highlights postDataHighlight:', 'color: red; font-weight: bold;')
        console.log({ postDataHighlight })
        */
        const postDataClassification = {
            id: ids.vendor_classification_id,
            details: {
                appropriateforallergiesspecialdiets: selectedBusinessClassifications.sp_appropriate_for_allergies_special_diets,
                certifiedorganic: selectedBusinessClassifications.sp_certified_organic,
                halal: selectedBusinessClassifications.sp_halal,
                kosher: selectedBusinessClassifications.sp_kosher,
                artisanspecialty: selectedBusinessClassifications.sp_specialty
            }
        }
        /*
        console.log('%c Public B2C Vendor Profile Highlights postDataClassification:', 'color: red; font-weight: bold;')
        console.log({ postDataClassification })
        */
        updateVendorProfileHighlights([ `${env}/accounts/update_highlight/`, `${env}/accounts/update_classification/` ], client.token, [ postDataHighlight, postDataClassification ], setFormValidated, formId)







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
        setFormValidated('You have successfully updated your public B2C vendor profile highlights information.')
        // Shift focus to the message
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1)
        */
    }
}