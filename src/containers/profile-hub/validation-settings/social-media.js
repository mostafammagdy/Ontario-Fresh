import { validWebsiteAddress, validFacebookAddress, validInstagramUsername, validTwitterUsername, validLinkedInAddress, validYouTubeAddress } from '../../../utils/form-input-validation-tests'

/**
 * SOCIAL_MEDIA_FORM_INPUT_VALIDATION_SETTINGS contains the settings specific to each group of inputs in the form that need to be validated. This object works in conjunction with FORM_INPUT_VALIDATION_TESTS, messageList[], formInputValidationTestsRunner() and validateForm().
 * 
 * Make sure that when you add a new error property, you give it a key that matches the ID of the form’s input or input group that you want to validate. The “focus” property is the ID of the page element you want to focus when the error message is selected by the user.
 */
export const SOCIAL_MEDIA_FORM_INPUT_VALIDATION_SETTINGS = {
    "website": [
        {
            "test": paramsObj => validWebsiteAddress(paramsObj),
            "message": "You must provide a valid website address formatted in the following manner: https://www.yoursite.ca",
            "focus": "website"
        }
    ],
    "onlineStore": [
        {
            "test": paramsObj => validWebsiteAddress(paramsObj),
            "message": "You must provide a valid online store address formatted in the following manner: https://www.yoursite.ca",
            "focus": "onlineStore"
        }
    ],
    "facebook": [
        {
            "test": paramsObj => validFacebookAddress(paramsObj),
            "message": "You must provide a valid Facebook address formatted in the following manner: https://www.facebook.com/yourpage",
            "focus": "facebook"
        }
    ],
    "instagram": [
        {
            "test": paramsObj => validInstagramUsername(paramsObj),
            "message": "You must provide a valid Instagram username formatted in the following manner: @yourbusiness",
            "focus": "instagram"
        }
    ],
    "twitter": [
        {
            "test": paramsObj => validTwitterUsername(paramsObj),
            "message": "You must provide a valid Twitter username formatted in the following manner: @yourbusiness",
            "focus": "twitter"
        }
    ],
    "linkedIn": [
        {
            "test": paramsObj => validLinkedInAddress(paramsObj),
            "message": "You must provide a valid LinkedIn address formatted in the following manner: https://www.linkedin.com/yourpage",
            "focus": "linkedIn"
        }
    ],
    "youTube": [
        {
            "test": paramsObj => validYouTubeAddress(paramsObj),
            "message": "You must provide a valid YouTube address formatted in the following manner: https://www.youtube.com/yourchannel",
            "focus": "youTube"
        }
    ]
}