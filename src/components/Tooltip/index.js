import React, { useRef, useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.scss'
import './styles.scss'

import { undoTrapFocus, trapFocus } from '../../utils/dialog-keydown-events'

import CloseButton from '../../assets/images/components/CloseButton'

const ELEMENTS_TO_RECEIVE_FOCUS = 'div[tabindex="0"], button:not([disabled]), a'

const Tooltip = props => {
    const { id, tip, currentTooltip, setCurrentTooltip, tooltipOffsetElementId } = props
    const tooltipLaunch = useRef(null)
    const tooltipContainer = useRef(null)
    const tooltipContent = useRef(null)
    const [ windowWidth, setWindowWidth ] = useState(0)
    /*
    console.log('%c windowWidth:', 'color: red; font-weight: bold;')
    console.log({ windowWidth })
    */

    const positionTooltip = () => {
        if (tooltipContainer.current) {
            /*
            console.log('%c window.innerWidth:', 'color: red; font-weight: bold;')
            console.log(window.innerWidth)
            */
            const tt = tooltipContainer.current
            if (tt.classList.contains('tooltip__tip--offsetLeft'))
                tt.classList.remove('tooltip__tip--offsetLeft')
            if (tt.classList.contains('tooltip__tip--offsetRight'))
                tt.classList.remove('tooltip__tip--offsetRight')
            setWindowWidth(window.innerWidth)
            /*
            console.log('%c windowWidth, window.innerWidth:', 'color: purple; font-weight: bold;')
            console.log({ windowWidth, innerWidth: window.innerWidth })
            */
            const trueWindowWidth = windowWidth > 0 ? windowWidth : window.innerWidth
            const ttWidth = tt.offsetWidth
            /*
            console.log('%c ttWidth:', 'color: blue; font-weight: bold;')
            console.log({ ttWidth })
            */
            const ttOffset = tt.getBoundingClientRect()
            const ttOffsetLeft = ttOffset.left
            const ttOffsetRight = trueWindowWidth - (ttWidth + ttOffsetLeft)
            /*
            console.log('%c trueWindowWidth - (ttWidth + ttOffsetLeft):', 'color: red; font-weight: bold;')
            console.log({ equation: `${trueWindowWidth} - (${ttWidth} + ${ttOffsetLeft})`, answer: trueWindowWidth - (ttWidth + ttOffsetLeft) })
            console.log('%c ttOffsetLeft, ttOffsetRight:', 'color: green; font-weight: bold;')
            console.log({ ttOffsetLeft, ttOffsetRight })
            */
            const ttParentHorizontalOffset = document.getElementById(tooltipOffsetElementId).getBoundingClientRect().left
            /*
            console.log('%c ttParentHorizontalOffset:', 'color: lime; font-weight: bold;')
            console.log({ ttParentHorizontalOffset })
            */
            if ((ttOffsetLeft < ttOffsetRight) && (ttOffsetLeft < ttParentHorizontalOffset)) {
                tt.classList.add('tooltip__tip--offsetLeft')
                return
            }
            if ((ttOffsetRight < ttOffsetLeft) && (ttOffsetRight < ttParentHorizontalOffset)) {
                tt.classList.add('tooltip__tip--offsetRight')
                return
            }
        }
    }

    const openTooltip = event => {
        event.preventDefault()
        setCurrentTooltip(`tt_${id}-tt`)
        setTimeout(() => {
            tooltipContent.current.focus()
            trapFocus(`tt_${id}-tt`, ELEMENTS_TO_RECEIVE_FOCUS, `tt_${id}-tt-close`)
            positionTooltip()
        }, 1)
    }

    const closeTooltip = event => {
        event.preventDefault()
        undoTrapFocus(`tt_${id}-tt`)
        setCurrentTooltip('')
        tooltipLaunch.current.focus()
    }

    const focusOutTooltip = event => {
        event.preventDefault()
        setTimeout(() => {
            if (tooltipContainer.current && !tooltipContainer.current.contains(document.activeElement)) {
                undoTrapFocus(`tt_${id}-tt`)
                setCurrentTooltip('')
            }
        }, 1);
    }

    useLayoutEffect(() => {
        setWindowWidth(window.innerWidth)
        window.addEventListener('resize', positionTooltip)
        return () => {
            window.removeEventListener('resize', positionTooltip)
        }
    }, [])

    return (
        <div className={`tooltip__wrapper ${styles.tooltip__wrapper}`}>
            <button
                className={`tooltip__launch ${styles.tooltip__launch}`}
                id={`${id}-tt`}
                ref={tooltipLaunch}
                onClick={e => openTooltip(e)}
                aria-labelledby={`${id}-tt-label`}
                aria-expanded={currentTooltip === `tt_${id}-tt`}
                aria-controls={`tt_${id}-tt`}
            >
                <span
                    className={`tooltip__launch__icon ${styles.tooltip__launch__icon}`}
                    aria-hidden='true'
                >
                    ?
                </span>
                <p
                    className={`tooltip__label ${styles.tooltip__label}`}
                    id={`${id}-tt-label`}
                    aria-hidden={true}
                    focusable={false}
                >
                    Open the tooltip.
                </p>
            </button>
            {
                currentTooltip === `tt_${id}-tt` &&
                    <div
                        className={`tooltip__tip ${styles.tooltip__tip}`}
                        id={`tt_${id}-tt`}
                        ref={tooltipContainer}
                        onBlur={e => focusOutTooltip(e)}
                        aria-hidden={true}
                        role='region'
                    >
                        <div
                            ref={tooltipContent}
                            tabIndex='0'
                        >
                            <p
                                className={`tooltip__tip__p ${styles.tooltip__tip__p}`}
                                dangerouslySetInnerHTML={{
                                    __html: tip
                                }}
                            />
                        </div>
                        <button
                            className={`tooltip__tip__close ${styles.tooltip__tip__close}`}
                            id={`tt_${id}-tt-close`}
                            onClick={e => closeTooltip(e)}
                            aria-labelledby={`tt_${id}-tt-close-label`}
                        >
                            <CloseButton />
                            <p
                                className={`tooltip__label ${styles.tooltip__label}`}
                                id={`tt_${id}-tt-close-label`}
                                aria-hidden={true}
                                focusable={false}
                            >
                                Close the tooltip.
                            </p>
                        </button>
                        <div className={`tooltip__tip__arrow ${styles.tooltip__tip__arrow}`}>&nbsp;</div>
                    </div>
            }
        </div>
    )
}

Tooltip.defaultName = 'Tooltip'

Tooltip.defaultProps = {
    tip: 'This will be the tooltip’s message.'
}

Tooltip.propTypes = {
    id: PropTypes.string.isRequired,
    tip: PropTypes.string.isRequired,
    currentTooltip: PropTypes.string.isRequired,
    setCurrentTooltip: PropTypes.func.isRequired,
    tooltipOffsetElementId: PropTypes.string.isRequired
}

export default Tooltip