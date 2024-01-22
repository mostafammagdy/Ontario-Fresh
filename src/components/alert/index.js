import React from 'react'
import { PropTypes } from 'prop-types'
import Paper from 'material-ui/Paper'
import { assign } from 'lodash'
import isStringLike from '../utils/is-string-like'

import * as colors from 'material-ui/styles/colors'

import styles from './styles.module.scss'

const colorStyles = {
  success: {
    backgroundColor: colors.green100,
    color: colors.green900,
  },
  info: {
    backgroundColor: '#039BE5',
    color: '#FFFFFF',
  },
  warning: {
    backgroundColor: '#F1C40F',
    color: colors.grey900,
  },
  error: {
    backgroundColor: '#F1453D',
    color: '#FFFFFF',
  },
}

const defaultColorStyle = {
  backgroundColor: colors.grey100,
  color: colors.grey900,
}

function Alert({ style, primaryText, secondaryText, children, type, zDepth, primaryIcon }) {
  return (
    <Paper
      className={styles.alert}
      style={assign({},
        { padding: '1rem',
          marginTop: '1rem' },
        defaultColorStyle,
        colorStyles[type],
        style
      )}
      zDepth={zDepth}
    >
      {
        isStringLike(primaryText) ?
          <h5 style={{ textTransform: 'uppercase' }}>
            {
              primaryIcon && React.cloneElement(primaryIcon, {
                style: {
                  marginRight: '0.5rem',
                },
                color: assign({}, defaultColorStyle, colorStyles[type]).color,
              })
            }
            {primaryText}
          </h5>
          : primaryText
      }
      {
        isStringLike(secondaryText)
          ? <p>{secondaryText}</p>
          : secondaryText
      }
      {children}
    </Paper>
  )
}

Alert.propTypes = {
  style: PropTypes.object,
  primaryText: PropTypes.node,
  secondaryText: PropTypes.node,
  children: PropTypes.node,
  type: PropTypes.oneOf([
    'success',
    'info',
    'warning',
    'error',
  ]),
  zDepth: PropTypes.number,
  primaryIcon: PropTypes.element,
}

export default Alert
