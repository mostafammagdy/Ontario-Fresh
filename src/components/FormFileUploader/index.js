import React, { useState, useRef, useCallback, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactCrop from 'react-image-crop'

import 'react-image-crop/lib/ReactCrop.scss'
import styles from './styles.module.scss'
import './styles.scss'

import { focusError } from '../../utils/form-focus-error'
import { DEFAULT_MAX_FILE_SIZE_IN_BYTES, FILE_UPLOAD_FORMATS } from '../../utils/constants-unmutables'
import { getCurrentBreakpoint } from '../../utils/get-current-breakpoint'

import FormErrorMessage from '../FormErrorMessage'
import Tooltip from '../Tooltip'
import DragAndDrop from '../../assets/images/components/DragAndDrop'

const FormFileUploader = props => {
    const {
        client,
        ids,
        formId,
        label,
        tooltip,
        currentTooltip,
        setCurrentTooltip,
        validateForm,
        attachments,
        setAttachments,
        formErrorMessage,
        setFormErrorMessage,
        formValidatedMessage,
        setFormValidatedMessage,
        setSiblingFormErrorMessage,
        setSiblingFormValidatedMessage,
        chooseFileButtonValue,
        submitValue,
        acceptFileTypes,
        aspect
    } = props
    console.log('%c aspect:', 'color: red; font-weight: bold;')
    console.log({ aspect })
    const [ upImg, setUpImg ] = useState()
    const [ crop, setCrop ] = useState({ unit: '%', width: 300, aspect })
    const [ completedCrop, setCompletedCrop ] = useState(null)
    const fileInput = useRef(null)
    const imgRef = useRef(null)
    const previewCanvasRef = useRef(null)

    const onSelectFile = event => {
        /*
        console.log('%c onSelectFile file size:', 'color: red; font-weight: bold;')
        console.log({ fileSize: event.target.files[0].size })
        */
        const fileSize = event.target.files[0].size
        if (fileSize > DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
            setFormErrorMessage('You must choose an image that is less than 5 megabytes in file size.')
            document.getElementById(`${formId}-fileInput`).value = ''
            setUpImg()
            setCompletedCrop(null)
            !!setFormValidatedMessage &&
                setFormValidatedMessage('')
            !!setSiblingFormErrorMessage &&
                setFormValidatedMessage('')
            !!setSiblingFormValidatedMessage &&
                setFormValidatedMessage('')
            setTimeout(() => {
                document.getElementById(`${formId}-errorMessage`).focus()
            }, 1)
            return
        }
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener('load', () => setUpImg(reader.result))
            reader.readAsDataURL(event.target.files[0])
        }
    }

    const onLoad = useCallback(img => {
        imgRef.current = img
    }, [])

    const imagesUploader = acceptFileTypes === 'images'

    if (imagesUploader) {
        useEffect(() => {
            if (!completedCrop || !previewCanvasRef.current || !imgRef.current)
                return

            const image = imgRef.current
            const canvas = previewCanvasRef.current
            const crop = completedCrop

            const scaleX = image.naturalWidth / image.width
            const scaleY = image.naturalHeight / image.height
            const ctx = canvas.getContext('2d')
            const pixelRatio = window.devicePixelRatio

            canvas.width = crop.width * pixelRatio
            canvas.height = crop.height * pixelRatio

            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
            ctx.imageSmoothingQuality = 'high'

            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            )
        }, [ completedCrop ])
    }

    return (
        <div>
            <form
                className={`formFileUploader ${styles.formFileUploader}`}
                id={formId}
                onSubmit={e => {
                    if (imagesUploader && !setSiblingFormErrorMessage)
                        validateForm(e, completedCrop, previewCanvasRef, setFormErrorMessage, setAttachments, setUpImg, setCompletedCrop, formId, client, ids)
                    else
                        validateForm(e, completedCrop, previewCanvasRef, attachments, setAttachments, setFormErrorMessage, setFormValidatedMessage, setSiblingFormErrorMessage, setSiblingFormValidatedMessage, setUpImg, setCompletedCrop, formId, client, ids)
                }}
            >
                {
                    !!formErrorMessage &&
                        <p className={`formFileUploader__errorParagraph ${styles.formFileUploader__errorParagraph}`}>
                            <a
                                href={`#${formId}-fileInput`}
                                className={`formFileUploader__errorAnchor ${styles.formFileUploader__errorAnchor}`}
                                id={`${formId}-errorMessage`}
                                onClick={e => focusError(e, `${formId}-fileInput`)}
                            >
                                {formErrorMessage}
                            </a>
                            
                        </p>
                }
                {
                    !!formValidatedMessage &&
                        <p
                            className={`formFileUploader__validated ${styles.formFileUploader__validated}`}
                            id={`${formId}-validatedMessage`}
                            tabIndex='-1'
                        >
                            {formValidatedMessage}
                        </p>
                }
                <div className={tooltip ? styles.formFileUploader__labelTooltip : null}>
                    <div className={tooltip ? styles.formFileUploader__labelTooltip__labelWrapper : null}>
                        <label
                            className={`formFileUploader__label ${styles.formFileUploader__label}`}
                            htmlFor={`${formId}-fileInput`}
                        >
                            {`${label}:`}
                        </label>
                        {
                            tooltip &&
                                <Tooltip
                                    id={`${formId}-fileInput-tooltip`}
                                    tip={tooltip}
                                    currentTooltip={currentTooltip}
                                    setCurrentTooltip={setCurrentTooltip}
                                    tooltipOffsetElementId={formId}
                                />
                        }
                    </div>
                </div>
                <div className={`formFileUploader__dragDropArea ${styles.formFileUploader__dragDropArea}`}>
                    {/*
                        What you’re going to do is style the file input directly over top 
                        of the <button> and set its opacity to “0”. This will enable 
                        drag and drop.
                    */}
                    <div className={`formFileUploader__dragDropArea__icon ${styles.formFileUploader__dragDropArea__icon}`}>
                        <DragAndDrop />
                    </div>
                    <input
                        type='file'
                        ref={fileInput}
                        className={`formFileUploader_dragDrop ${styles.formFileUploader__dragDrop}`}
                        id={`${formId}-fileInput`}
                        accept={FILE_UPLOAD_FORMATS[acceptFileTypes]}
                        title=''
                        onChange={e => {
                            if (imagesUploader)
                                onSelectFile(e)
                            else
                                validateForm(e, document.getElementById(`${formId}-fileInput`).files[0], attachments, setAttachments, setFormErrorMessage, setFormValidatedMessage, setSiblingFormErrorMessage, setSiblingFormValidatedMessage, formId, client, ids)
                        }}
                        aria-describedby={formErrorMessage ? `${formId}-fileInput-desc` : null}
                    />
                    <button
                        className={`formFileUploader__dragDropArea__button ${styles.formFileUploader__dragDropArea__button}`}
                        type='button'
                        onClick={() => fileInput.current.click()}
                    >
                        <span
                            className={`formFileUploader__dragDropArea__button__label ${styles.formFileUploader__dragDropArea__button__label}`}
                            dangerouslySetInnerHTML={{ __html: chooseFileButtonValue }}
                        />
                    </button>
                </div>
                {
                    formErrorMessage &&
                        <FormErrorMessage
                            id={`${formId}-fileInput`}
                            errorMessage={formErrorMessage}
                        />
                }
                {
                    imagesUploader &&
                        <Fragment>
                            <div className={`formFileUploader__imageCropArea ${styles.formFileUploader__imageCropArea}`}>
                                <div className={`formFileUploader__imageCropArea__wrapper ${styles.formFileUploader__imageCropArea__wrapper}`}>
                                    <ReactCrop
                                        src={upImg}
                                        onImageLoaded={onLoad}
                                        crop={crop}
                                        onChange={(c) => setCrop({ ...c, aspect })}
                                        onComplete={(c) => setCompletedCrop(c)}
                                        keepSelection={true}
                                    />
                                </div>
                                <div>
                                    <canvas
                                        ref={previewCanvasRef}
                                        // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                                        style={{
                                            width: completedCrop?.width > 0 && getCurrentBreakpoint() === 'desktop' ?
                                                    414
                                                : completedCrop?.width > 0 && getCurrentBreakpoint() === 'tablet' ?
                                                        318
                                                    : completedCrop?.width > 0 && getCurrentBreakpoint() === 'smartphone' ?
                                                            269
                                                        : 0
                                        }}
                                    />
                                </div>
                            </div>
                            <input
                                className={`formFileUploader__button ${styles.formFileUploader__button}`}
                                type='submit'
                                value={submitValue}
                            />
                        </Fragment>
                }
            </form>
            {
                imagesUploader && !!attachments && !setSiblingFormErrorMessage &&
                    <Fragment>
                        <p
                            className={`formFileUploader__validated ${styles.formFileUploader__validated}`}
                            id={`${formId}-currentLogoPhoto`}
                            tabIndex='-1'
                        >
                            This is your current company photo:
                        </p>
                        <ul className={`formFileUploader__currentLogoPhoto ${styles.formFileUploader__currentLogoPhoto}`}>
                            <li className={`formFileUploader__currentLogoPhoto__li ${styles.formFileUploader__currentLogoPhoto__li}`}>
                                <img
                                    src={attachments}
                                    alt=''
                                    className={`formFileUploader__currentLogoPhoto__li__img ${styles.formFileUploader__currentLogoPhoto__li__img}`}
                                />
                            </li>
                        </ul>
                    </Fragment>
            }
        </div>
    )
}

FormFileUploader.defaultName = 'FormFileUploader'

FormFileUploader.propTypes = {
    formId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
    currentTooltip: PropTypes.string,
    setCurrentTooltip: PropTypes.func,
    validateForm: PropTypes.func.isRequired,
    attachments: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    setAttachments: PropTypes.func.isRequired,
    formErrorMessage: PropTypes.string.isRequired,
    setFormErrorMessage: PropTypes.func.isRequired,
    formValidatedMessage: PropTypes.string,
    setFormValidatedMessage: PropTypes.func,
    setSiblingFormErrorMessage: PropTypes.func,
    setSiblingFormValidatedMessage: PropTypes.func,
    chooseFileButtonValue: PropTypes.string.isRequired,
    submitValue: PropTypes.string,
    acceptFileTypes:PropTypes.oneOf([
        'documents',
        'images'
    ]).isRequired,
    aspect: PropTypes.number.isRequired
}

export default FormFileUploader