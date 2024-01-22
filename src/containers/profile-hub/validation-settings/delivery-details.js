import { requiredRadioButton } from '../../../utils/form-input-validation-tests'

/**
 * PUBLIC_VENDOR_PROFILE_HIGHLIGHTS_FORM_INPUT_VALIDATION_SETTINGS contains the settings specific to each group of inputs in the form that need to be validated. This object works in conjunction with FORM_INPUT_VALIDATION_TESTS, messageList[], formInputValidationTestsRunner() and validateForm().
 * 
 * Make sure that when you add a new error property, you give it a key that matches the ID of the form’s input or input group that you want to validate. The “focus” property is the ID of the page element you want to focus when the error message is selected by the user.
 */
export const DELIVERY_DETAILS_FORM_INPUT_VALIDATION_SETTINGS = {
    "deliveryDetailsBuyerRadioButtons": [
        {
            "test": paramsObj => requiredRadioButton(paramsObj),
            "message": "You must choose one buyer delivery option.",
            "focus": "deliveryDetailsBuyerRadioButtons-legend"
        }
    ],
    "deliveryDetailsSellerRadioButtons": [
        {
            "test": paramsObj => requiredRadioButton(paramsObj),
            "message": "You must choose one seller delivery option.",
            "focus": "deliveryDetailsSellerRadioButtons-legend"
        }
    ],
    "deliveryDetailsVendorRadioButtons": [
        {
            "test": paramsObj => requiredRadioButton(paramsObj),
            "message": "You must choose one vendor delivery option.",
            "focus": "deliveryDetailsVendorRadioButtons-legend"
        }
    ],
    "deliveryDetailsProcessorRadioButtons": [
        {
            "test": paramsObj => requiredRadioButton(paramsObj),
            "message": "You must choose one processor delivery option.",
            "focus": "deliveryDetailsProcessorRadioButtons-legend"
        }
    ],
}