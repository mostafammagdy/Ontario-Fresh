class FormValidationGlobalMutables {

    constructor() {
        /**
         * @global Holds an array of objects that make up the content for a form’s error list. This array works in conjunction with formInputValidationTestsRunner() and validateForm(), and must be global to those two functions.
         */
        this.messageList = []
    }
    
}

export default new FormValidationGlobalMutables()