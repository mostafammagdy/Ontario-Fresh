/* eslint-disable react/prop-types */

import React from 'react'
import { compose, withProps, branch, renderComponent, defaultProps } from 'recompose'
import { Link } from 'react-router'

import RaisedButton from 'material-ui/RaisedButton'

import LinkIcon from 'material-ui/svg-icons/content/link'
import EmailIcon from 'material-ui/svg-icons/communication/email'
import ShopIcon from 'material-ui/svg-icons/action/shopping-cart'
import MessageIcon from 'material-ui/svg-icons/communication/message'
import UserAddIcon from 'material-ui/svg-icons/social/group-add'

import omitProps from '../../utils/omit-props'

const socialIcons = {
  'facebook': 'M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z',
  'twitter': 'M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z',
  'linkedin': 'M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z'
}

const svgStyles = {
  display: 'inline-block',
  color: 'rgba(0, 0, 0, 0.87)',
  fill: 'rgb(255, 255, 255)',
  userSelect: 'none',
  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  verticalAlign: 'middle',
  marginLeft: 12,
  marginRight: 0,
}

const Icon = props => (
  <svg 
    width={props.size * 24}
    height={props.size * 24}
    viewBox={`0 0 ${props.size*24} ${props.size*24}`}
    style={svgStyles}
  >
    <path d={socialIcons[props.icon]}></path>
  </svg>
)

const resizableButton = compose(
  defaultProps({
    size: 1,
  }),
  withProps(({  style, buttonStyle, labelStyle, overlayStyle,
                height, size, callout, success, longText,
                withInput, notCaps, website, email, shop,
                facebook, twitter, linkedin, social, chat, connect,
  }) => ({
      backgroundColor:  callout ? '#3498DB' :
                        success ? '#2ECC71' :
                        website || email || shop ? '#626470' :
                        twitter ? '#0093F6' :
                        facebook ? '#334F8D' :
                        linkedin ? '#006CAC' :
                        undefined,
    labelColor: callout || success || social ? '#FFF' : undefined,
    style: {...style, style},
    buttonStyle: {...buttonStyle, 
      height: height * size,
      lineHeight: `${height * size}px`,
      borderRadius: withInput ? '0 2px 2px 0' : '2px',
      textAlign: social ? 'left' : undefined,
      minHeight: 52
    },
    labelStyle: {...labelStyle, 
      fontWeight: callout || success ? 200 : 600,
      fontSize: 12 * size,
      height: height * size,
      paddingLeft: 16 * size,
      paddingRight: 16 * size,
      letterSpacing: social || longText ? 1 : 2,
      textTransform: notCaps ? 'none' : 'uppercase',
    },
    overlayStyle: { ...overlayStyle, 
      height: height * size,
    },
    icon: website ? <LinkIcon /> :
          shop ? <ShopIcon /> :
          email ? <EmailIcon /> :
          chat ? <MessageIcon /> :
          connect ? <UserAddIcon /> :
          twitter ? <Icon size={size} icon="twitter" /> :
          facebook ? <Icon size={size} icon="facebook" /> :
          linkedin ? <Icon size={size} icon="linkedin" /> :
          undefined
  })),
  omitProps(['callout', 'success', 'longText', 'withInput', 'notCaps', 'website', 'shop', 'email', 'facebook', 'twitter', 'linkedin', 'social', 'chat', 'connect'])
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
