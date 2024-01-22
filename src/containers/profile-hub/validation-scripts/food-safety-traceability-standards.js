// import FormValidationGlobalMutables from '../../../utils/form-validation-global-mutables'
// import { formInputValidationTestsRunner } from '../../../utils/form-input-validation-tests-runner'
// import { SELLER_SPECIFIC_DETAILS_FORM_INPUT_VALIDATION_SETTINGS } from '../validation-settings/seller-specific-details'

const env = process.env.REACT_APP_API_URL

const updateFoodSafety = async (endpoint, clientToken, processorDatasToPost, setFormValidated, formId) => {

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
                setFormValidated('You have successfully updated your food safety and traceability standards information.')
                // Shift focus to the message
                setTimeout(() => {
                    document.getElementById(`${formId}-validatedMessage`).focus()
                }, 1)
            }
        })
    })
}

export const validateFoodSafetyTraceabilityStandardsForm = (event, data, setErrorMessages, setFormValidated, formId, client, ids) => {
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
            // offeredFoodSafetyTraceabilityStandards: data.selectedOfferedFoodSafetyTraceabilityStandards,
            // requiredFoodSafetyTraceabilityStandards: data.selectedRequiredFoodSafetyTraceabilityStandards,
            sellerRequiredFoodSafetyTraceabilityStandards: data.selectedSellerRequiredFoodSafetyTraceabilityStandards,
            buyerRequiredFoodSafetyTraceabilityStandards: data.selectedBuyerRequiredFoodSafetyTraceabilityStandards,
            processorRequiredFoodSafetyTraceabilityStandards: data.selectedProcessorRequiredFoodSafetyTraceabilityStandards,
        }
        console.log('%c Food Safety and Traceability Standards postData:', 'color: red; font-weight: bold;')
        console.log(postData)
        */


        const foodSafetyDatas = []

        if (ids.buyer_safety_standards_id) {
            foodSafetyDatas.push({
                id: ids.buyer_safety_standards_id,
                details: {
                    beer_tbd: false,
                    brc: data.selectedBuyerRequiredFoodSafetyTraceabilityStandards.brc,
                    cantrace: data.selectedBuyerRequiredFoodSafetyTraceabilityStandards.can_trace,
                    cider_tbd: false,
                    distillery_tbd: false,
                    federallyinspected: data.selectedBuyerRequiredFoodSafetyTraceabilityStandards.federally_inspected,
                    fpasafe: data.selectedBuyerRequiredFoodSafetyTraceabilityStandards.fpa_safe,
                    gap: data.selectedBuyerRequiredFoodSafetyTraceabilityStandards.gap,
                    gfcp: data.selectedBuyerRequiredFoodSafetyTraceabilityStandards.gfcp,
                    globalgap: data.selectedBuyerRequiredFoodSafetyTraceabilityStandards.global_gap,
                    gmp: data.selectedBuyerRequiredFoodSafetyTraceabilityStandards.gmp,
                    haccp: data.selectedBuyerRequiredFoodSafetyTraceabilityStandards.haccp,
                    iso: data.selectedBuyerRequiredFoodSafetyTraceabilityStandards.iso,
                    none: data.selectedBuyerRequiredFoodSafetyTraceabilityStandards.none,
                    ppm150: data.selectedBuyerRequiredFoodSafetyTraceabilityStandards.ppm150,
                    provinciallyinspected: data.selectedBuyerRequiredFoodSafetyTraceabilityStandards.provincially_inspected,
                    sqf: data.selectedBuyerRequiredFoodSafetyTraceabilityStandards.sqf,
                    sqf1000: data.selectedBuyerRequiredFoodSafetyTraceabilityStandards.sqf_1000,
                    sqf2000: data.selectedBuyerRequiredFoodSafetyTraceabilityStandards.sqf_2000
                }
            })
        }

        if (ids.seller_safety_standards_id) {
            foodSafetyDatas.push({
                id: ids.seller_safety_standards_id,
                details: {
                    beer_tbd: false,
                    brc: data.selectedSellerRequiredFoodSafetyTraceabilityStandards.brc,
                    cantrace: data.selectedSellerRequiredFoodSafetyTraceabilityStandards.can_trace,
                    cider_tbd: false,
                    distillery_tbd: false,
                    federallyinspected: data.selectedSellerRequiredFoodSafetyTraceabilityStandards.federally_inspected,
                    fpasafe: data.selectedSellerRequiredFoodSafetyTraceabilityStandards.fpa_safe,
                    gap: data.selectedSellerRequiredFoodSafetyTraceabilityStandards.gap,
                    gfcp: data.selectedSellerRequiredFoodSafetyTraceabilityStandards.gfcp,
                    globalgap: data.selectedSellerRequiredFoodSafetyTraceabilityStandards.global_gap,
                    gmp: data.selectedSellerRequiredFoodSafetyTraceabilityStandards.gmp,
                    haccp: data.selectedSellerRequiredFoodSafetyTraceabilityStandards.haccp,
                    iso: data.selectedSellerRequiredFoodSafetyTraceabilityStandards.iso,
                    none: data.selectedSellerRequiredFoodSafetyTraceabilityStandards.none,
                    ppm150: data.selectedSellerRequiredFoodSafetyTraceabilityStandards.ppm150,
                    provinciallyinspected: data.selectedSellerRequiredFoodSafetyTraceabilityStandards.provincially_inspected,
                    sqf: data.selectedSellerRequiredFoodSafetyTraceabilityStandards.sqf,
                    sqf1000: data.selectedSellerRequiredFoodSafetyTraceabilityStandards.sqf_1000,
                    sqf2000: data.selectedSellerRequiredFoodSafetyTraceabilityStandards.sqf_2000
                }
            })
        }

        if (ids.processor_safety_standards_id) {
            foodSafetyDatas.push({
                id: ids.processor_safety_standards_id,
                details: {
                    beer_tbd: false,
                    brc: data.selectedProcessorRequiredFoodSafetyTraceabilityStandards.brc,
                    cantrace: data.selectedProcessorRequiredFoodSafetyTraceabilityStandards.can_trace,
                    cider_tbd: false,
                    distillery_tbd: false,
                    federallyinspected: data.selectedProcessorRequiredFoodSafetyTraceabilityStandards.federally_inspected,
                    fpasafe: data.selectedProcessorRequiredFoodSafetyTraceabilityStandards.fpa_safe,
                    gap: data.selectedProcessorRequiredFoodSafetyTraceabilityStandards.gap,
                    gfcp: data.selectedProcessorRequiredFoodSafetyTraceabilityStandards.gfcp,
                    globalgap: data.selectedProcessorRequiredFoodSafetyTraceabilityStandards.global_gap,
                    gmp: data.selectedProcessorRequiredFoodSafetyTraceabilityStandards.gmp,
                    haccp: data.selectedProcessorRequiredFoodSafetyTraceabilityStandards.haccp,
                    iso: data.selectedProcessorRequiredFoodSafetyTraceabilityStandards.iso,
                    none: data.selectedProcessorRequiredFoodSafetyTraceabilityStandards.none,
                    ppm150: data.selectedProcessorRequiredFoodSafetyTraceabilityStandards.ppm150,
                    provinciallyinspected: data.selectedProcessorRequiredFoodSafetyTraceabilityStandards.provincially_inspected,
                    sqf: data.selectedProcessorRequiredFoodSafetyTraceabilityStandards.sqf,
                    sqf1000: data.selectedProcessorRequiredFoodSafetyTraceabilityStandards.sqf_1000,
                    sqf2000: data.selectedProcessorRequiredFoodSafetyTraceabilityStandards.sqf_2000
                }
            })
        }

        console.log('%c foodSafetyDatas:', 'color: red; font-weight: bold;')
        console.log({ foodSafetyDatas })

        updateFoodSafety(`${env}/accounts/update_safetystandard/`, client.token, foodSafetyDatas, setFormValidated, formId)


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
        setFormValidated('You have successfully updated your food safety and traceability standards information.')
        // Shift focus to the message
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1)
        */
    // }
}