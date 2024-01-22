import FormValidationGlobalMutables from '../../../utils/form-validation-global-mutables'
import { formInputValidationTestsRunner } from '../../../utils/form-input-validation-tests-runner'
import { DELIVERY_DETAILS_FORM_INPUT_VALIDATION_SETTINGS } from '../validation-settings/delivery-details'

const env = process.env.REACT_APP_API_URL

const updateDeliveryDetails = async (endpoints, clientToken, deliveryDatasToPost, vendorDeliveryDetailsDataToPost, setFormValidated, formId) => {

    deliveryDatasToPost.forEach((dataToPost, i) => {
        return fetch(endpoints[0] , {
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

                setFormValidated('You have successfully updated your delivery details information.')
                // Shift focus to the message
                setTimeout(() => {
                    document.getElementById(`${formId}-validatedMessage`).focus()
                }, 1)
            }
        })
    })

    if (vendorDeliveryDetailsDataToPost) {
        return await fetch(endpoints[1] , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": clientToken ? "Bearer " + clientToken : undefined
            },
            body: JSON.stringify(vendorDeliveryDetailsDataToPost)
        }).then(response => {
            /*
            console.log('%c Vendor delivery details response:', 'color: turquoise; font-weight: bold, font-style: italic; text-decoration: underline;')
            console.log({ response })
            */
            if (response.status !== 500) {
                console.log('%c Vendor delivery details POST was successful!:', 'color: blue; font-weight: bold;')
            }
        })
    }

}

export const validateDeliveryDetailsForm = (event, data, setErrorMessages, setFormValidated, formId, client, ids) => {
    event.preventDefault()
    /*
    Unpack the setState() properties for all of the form’s input fields that need to be validated. Fields that don’t need to be validated don’t need to be unpacked.
    */
    const {
        selectedDeliveryDetailsBuyerOfferDelivery,
        selectedDeliveryDetailsSellerOfferDelivery,
        selectedDeliveryDetailsVendorOfferDelivery,
        inputDeliveryDetailsVendorFurtherDetails,
        selectedDeliveryDetailsProcessorOfferDelivery
    } = data
    /*
    Reset the error messages in the errorMessage useState() property.
    */
    /*
    setErrorMessages({
        deliveryDetailsBuyerRadioButtons: null,
        deliveryDetailsSellerRadioButtons: null,
        deliveryDetailsVendorRadioButtons: null,
        deliveryDetailsProcessorRadioButtons: null,
        messageList: []
    })
    */
    /*
    Reset the error messages in the global messageList array.
    */
    // FormValidationGlobalMutables.messageList = []
    /*
    console.log('%c FormValidationGlobalMutables.messageList:', 'color: blue; font-weight: bold;')
    console.log(FormValidationGlobalMutables.messageList)
    */
    // Reset the form submitted success message
    // setFormValidated('')
    // Validate the Profile checkboxes
    // formInputValidationTestsRunner('deliveryDetailsBuyerRadioButtons', DELIVERY_DETAILS_FORM_INPUT_VALIDATION_SETTINGS, { radioButtonsState: selectedDeliveryDetailsBuyerOfferDelivery }, setErrorMessages)
    /*
    console.log('%c FormValidationGlobalMutables.messageList:', 'color: red; font-weight: bold;')
    console.log(FormValidationGlobalMutables.messageList)
    */
    // Validate the Profile checkboxes
    // formInputValidationTestsRunner('deliveryDetailsSellerRadioButtons', DELIVERY_DETAILS_FORM_INPUT_VALIDATION_SETTINGS, { radioButtonsState: selectedDeliveryDetailsSellerOfferDelivery }, setErrorMessages)
    /*
    console.log('%c FormValidationGlobalMutables.messageList:', 'color: red; font-weight: bold;')
    console.log(FormValidationGlobalMutables.messageList)
    */
    // Validate the Profile checkboxes
    // formInputValidationTestsRunner('deliveryDetailsVendorRadioButtons', DELIVERY_DETAILS_FORM_INPUT_VALIDATION_SETTINGS, { radioButtonsState: selectedDeliveryDetailsVendorOfferDelivery }, setErrorMessages)
    // Validate the Profile checkboxes
    // formInputValidationTestsRunner('deliveryDetailsProcessorRadioButtons', DELIVERY_DETAILS_FORM_INPUT_VALIDATION_SETTINGS, { radioButtonsState: selectedDeliveryDetailsProcessorOfferDelivery }, setErrorMessages)
    /*
    Update the errorMessages useState() property with any error messages that might’ve been added during the above validation tests.
    */
    // setErrorMessages(prevState => ({ ...prevState, messageList: FormValidationGlobalMutables.messageList }))
    /*
    console.log('%c validated:', 'color: red; font-weight: bold;')
    console.log({ validated: messageList < 1 })
    */
    /*
    If at least one of the form inputs that needed to be validated failed their test...
    */
    /*
    if (FormValidationGlobalMutables.messageList.length > 0) {
        /*
        ...focus the lead paragraph in the form’s error list area.
        *
        setTimeout(() => {
            document.getElementById(`${formId}-p`).focus()
        }, 1)
    /*
    Else if all of the form inputs that needed to be validated passed their tests...
    *
    } else {
        */
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
        const postData = {
            selectedDeliveryDetailsBuyerOfferDelivery,
            selectedDeliveryDetailsSellerOfferDelivery,
            selectedDeliveryDetailsVendorOfferDelivery,
            inputDeliveryDetailsVendorFurtherDetails,
            selectedDeliveryDetailsProcessorOfferDelivery
        }
        console.log('%c Delivery Details postData:', 'color: red; font-weight: bold;')
        console.log(postData)
        */

        const postDeliveryDatas = []
        
        if (ids.buyer_role_id) {
            postDeliveryDatas.push({
                id: ids.buyer_role_id,
                details: {
                    delivery: selectedDeliveryDetailsBuyerOfferDelivery
                }
            })
        }
        
        if (ids.seller_role_id) {
            postDeliveryDatas.push({
                id: ids.seller_role_id,
                details: {
                    delivery: selectedDeliveryDetailsSellerOfferDelivery
                }
            })
        }
        
        if (ids.vendor_role_id) {
            postDeliveryDatas.push({
                id: ids.vendor_role_id,
                details: {
                    delivery: selectedDeliveryDetailsVendorOfferDelivery
                }
            })
        }
        
        if (ids.processor_role_id) {
            postDeliveryDatas.push({
                id: ids.processor_role_id,
                details: {
                    delivery: selectedDeliveryDetailsProcessorOfferDelivery
                }
            })
        }

        console.log('%c postDeliveryDatas:', 'color: red; font-weight: bold;')
        console.log({ postDeliveryDatas })

        const postVendorDetails = ids.vendor_highlight_id ? {
            id: ids.vendor_highlight_id,
            details: {
                delivery_details: inputDeliveryDetailsVendorFurtherDetails
            }
        } : null

        console.log('%c postVendorDetails:', 'color: red; font-weight: bold;')
        console.log({ postVendorDetails })


        updateDeliveryDetails([ `${env}/accounts/update_role/` , `${env}/accounts/update_highlight/` ], client.token, postDeliveryDatas, postVendorDetails, setFormValidated, formId)


        /*
        setFormValidated('You have successfully updated your delivery details information.')
        // Shift focus to the message
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1)
        */
    // }
}