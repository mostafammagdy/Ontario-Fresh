import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import './styles.scss'
import styles from './styles.module.scss'

import { focusError } from '../../utils/form-focus-error'
import { PROFILES } from '../../utils/constants-unmutables'

import FormProfilePhotoGalleryCheckboxes from '../FormProfilePhotoGalleryCheckboxes'
import FormCheckbox from '../FormCheckboxesGroup/FormCheckbox'
import FormErrorMessage from '../FormErrorMessage'

const FormManageAttachments = props => {
    const {
        client,
        ids,
        formId,
        legend,
        validateForm,
        attachments,
        setAttachments,
        selectedAttachments,
        setSelectedAttachments,
        formErrorMessage,
        setFormErrorMessage,
        formValidatedMessage,
        setFormValidatedMessage,
        setSiblingFormErrorMessage,
        setSiblingFormValidatedMessage,
        submitValue,
        usersProfiles
    } = props
    return (
        <form
            className={`formManageAttachments`}
            id={formId}
            noValidate
            onSubmit={e => validateForm(e, attachments, setAttachments, selectedAttachments, setSelectedAttachments, setFormErrorMessage, setFormValidatedMessage, setSiblingFormErrorMessage, setSiblingFormValidatedMessage, formId, client, ids)}
        >
            {
                !!formErrorMessage &&
                    <p className={`formManageAttachments__errorParagraph ${styles.formManageAttachments__errorParagraph}`}>
                        <a
                            href={`#${formId}-legend`}
                            className={`formManageAttachments__errorAnchor ${styles.formManageAttachments__errorAnchor}`}
                            id={`${formId}-errorMessage`}
                            onClick={e => focusError(e, `${formId}-legend`)}
                        >
                            {formErrorMessage}
                        </a>
                    </p>
            }
            {
                !!formValidatedMessage &&
                    <p
                        className={`formManageAttachments__validated ${styles.formManageAttachments__validated}`}
                        id={`${formId}-validatedMessage`}
                        tabIndex='-1'
                    >
                        {formValidatedMessage}
                    </p>
            }
            {
                attachments.length > 0 &&
                    <Fragment>
                        <fieldset className={`formManageAttachments__fieldset ${styles.formManageAttachments__fieldset}`}>
                            <legend
                                className={`formManageAttachments__legend ${styles.formManageAttachments__legend}`}
                                id={`${formId}-legend`}
                                tabIndex='-1'
                            >
                                {legend}
                            </legend>
                            <ul className={`formManageAttachments__list ${styles.formManageAttachments__list}`}>
                            {
                                attachments.map((atta, i) => {
                                    /*
                                    console.log('%c atta:', 'color: purple; font-weight: bold;')
                                    console.log({ atta })
                                    */
                                    return (
                                        <li
                                            key={`deleteProfileAttachment-${i}`}
                                            className={`formManageAttachments__li ${styles.formManageAttachments__li}`}
                                        >
                                            <div className='formManageAttachments__wrapper'>
                                                {
                                                    !!atta.src &&
                                                        <Fragment>
                                                            <img
                                                                src={atta.src}
                                                                alt=''
                                                                className={`formManageAttachments__thumbnail ${styles.formManageAttachments__thumbnail}`}
                                                            />
                                                            {/*
                                                                <FormProfilePhotoGalleryCheckboxes
                                                                    imageId={atta.id}
                                                                    imageName={atta.name}
                                                                    usersProfiles={usersProfiles}
                                                                    parentAttachments={attachments}
                                                                    setParentAttachments={setAttachments}
                                                                    formId={formId}
                                                                />
                                                            */}
                                                        </Fragment>
                                                }
                                                {
                                                    !atta.src &&
                                                        // <span>{`${atta.name}${!!atta.size ? ' | ' + atta.size * 0.001 + ' kb.' : ''}`}</span>
                                                        <span>{`${atta.name}`}</span>
                                                }
                                                <FormCheckbox
                                                    label={`Delete ${!!atta.src ? 'image' : 'file'}`}
                                                    value={atta.id}
                                                    checkboxState={selectedAttachments}
                                                    setCheckboxState={setSelectedAttachments}
                                                    errorMessage={formErrorMessage}
                                                    descriptionId={`${formId}-checkbox`}
                                                    formId={formId}
                                                />
                                            </div>
                                        </li>
                                    )
                                })
                            }
                            </ul>
                            {
                                formErrorMessage &&
                                    <FormErrorMessage
                                        id={`${formId}-checkbox`}
                                        errorMessage={formErrorMessage}
                                    />
                            }
                        </fieldset>
                        <input
                            className={`formManageAttachments__button ${styles.formManageAttachments__button}`}
                            type='submit'
                            value={submitValue}
                        />
                    </Fragment>
            }
            
        </form>
    )
}

FormManageAttachments.defaultName = 'FormManageAttachments'

FormManageAttachments.defaultProps = {}

FormManageAttachments.propTypes = {}

export default FormManageAttachments