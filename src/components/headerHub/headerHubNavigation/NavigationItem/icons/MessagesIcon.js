import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import styles from './styles.module.scss'
import './styles.scss'

const MessagesIcon = props => {
    const { messages } = props

    /*
    console.log('%c messages:', 'color: lavender; font-weight: bold;')
    console.log({ messages })
    */

    return (
        <span className={`${styles.headerHub__icon} headerHub__icon`}>
            <span className={`${styles.headerHub__circle} headerHub__circle`}>
                <em className={`${styles.headerHub__messageCounter} headerHub__messageCounter`}>{`${(messages.unread && messages.unread.conversations_count) || 0}`}</em>
            </span>
        </span>
    )
}

MessagesIcon.defaultName = 'MessagesIcon'

MessagesIcon.defaultProps = {}

MessagesIcon.propTypes = {}

const mapStateToProps = state => ({
  messages: state.messages,
})

export default connect(mapStateToProps)(MessagesIcon)