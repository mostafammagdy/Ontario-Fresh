import { KEYS } from './constants-unmutables'

/*
    NOTE: trapFocus and undoTrapFocus methods adapted from here:
    https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
*/

let closeButton = ''
let firstFocusableEl = null
let lastFocusableEl = null

function dialogCustomKeydownEvents(event) {
    if (event.key === 'Escape' || event.keyCode === KEYS.esc) {
        let mouseClick = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        })
        document.getElementById(closeButton).dispatchEvent(mouseClick)
        event.preventDefault()
    } else if (event.key === 'Tab' || event.keyCode === KEYS.tab) {
        if (event.shiftKey) /* shift + tab */ {
            /*
            console.log('%c TAB BACKWARD:', 'color: blue; font-weight: bold; font-style: italic;')
            console.log({ activeElement: document.activeElement, isFirstFocusableEl: document.activeElement === firstFocusableEl })
            */
            if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus()
                event.preventDefault()
            }
        } else /* tab */ {
            /*
            console.log('%c TAB FORWARD:', 'color: purple; font-weight: bold; font-style: italic;')
            console.log({ activeElement: document.activeElement, isLastFocusableEl: document.activeElement === lastFocusableEl })
            */
            if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus()
                event.preventDefault()
            }
        }
    }
}

export function undoTrapFocus(dialogContainer) {
    document.getElementById(dialogContainer).removeEventListener('keydown', dialogCustomKeydownEvents)
}

export function trapFocus(dialogContainer, elementsToReceiveFocus, closeButtonId) {
    const targetElement = document.getElementById(dialogContainer)
    const focusableEls = targetElement.querySelectorAll(elementsToReceiveFocus)
    /*
    console.log('%c focusableEls:', 'color: red; font-weight: bold;')
    console.log(focusableEls)
    */
    closeButton = closeButtonId
    firstFocusableEl = focusableEls[0]
    lastFocusableEl = focusableEls[focusableEls.length - 1]
    targetElement.addEventListener('keydown', dialogCustomKeydownEvents)
}