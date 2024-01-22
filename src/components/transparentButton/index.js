/* eslint-disable react/prop-types */

import React from 'react'
import { compose, withProps, branch, renderComponent, defaultProps } from 'recompose'
import { Link } from 'react-router'

import RaisedButton from 'material-ui/RaisedButton'

const resizableButton = compose(
  defaultProps({
    height: 40,
    size: 1,
  }),
  withProps(({  style, buttonStyle, labelStyle, overlayStyle,
                height, size, callout, success,
                withInput, notCaps, connect,
  }) => ({
    labelColor: '#FFF',
      style: {...style, background: 'none', borderStyle: 'solid', borderColor: '#FFF'},
    buttonStyle: {...buttonStyle, 
      height: height * size,
      lineHeight: `${height * size}px`,
      borderRadius: withInput ? '0 2px 2px 0' : '2px',
      background: 'none',
    },
    labelStyle: {...labelStyle, 
      fontWeight: callout || success ? 200 : 600,
      fontSize: 12 * size,
      height: height * size,
      paddingLeft: 16 * size,
      paddingRight: 16 * size,
      letterSpacing: 2,
      textTransform: notCaps ? 'none' : 'uppercase',
    },
    overlayStyle: { ...overlayStyle, 
      height: height * size,
    }
  })),
)(RaisedButton);

const linkPassthrough = ({ to, ...props }) => (
  <Link to={to}>
    <resizableButton {...props} />
  </Link>
);

const Composed = compose(
  branch(
    ({ to }) => !!to,
    renderComponent(linkPassthrough),
    renderComponent(resizableButton)
  )
)();

export default Composed;
