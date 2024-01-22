import FormValidationGlobalMutables from '../../../utils/form-validation-global-mutables'
import { formInputValidationTestsRunner } from '../../../utils/form-input-validation-tests-runner'
import { PROCESSOR_SPECIFIC_DETAILS_FORM_INPUT_VALIDATION_SETTINGS } from '../validation-settings/processor-specific-details'

const env = process.env.REACT_APP_API_URL

const updateProcessorDetails = async (endpoints, clientToken, processorDatasToPost, setFormValidated, formId) => {

    processorDatasToPost.forEach((dataToPost, i) => {
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
                setFormValidated('You have successfully updated your processor specific details information.')
                // Shift focus to the message
                setTimeout(() => {
                    document.getElementById(`${formId}-validatedMessage`).focus()
                }, 1)
            }
        })
    })
}

export const validateProcessorSpecificDetailsForm = (event, data, setErrorMessages, setFormValidated, formId, client, ids) => {
    event.preventDefault()
    /*
    Unpack the setState() properties for all of the form’s input fields that need to be validated. Fields that don’t need to be validated don’t need to be unpacked.
    */
    const {
        selectedProcessingMethodsAvailable,
        selectedBusinessClassificationsForProductsYouProcess,
        selectedGeneralProcessingFormats,
        processingVolumes,
        coPackingServices,
        privateLabelServices,
        customProcessTakeSpecialOrders,
        thirdPartyLiabilityInsurance
    } = data
    /*
    Reset the error messages in the errorMessage useState() property.
    */
    setErrorMessages({
        // processingVolumesCheckboxes: null,
        coPackingServicesCheckboxes: null,
        privateLabelServicesCheckboxes: null,
        customProcessTakeSpecialOrdersCheckboxes: null,
        thirdPartyLiabilityInsuranceCheckboxes: null,
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
    // formInputValidationTestsRunner('processingVolumesCheckboxes', PROCESSOR_SPECIFIC_DETAILS_FORM_INPUT_VALIDATION_SETTINGS, { checkboxesStates: processingVolumes, maximumAllowed: 1 }, setErrorMessages)
    /*
    console.log('%c FormValidationGlobalMutables.messageList:', 'color: red; font-weight: bold;')
    console.log(FormValidationGlobalMutables.messageList)
    */
    // Validate the Profile checkboxes
    formInputValidationTestsRunner('coPackingServicesCheckboxes', PROCESSOR_SPECIFIC_DETAILS_FORM_INPUT_VALIDATION_SETTINGS, { checkboxesStates: coPackingServices, maximumAllowed: 1 }, setErrorMessages)
    /*
    console.log('%c FormValidationGlobalMutables.messageList:', 'color: red; font-weight: bold;')
    console.log(FormValidationGlobalMutables.messageList)
    */
    // Validate the Profile checkboxes
    formInputValidationTestsRunner('privateLabelServicesCheckboxes', PROCESSOR_SPECIFIC_DETAILS_FORM_INPUT_VALIDATION_SETTINGS, { checkboxesStates: privateLabelServices, maximumAllowed: 1 }, setErrorMessages)
    // Validate the Profile checkboxes
    formInputValidationTestsRunner('customProcessTakeSpecialOrdersCheckboxes', PROCESSOR_SPECIFIC_DETAILS_FORM_INPUT_VALIDATION_SETTINGS, { checkboxesStates: customProcessTakeSpecialOrders, maximumAllowed: 1 }, setErrorMessages)
    // Validate the Profile checkboxes
    formInputValidationTestsRunner('thirdPartyLiabilityInsuranceCheckboxes', PROCESSOR_SPECIFIC_DETAILS_FORM_INPUT_VALIDATION_SETTINGS, { checkboxesStates: thirdPartyLiabilityInsurance, maximumAllowed: 1 }, setErrorMessages)
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
        console.log('%c FORM VALIDATED!', 'color: green; font-weight: bold;')
        */
        /*
        setFormValidated('formSubmitting')
        setTimeout(() => {
            formSubmitting.current.focus()
        }, 1)
        */





        const postData = {
            selectedProcessingMethodsAvailable,
            selectedBusinessClassificationsForProductsYouProcess,
            selectedGeneralProcessingFormats,
            processingVolumes,
            coPackingServices,
            privateLabelServices,
            customProcessTakeSpecialOrders,
            thirdPartyLiabilityInsurance
        }
        console.log('%c Processor Specific Details postData:', 'color: red; font-weight: bold;')
        console.log(postData)




        const postProcessorDatas = []

        if (ids.processor_processing_types_id) {
            postProcessorDatas.push({
                id: ids.processor_processing_types_id,
                details: {
                    abattoirservics: selectedProcessingMethodsAvailable.abattoir_services,
                    baking: selectedProcessingMethodsAvailable.baking,
                    brewing: selectedProcessingMethodsAvailable.brewing,
                    canning: selectedProcessingMethodsAvailable.canning,
                    cheesemaking: selectedProcessingMethodsAvailable.cheese_making,
                    choppingdicingslicing: selectedProcessingMethodsAvailable.chopping_dicing_slicing,
                    cooking: selectedProcessingMethodsAvailable.cooking,
                    curing: selectedProcessingMethodsAvailable.curing,
                    distilling: selectedProcessingMethodsAvailable.distilling,
                    drying: selectedProcessingMethodsAvailable.drying,
                    freezing: selectedProcessingMethodsAvailable.freezing,
                    furthermeatprocessing: selectedProcessingMethodsAvailable.further_meat_processing,
                    juicingpressing: selectedProcessingMethodsAvailable.juicing_pressing,
                    milling: selectedProcessingMethodsAvailable.milling,
                    other: selectedProcessingMethodsAvailable.other,
                    otherdairyprocessing: selectedProcessingMethodsAvailable.other_dairy_processing,
                    packing: selectedProcessingMethodsAvailable.packing,
                    peeling: selectedProcessingMethodsAvailable.peeling,
                    pureeing: selectedProcessingMethodsAvailable.pureeing,
                    smoking: selectedProcessingMethodsAvailable.smoking,
                    winemaking: selectedProcessingMethodsAvailable.wine_making
                }
            })
        }

        if (ids.processor_classification_id) {
            postProcessorDatas.push({
                id: ids.processor_classification_id,
                details: {
                    appropriateforallergiesspecialdiets: data.selectedBusinessClassificationsForProductsYouProcess.appropriate_for_allergies_special_diets,
                    certifiedorganic: data.selectedBusinessClassificationsForProductsYouProcess.certified_organic,
                    halal: data.selectedBusinessClassificationsForProductsYouProcess.halal,
                    kosher: data.selectedBusinessClassificationsForProductsYouProcess.kosher,
                    artisanspecialty: data.selectedBusinessClassificationsForProductsYouProcess.specialty
                }
            })
        }

        if (ids.processor_market_types_id) {
            postProcessorDatas.push({
                id: ids.processor_market_types_id,
                details: {
                    furtherprocessing: data.selectedGeneralProcessingFormats.further_processing,
                    largescalefoodservice: data.selectedGeneralProcessingFormats.large_scale_food_service,
                    restaurantsorfoodservice: data.selectedGeneralProcessingFormats.restaurants_or_food_service,
                    retail: data.selectedGeneralProcessingFormats.retail
                }
            })
        }

        if (ids.processor_role_id) {
            const processorRoleObj = {
                id: ids.processor_role_id,
                details: {
                    business_scale: [],
                    co_packing: data.coPackingServices.yes ? 1 : data.coPackingServices.no ? 2 : 3,
                    private_label: data.privateLabelServices.yes ? 1 : data.privateLabelServices.no ? 2 : 3,
                    custom_process: data.customProcessTakeSpecialOrders.yes ? 1 : data.customProcessTakeSpecialOrders.no ? 2 : 3,
                    third_party_insurance: data.thirdPartyLiabilityInsurance.yes
                }
            }
            if (data.processingVolumes.small) processorRoleObj.details.business_scale.push('Small')
            if (data.processingVolumes.medium) processorRoleObj.details.business_scale.push('Medium')
            if (data.processingVolumes.large) processorRoleObj.details.business_scale.push('Large')
            postProcessorDatas.push(processorRoleObj)
        }

        console.log('%c postProcessorDatas:', 'color: red; font-weight: bold;')
        console.log({ postProcessorDatas })

        updateProcessorDetails([ `${env}/accounts/update_processing/`, `${env}/accounts/update_classification/`, `${env}/accounts/update_market/`, `${env}/accounts/update_role/` ], client.token, postProcessorDatas, setFormValidated, formId)



        /*
        ...hide the form and show the “next steps” message.
        */
        /*
        setFormValidated('You have successfully updated your processor specific details information.')
        // Shift focus to the message
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1)
        */
    }
}