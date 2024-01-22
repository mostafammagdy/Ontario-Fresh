import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// import styles from './styles.module.scss'
import './styles.scss'

import CloseButton from '../../assets/images/components/CloseButton'

import { undoTrapFocus, trapFocus } from '../../utils/dialog-keydown-events'

import DialogComingSoon from '../DialogComingSoon'

const closeDialogWindow = (dialogContainer, setDialogVisible, focusOnClose) => {
    undoTrapFocus(dialogContainer)
    setDialogVisible(false)
    document.getElementById(focusOnClose).focus()
}

const DialogContainer = props => {
    const { localStorageVariable, setDialogVisible, dialogContainer, elementsToReceiveFocus, closeButton, focusOnClose } = props
    const addDomNodeInsertedEventListener = event => trapFocus(dialogContainer, elementsToReceiveFocus, closeButton)
    useEffect(() => {
        document.addEventListener('DOMContentLoaded', trapFocus(dialogContainer, elementsToReceiveFocus, closeButton))
        document.addEventListener('DOMNodeInserted', addDomNodeInsertedEventListener)
        return () => {
            document.removeEventListener('DOMContentLoaded', trapFocus)
            document.removeEventListener('DOMNodeInserted', addDomNodeInsertedEventListener)
        }
    }, [])
    return (
        <div className='dialogContainer'>
            <div
                className='dialogContainer__background'
                onClick={() => closeDialogWindow(dialogContainer, setDialogVisible, focusOnClose)}
            >
            {/*
            <div
                className='dialogContainer__background'
            >
            */}
                &nbsp;
            </div>
            <div
                className='dialogContainer__dialog'
                id={dialogContainer}
                role='dialog'
            >
                {
                    dialogContainer === 'comingSoonDialogContainer' &&
                        <DialogComingSoon
                            localStorageVariable={localStorageVariable}
                            undoTrapFocus={undoTrapFocus}
                            dialogContainer={dialogContainer}
                            setDialogVisible={setDialogVisible}
                        />
                }
                {/*
                */}
                <button
                    className='dialogContainer__dialog__button__close'
                    id={closeButton}
                    aria-labelledby='comingSoonDialog__container__button__close--label'
                    aria-describedby='comingSoonDialog__container__button__close--desc'
                    onClick={() => closeDialogWindow(dialogContainer, setDialogVisible, focusOnClose)}
                >
                    <CloseButton />
                    <p
                        className='dialogContainer__dialog__button__close__paragraph'
                        id='comingSoonDialog__container__button__close--label'
                        aria-hidden='true'
                    >
                        Close dialog
                    </p>
                    <p
                        className='dialogContainer__dialog__button__close__paragraph'
                        id='comingSoonDialog__container__button__close--desc'
                        aria-hidden='true'
                    >
                        Select this button to close the dialog window.
                    </p>
                </button>
            </div>
        </div>
    )
}

DialogContainer.defaultName = 'DialogContainer'

DialogContainer.defaultProps = {
    focusOnClose: 'headerLogo'
}

DialogContainer.propTypes = {
    localStorageVariable: PropTypes.string,
    setDialogVisible: PropTypes.func.isRequired,
    dialogContainer: PropTypes.string.isRequired,
    elementsToReceiveFocus: PropTypes.string.isRequired,
    closeButton: PropTypes.string.isRequired,
    focusOnClose: PropTypes.string
}

export default DialogContainer