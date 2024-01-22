import React from 'react'
import PropTypes from 'prop-types'
import { AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion'

import FormFileUploader from '../FormFileUploader'
import FormManageAttachments from '../FormManageAttachments'

const FormAttachmentsAccordionItem = props => {
    const {
        heading,
        intro,
        client,
        ids,
        attachmentFormId,
        attachmentFormLabel,
        attachmentFormTooltip,
        currentTooltip,
        setCurrentTooltip,
        validateAttachmentUploadForm,
        attachments,
        setAttachments,
        attachmentsFormErrorMessage,
        setAttachmentsFormErrorMessage,
        attachmentsFormValidated,
        setAttachmentsFormValidated,
        chooseFileButtonValue,
        attachmentFormSubmitValue,
        acceptFileTypes,
        aspect,

        manageAttachmentsFormId,
        manageAttachmentsFormLegend,
        validateManageAttachmentsForm,
        selectedAttachments,
        setSelectedAttachments,
        selectedAttachmentsFormErrorMessage,
        setSelectedAttachmentsFormErrorMessage,
        selectedAttachmentsFormValidated,
        setSelectedAttachmentsFormValidated,
        manageAttachmentsSubmitValue,
        usersProfiles
    } = props
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton>{heading}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                {
                    intro &&
                        intro.map((para, i) => {
                            return (
                                <p key={`introPara-${i}`}>{para}</p>
                            )
                        })
                }
                <FormFileUploader
                    client={client}
                    ids={ids}
                    formId={attachmentFormId}
                    label={attachmentFormLabel}
                    tooltip={attachmentFormTooltip}
                    currentTooltip={currentTooltip}
                    setCurrentTooltip={setCurrentTooltip}
                    validateForm={validateAttachmentUploadForm}
                    attachments={attachments}
                    setAttachments={setAttachments}
                    formErrorMessage={attachmentsFormErrorMessage}
                    setFormErrorMessage={setAttachmentsFormErrorMessage}
                    formValidatedMessage={attachmentsFormValidated}
                    setFormValidatedMessage={setAttachmentsFormValidated}
                    setSiblingFormErrorMessage={setSelectedAttachmentsFormErrorMessage}
                    setSiblingFormValidatedMessage={setSelectedAttachmentsFormValidated}
                    chooseFileButtonValue={chooseFileButtonValue}
                    submitValue={attachmentFormSubmitValue}
                    acceptFileTypes={acceptFileTypes}
                    aspect={aspect}
                />
                {
                    !!manageAttachmentsFormId &&
                        <FormManageAttachments
                            client={client}
                            ids={ids}
                            formId={manageAttachmentsFormId}
                            legend={manageAttachmentsFormLegend}
                            validateForm={validateManageAttachmentsForm}
                            attachments={attachments}
                            setAttachments={setAttachments}
                            selectedAttachments={selectedAttachments}
                            setSelectedAttachments={setSelectedAttachments}
                            formErrorMessage={selectedAttachmentsFormErrorMessage}
                            setFormErrorMessage={setSelectedAttachmentsFormErrorMessage}
                            formValidatedMessage={selectedAttachmentsFormValidated}
                            setFormValidatedMessage={setSelectedAttachmentsFormValidated}
                            setSiblingFormErrorMessage={setAttachmentsFormErrorMessage}
                            setSiblingFormValidatedMessage={setAttachmentsFormValidated}
                            submitValue={manageAttachmentsSubmitValue}
                            usersProfiles={usersProfiles}
                        />
                }
            </AccordionItemPanel>
        </AccordionItem>
    )
}

FormAttachmentsAccordionItem.defaultName = 'FormAttachmentsAccordionItem'

FormAttachmentsAccordionItem.defaultProps = {
    aspect: 1 / 1
}

FormAttachmentsAccordionItem.propTypes = {
    heading: PropTypes.string.isRequired,
    intro: PropTypes.arrayOf(PropTypes.string),
    attachmentFormId: PropTypes.string.isRequired,
    attachmentFormLabel: PropTypes.string.isRequired,
    attachmentFormTooltip: PropTypes.string,
    currentTooltip: PropTypes.string,
    setCurrentTooltip: PropTypes.func,
    validateAttachmentUploadForm: PropTypes.func.isRequired,
    attachments: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    setAttachments: PropTypes.func.isRequired,
    attachmentsFormErrorMessage: PropTypes.string.isRequired,
    setAttachmentsFormErrorMessage: PropTypes.func.isRequired,
    attachmentsFormValidated: PropTypes.string,
    setAttachmentsFormValidated: PropTypes.func,
    chooseFileButtonValue: PropTypes.string.isRequired,
    attachmentFormSubmitValue: PropTypes.string,
    acceptFileTypes: PropTypes.oneOf([
        'documents',
        'images'
    ]).isRequired,
    aspect: PropTypes.number.isRequired,
    manageAttachmentsFormId: PropTypes.string,
    manageAttachmentsFormLegend: PropTypes.string,
    validateManageAttachmentsForm: PropTypes.func,
    selectedAttachments: PropTypes.object,
    setSelectedAttachments: PropTypes.func,
    selectedAttachmentsFormErrorMessage: PropTypes.string,
    setSelectedAttachmentsFormErrorMessage: PropTypes.func,
    selectedAttachmentsFormValidated: PropTypes.string,
    setSelectedAttachmentsFormValidated: PropTypes.func,
    manageAttachmentsSubmitValue: PropTypes.string,
    usersProfiles: PropTypes.arrayOf(PropTypes.string)
}

export default FormAttachmentsAccordionItem