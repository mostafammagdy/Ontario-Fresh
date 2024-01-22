import FormValidationGlobalMutables from '../../../utils/form-validation-global-mutables'
import { formInputValidationTestsRunner } from '../../../utils/form-input-validation-tests-runner'
import { BUYER_SPECIFIC_DETAILS_FORM_INPUT_VALIDATION_SETTINGS } from '../validation-settings/buyer-specific-details'

const env = process.env.REACT_APP_API_URL

const updateBuyerDetails = async (endpoints, clientToken, buyerDatasToPost, setFormValidated, formId) => {

    buyerDatasToPost.forEach((dataToPost, i) => {
        return fetch(endpoints[i] , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": clientToken ? "Bearer " + clientToken : undefined
            },
            body: JSON.stringify(dataToPost)
        }).then(response => {
            /*
            console.log(`%c ${i} response:`, 'color: turquoise; font-weight: bold, font-style: italic; text-decoration: underline;')
            console.log({ response })
            */
            if (response.status !== 500) {
                console.log(`%c ${i} POST was successful!:`, 'color: blue; font-weight: bold;')
                /*
                ...hide the form and show the “next steps” message.
                */
                setFormValidated('You have successfully updated your buyer specific details information.')
                // Shift focus to the message
                setTimeout(() => {
                    document.getElementById(`${formId}-validatedMessage`).focus()
                }, 1)
            }
        })
    })
}

export const validateBuyerSpecificDetailsForm = (event, data, setErrorMessages, setFormValidated, formId, client, ids) => {
    event.preventDefault()
    /*
    Unpack the setState() properties for all of the form’s input fields that need to be validated. Fields that don’t need to be validated don’t need to be unpacked.
    */
    const {
        // selectedBuyerBusinessSize,
        selectedBuyerThirdPartyInsurance
    } = data
    /*
    Reset the error messages in the errorMessage useState() property.
    */
    setErrorMessages({
        buyerBusinessSizeCheckboxes: null,
        buyerThirdPartyInsuranceCheckboxes: null,
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
    // formInputValidationTestsRunner('buyerBusinessSizeCheckboxes', BUYER_SPECIFIC_DETAILS_FORM_INPUT_VALIDATION_SETTINGS, { checkboxesStates: selectedBuyerBusinessSize, maximumAllowed: 1 }, setErrorMessages)
    formInputValidationTestsRunner('buyerThirdPartyInsuranceCheckboxes', BUYER_SPECIFIC_DETAILS_FORM_INPUT_VALIDATION_SETTINGS, { checkboxesStates: selectedBuyerThirdPartyInsurance, maximumAllowed: 1 }, setErrorMessages)
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
            // buyerBusinessClassifications: data.selectedBuyerBusinessClassifications,
            buyerPreferredPaymentMethods: data.selectedBuyerPreferredPaymentMethods,
            buyerBusinessSize: data.selectedBuyerBusinessSize,
            buyerThirdPartyInsurance: selectedBuyerThirdPartyInsurance
        }
        console.log('%c Buyer Specific Details postData:', 'color: red; font-weight: bold;')
        console.log(postData)
        */


        const postBuyerDatas = []


        if (ids.buyer_classification_id) {
            postBuyerDatas.push({
                id: ids.buyer_classification_id,
                details: {
                    appropriateforallergiesspecialdiets: data.selectedBuyerBusinessClassifications.appropriate_for_allergies_special_diets,
                    certifiedorganic: data.selectedBuyerBusinessClassifications.certified_organic,
                    halal: data.selectedBuyerBusinessClassifications.halal,
                    kosher: data.selectedBuyerBusinessClassifications.kosher,
                    artisanspecialty: data.selectedBuyerBusinessClassifications.specialty
                }
            })
        }

        if (ids.buyer_payment_methods_id) {
            postBuyerDatas.push({
                id: ids.buyer_payment_methods_id,
                details: {
                    creditdebit: data.selectedBuyerPreferredPaymentMethods.visa_debit,
                    cashondelivery: data.selectedBuyerPreferredPaymentMethods.cod,
                    purchaseorderinvoice: data.selectedBuyerPreferredPaymentMethods.invoice_po
                }
            })
        }

        if (ids.buyer_role_id) {
            const buyerRoleObj = {
                id: ids.buyer_role_id,
                details: {
                    business_scale: [],
                    third_party_insurance: selectedBuyerThirdPartyInsurance.yes
                }
            }
            if (data.selectedBuyerBusinessSize.small) buyerRoleObj.details.business_scale.push('Small')
            if (data.selectedBuyerBusinessSize.medium) buyerRoleObj.details.business_scale.push('Medium')
            if (data.selectedBuyerBusinessSize.large) buyerRoleObj.details.business_scale.push('Large')
            postBuyerDatas.push(buyerRoleObj)
        }

        console.log('%c postBuyerDatas:', 'color: red; font-weight: bold;')
        console.log({ postBuyerDatas })

        updateBuyerDetails([ `${env}/accounts/update_classification/`, `${env}/accounts/update_paymentmethod/`, `${env}/accounts/update_role/` ] , client.token, postBuyerDatas, setFormValidated, formId)







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
        setFormValidated('You have successfully updated your buyer specific details information.')
        // Shift focus to the message
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1)
        */
    }
}