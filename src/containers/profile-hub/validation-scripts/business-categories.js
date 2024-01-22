import FormValidationGlobalMutables from '../../../utils/form-validation-global-mutables'
import { formInputValidationTestsRunner } from '../../../utils/form-input-validation-tests-runner'
import { BUSINESS_CATEGORIES_FORM_INPUT_VALIDATION_SETTINGS } from '../validation-settings/business-categories'
import { updateProfileUrl } from '../../../containers/editProfileItemsModal/sagas'

const updateBusinessType = async (endpoint, clientToken, dataToPost, setFormValidated, formId) => {
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
        /*
        ...hide the form and show the “next steps” message.
        */
        setFormValidated('You have successfully updated your business categories.')
        // Shift focus to the message
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1)
    })
}

export const validateBusinessCategoriesForm = (event, data, setErrorMessages, setFormValidated, formId, client, ids) => {
    event.preventDefault()
    /*
    Unpack the setState() properties for all of the form’s input fields that need to be validated. Fields that don’t need to be validated don’t need to be unpacked.
    */
    const {
        selectedBusinessCaterories
    } = data
    /*
    Reset the error messages in the errorMessage useState() property.
    */
    /*
    setErrorMessages({
        businessCategoriesCheckboxes: null,
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
    setFormValidated('')
    // Validate the Profile checkboxes
    // formInputValidationTestsRunner('businessCategoriesCheckboxes', BUSINESS_CATEGORIES_FORM_INPUT_VALIDATION_SETTINGS, { checkboxesStates: selectedBusinessCaterories, minimumRequired: 1 }, setErrorMessages)
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
    *
    if (FormValidationGlobalMutables.messageList.length > 0) {
        /
        ...focus the lead paragraph in the form’s error list area.
        *
        setTimeout(() => {
            document.getElementById(`${formId}-p`).focus()
        }, 1)
    */
    /*
    Else if all of the form inputs that needed to be validated passed their tests...
    */
    // } else {

        /*
        const postData = {
            businessCaterories: selectedBusinessCaterories
        }
        */


        const category = []
        
        if (selectedBusinessCaterories.aggregator_or_hub) category.push('Aggregator or Hub')
        if (selectedBusinessCaterories.agricultural_assoc) category.push('Agricultural Association')
        if (selectedBusinessCaterories.agritourism) category.push('Agritourism')
        if (selectedBusinessCaterories.bakery) category.push('Bakery')
        if (selectedBusinessCaterories.brewery) category.push('Brewery')
        if (selectedBusinessCaterories.buyer) category.push('Buyer')
        if (selectedBusinessCaterories.chef) category.push('Chef')
        if (selectedBusinessCaterories.cidery) category.push('Cidery')
        if (selectedBusinessCaterories.co_op) category.push('Co-op')
        if (selectedBusinessCaterories.community_agriculture) category.push('Community Supported Agriculture')
        if (selectedBusinessCaterories.custom_processor) category.push('Custom Processor')
        if (selectedBusinessCaterories.distillery) category.push('Distillery')
        if (selectedBusinessCaterories.distributor) category.push('Distributor')
        if (selectedBusinessCaterories.equip_machinery_sales) category.push('Equipment & Machinery Sales')
        if (selectedBusinessCaterories.farmers_market) category.push('Farmers\' Market')
        if (selectedBusinessCaterories.food_bank) category.push('Food Bank')
        if (selectedBusinessCaterories.food_service_provider) category.push('Foodservice Provider')
        if (selectedBusinessCaterories.government) category.push('Government')
        if (selectedBusinessCaterories.greenhouse) category.push('Greenhouse')
        if (selectedBusinessCaterories.grocery_store) category.push('Grocery Store')
        if (selectedBusinessCaterories.group_purchasing) category.push('Group Purchasing Organization')
        if (selectedBusinessCaterories.grower_producer) category.push('Grower/Producer')
        if (selectedBusinessCaterories.input_provider) category.push('Input Provider')
        if (selectedBusinessCaterories.institution) category.push('Institution')
        if (selectedBusinessCaterories.logistics) category.push('Logistics')
        if (selectedBusinessCaterories.marketing_advertising) category.push('Marketing and Advertising')
        if (selectedBusinessCaterories.nursery) category.push('Nursery')
        if (selectedBusinessCaterories.on_farm_market) category.push('On-Farm Market')
        if (selectedBusinessCaterories.other_agriculture) category.push('Other Agricultural Supporter')
        if (selectedBusinessCaterories.other_support_industry) category.push('Other Support Industry')
        if (selectedBusinessCaterories.packaging_shipping) category.push('Packaging, Shipping etc.')
        if (selectedBusinessCaterories.packer) category.push('Packer')
        if (selectedBusinessCaterories.pick_your_own) category.push('Pick-your-own')
        if (selectedBusinessCaterories.processor) category.push('Processor')
        if (selectedBusinessCaterories.regional_food_network) category.push('Regional Food Network')
        if (selectedBusinessCaterories.restaurant) category.push('Restaurant')
        if (selectedBusinessCaterories.retail_operator_shop) category.push('Retail Operator')
        if (selectedBusinessCaterories.school_or_cafeteria) category.push('School or Cafeteria')
        if (selectedBusinessCaterories.school_supplier_vendor) category.push('School Supplier/Vendor')
        if (selectedBusinessCaterories.seller) category.push('Seller')
        if (selectedBusinessCaterories.transportation_climate_control) category.push('Transportation and Climate Control')
        if (selectedBusinessCaterories.wholesale) category.push('Wholesale')
        if (selectedBusinessCaterories.winery) category.push('Winery')
        /*
        console.log('%c category:', 'color: red; font-weight: bold;')
        console.log({ category })
        */
        const postData = {
            id: client.account_id,
            details: {
                category
            }
        }

        console.log('%c Business Categories postData:', 'color: red; font-weight: bold;')
        console.log(postData)

        updateBusinessType(updateProfileUrl, client.token, postData, setFormValidated, formId)

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
        setFormValidated('You have successfully updated your business categories.')
        // Shift focus to the message
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1)
        */
    // }
}