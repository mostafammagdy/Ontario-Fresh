import FormValidationGlobalMutables from '../../../utils/form-validation-global-mutables'
import { formInputValidationTestsRunner } from '../../../utils/form-input-validation-tests-runner'
import { SELLER_SPECIFIC_DETAILS_FORM_INPUT_VALIDATION_SETTINGS } from '../validation-settings/seller-specific-details'

const env = process.env.REACT_APP_API_URL

const updateSellerDetails = async (endpoints, clientToken, sellerDatasToPost, setFormValidated, formId) => {

    sellerDatasToPost.forEach((dataToPost, i) => {
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
                setFormValidated('You have successfully updated your seller specific details information.')
                // Shift focus to the message
                setTimeout(() => {
                    document.getElementById(`${formId}-validatedMessage`).focus()
                }, 1)
            }
        })
    })
}

export const validateSellerSpecificDetailsForm = (event, data, setErrorMessages, setFormValidated, formId, client, ids) => {
    event.preventDefault()
    /*
    Unpack the setState() properties for all of the form’s input fields that need to be validated. Fields that don’t need to be validated don’t need to be unpacked.
    */
    const {
        // selectedSellerBusinessSize,
        selectedSellerThirdPartyInsurance
    } = data
    /*
    Reset the error messages in the errorMessage useState() property.
    */
    setErrorMessages({
        sellerBusinessSizeCheckboxes: null,
        sellerThirdPartyInsuranceCheckboxes: null,
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
    // formInputValidationTestsRunner('sellerBusinessSizeCheckboxes', SELLER_SPECIFIC_DETAILS_FORM_INPUT_VALIDATION_SETTINGS, { checkboxesStates: selectedSellerBusinessSize, maximumAllowed: 1 }, setErrorMessages)
    formInputValidationTestsRunner('sellerThirdPartyInsuranceCheckboxes', SELLER_SPECIFIC_DETAILS_FORM_INPUT_VALIDATION_SETTINGS, { checkboxesStates: selectedSellerThirdPartyInsurance, maximumAllowed: 1 }, setErrorMessages)
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
            sellerBusinessClassifications: data.selectedSellerBusinessClassifications,
            sellerPreferredPaymentMethods: data.selectedSellerPreferredPaymentMethods,
            buyerBusinessSize: data.selectedSellerBusinessSize,
            buyerThirdPartyInsurance: selectedSellerThirdPartyInsurance
        }
        console.log('%c Seller Specific Details postData:', 'color: red; font-weight: bold;')
        console.log(postData)
        */


        const postSellerDatas = []


        if (ids.seller_classification_id) {
            postSellerDatas.push({
                id: ids.seller_classification_id,
                details: {
                    appropriateforallergiesspecialdiets: data.selectedSellerBusinessClassifications.appropriate_for_allergies_special_diets,
                    certifiedorganic: data.selectedSellerBusinessClassifications.certified_organic,
                    halal: data.selectedSellerBusinessClassifications.halal,
                    kosher: data.selectedSellerBusinessClassifications.kosher,
                    artisanspecialty: data.selectedSellerBusinessClassifications.specialty
                }
            })
        }

        if (ids.seller_payment_methods_id) {
            postSellerDatas.push({
                id: ids.seller_payment_methods_id,
                details: {
                    creditdebit: data.selectedSellerPreferredPaymentMethods.visa_debit,
                    cashondelivery: data.selectedSellerPreferredPaymentMethods.cod,
                    purchaseorderinvoice: data.selectedSellerPreferredPaymentMethods.invoice_po
                }
            })
        }

        if (ids.seller_role_id) {
            const sellerRoleObj = {
                id: ids.seller_role_id,
                details: {
                    business_scale: [],
                    third_party_insurance: selectedSellerThirdPartyInsurance.yes
                }
            }
            if (data.selectedSellerBusinessSize.small) sellerRoleObj.details.business_scale.push('Small')
            if (data.selectedSellerBusinessSize.medium) sellerRoleObj.details.business_scale.push('Medium')
            if (data.selectedSellerBusinessSize.large) sellerRoleObj.details.business_scale.push('Large')
            postSellerDatas.push(sellerRoleObj)
        }

        console.log('%c postSellerDatas:', 'color: red; font-weight: bold;')
        console.log({ postSellerDatas })

        updateSellerDetails([ `${env}/accounts/update_classification/`, `${env}/accounts/update_paymentmethod/`, `${env}/accounts/update_role/` ] , client.token, postSellerDatas, setFormValidated, formId)

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
        setFormValidated('You have successfully updated your seller specific details information.')
        // Shift focus to the message
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1)
        */
    }
}