import { selectedCheckboxMaximum } from '../../../utils/form-input-validation-tests'

/**
 * PUBLIC_VENDOR_PROFILE_HIGHLIGHTS_FORM_INPUT_VALIDATION_SETTINGS contains the settings specific to each group of inputs in the form that need to be validated. This object works in conjunction with FORM_INPUT_VALIDATION_TESTS, messageList[], formInputValidationTestsRunner() and validateForm().
 * 
 * Make sure that when you add a new error property, you give it a key that matches the ID of the form’s input or input group that you want to validate. The “focus” property is the ID of the page element you want to focus when the error message is selected by the user.
 */
export const PROCESSOR_SPECIFIC_DETAILS_FORM_INPUT_VALIDATION_SETTINGS = {
    "processingVolumesCheckboxes": [
        {
            "test": paramsObj => selectedCheckboxMaximum(paramsObj),
            "message": "You can only choose one processing volume option.",
            "focus": "processingVolumesCheckboxes-legend"
        }
    ],
    "coPackingServicesCheckboxes": [
        {
            "test": paramsObj => selectedCheckboxMaximum(paramsObj),
            "message": "You can only choose one co-packing service option.",
            "focus": "coPackingServicesCheckboxes-legend"
        }
    ],
    "privateLabelServicesCheckboxes": [
        {
            "test": paramsObj => selectedCheckboxMaximum(paramsObj),
            "message": "You can only choose one private label service option.",
            "focus": "privateLabelServicesCheckboxes-legend"
        }
    ],
    "customProcessTakeSpecialOrdersCheckboxes": [
        {
            "test": paramsObj => selectedCheckboxMaximum(paramsObj),
            "message": "You can only choose one custom process or take special order option.",
            "focus": "customProcessTakeSpecialOrdersCheckboxes-legend"
        }
    ],
    "thirdPartyLiabilityInsuranceCheckboxes": [
        {
            "test": paramsObj => selectedCheckboxMaximum(paramsObj),
            "message": "You can only choose one third party liability insurance option.",
            "focus": "thirdPartyLiabilityInsuranceCheckboxes-legend"
        }
    ],
}