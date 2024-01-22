// import FormValidationGlobalMutables from '../../../utils/form-validation-global-mutables'
// import { formInputValidationTestsRunner } from '../../../utils/form-input-validation-tests-runner'
// import { SELLER_SPECIFIC_DETAILS_FORM_INPUT_VALIDATION_SETTINGS } from '../validation-settings/seller-specific-details'

const env = process.env.REACT_APP_API_URL

const updateServicesProvidedWanted = async (endpoint, clientToken, processorDatasToPost, setFormValidated, formId) => {

    processorDatasToPost.forEach((dataToPost, i) => {
        return fetch(endpoint , {
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
                setFormValidated('You have successfully updated your services information.')
                // Shift focus to the message
                setTimeout(() => {
                    document.getElementById(`${formId}-validatedMessage`).focus()
                }, 1)
            }
        })
    })
}

export const validateServicesForm = (event, data, setErrorMessages, setFormValidated, formId, client, ids) => {
    event.preventDefault()
    /*
    Unpack the setState() properties for all of the form’s input fields that need to be validated. Fields that don’t need to be validated don’t need to be unpacked.
    */
    /*
    const {
        selectedSellerBusinessSize
    } = data
    */
    /*
    Reset the error messages in the errorMessage useState() property.
    */
    /*
    setErrorMessages({
        sellerBusinessSizeRadioButtons: null,
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
    // formInputValidationTestsRunner('sellerBusinessSizeRadioButtons', SELLER_SPECIFIC_DETAILS_FORM_INPUT_VALIDATION_SETTINGS, { radioButtonsState: selectedSellerBusinessSize }, setErrorMessages)
    /*
    console.log('%c FormValidationGlobalMutables.messageList:', 'color: red; font-weight: bold;')
    console.log(FormValidationGlobalMutables.messageList)
    */
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
        const postData = {
            servicesOffered: data.selectedServicesOffered,
            servicesWanted: data.selectedServicesWanted
        }
        console.log('%c Services postData:', 'color: red; font-weight: bold;')
        console.log(postData)
        */


        const servicesDatas = []

        if (ids.serviceProvider_services_provided_id) {
            servicesDatas.push({
                id: ids.serviceProvider_services_provided_id,
                details: {
                    abattoirservics: data.selectedServicesOffered.abattoir_services_meat,
                    advertisingmarketingpromotions: data.selectedServicesOffered.advertising_marketing_promotions,
                    coldstorage: data.selectedServicesOffered.cold_storage_refrigerated_warehousing,
                    consolidationaggregationhub: data.selectedServicesOffered.consolidation_aggregation_hub_services,
                    delivery: data.selectedServicesOffered.delivery,
                    frozenstorage: data.selectedServicesOffered.frozen_storage,
                    fullservicedistribution: data.selectedServicesOffered.full_serviced_distribution,
                    otherspecializedstorage: data.selectedServicesOffered.other_specialized_storage,
                    postharvesthandlingpacking: data.selectedServicesOffered.post_harvest_handling_or_packing,
                    processing: data.selectedServicesOffered.processing,
                    sharingpuchaceorders: data.selectedServicesOffered.sharing_purchase_orders,
                    transportationclimatecontrol: data.selectedServicesOffered.transportation_and_climate_control,
                    warehousing: data.selectedServicesOffered.warehousing
                }
            })
        }

        if (ids.serviceProvider_services_needed_id) {
            servicesDatas.push({
                id: ids.serviceProvider_services_needed_id,
                details: {
                    abattoirservics: data.selectedServicesWanted.abattoir_services_meat,
                    advertisingmarketingpromotions: data.selectedServicesWanted.advertising_marketing_promotions,
                    coldstorage: data.selectedServicesWanted.cold_storage_refrigerated_warehousing,
                    consolidationaggregationhub: data.selectedServicesWanted.consolidation_aggregation_hub_services,
                    delivery: data.selectedServicesWanted.delivery,
                    frozenstorage: data.selectedServicesWanted.frozen_storage,
                    fullservicedistribution: data.selectedServicesWanted.full_serviced_distribution,
                    otherspecializedstorage: data.selectedServicesWanted.other_specialized_storage,
                    postharvesthandlingpacking: data.selectedServicesWanted.post_harvest_handling_or_packing,
                    processing: data.selectedServicesWanted.processing,
                    sharingpuchaceorders: data.selectedServicesWanted.sharing_purchase_orders,
                    transportationclimatecontrol: data.selectedServicesWanted.transportation_and_climate_control,
                    warehousing: data.selectedServicesWanted.warehousing
                }
            })
        }

        console.log('%c servicesDatas:', 'color: red; font-weight: bold;')
        console.log({ servicesDatas })

        updateServicesProvidedWanted(`${env}/accounts/update_service/`, client.token, servicesDatas, setFormValidated, formId)





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
        setFormValidated('You have successfully updated your services information.')
        // Shift focus to the message
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1)
        */
    // }
}