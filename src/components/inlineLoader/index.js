import React from 'react'
import { defaultProps } from 'recompose'

import styles from './styles.module.scss'

class inlineLoader extends React.Component {
  render() {
    const { backgroundColor } = this.props
    return (
      <div className={styles.inlineLoader}>
        <div className={styles.animatedBackground} />
        <div className={styles.masking}>
          { this.props.avatar && 
            <div className={styles.avatar}>
              <AvatarCutout />
            </div>
          }
          <div className={styles.blocks}>
            <div className={styles.topClipping} style={backgroundColor ? {backgroundColor} : {}} />
            <div className={styles.longBlock}>
              <div />
              <div style={backgroundColor ? {backgroundColor} : {}} />
            </div>
            <div className={styles.middleClipping} style={backgroundColor ? {backgroundColor} : {}} />
            <div className={styles.shortBlock}>
              <div />
              <div style={backgroundColor ? {backgroundColor} : {}} />
            </div>
            <div className={styles.bottomClipping} style={backgroundColor ? {backgroundColor} : {}} />
          </div>
        </div>
      </div>
    );
  }
}

const AvatarCutout = defaultProps({
  color: '#FFF',
  style: {
    height: 72,
    width: 72,
  },
})(({ color, style }) =>
  <svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="1.41421"
    style={style}
    version="1.1"
    viewBox="0 0 72 72"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M72,0L0,0L0,72L72,72L72,0ZM35.9548,15.9548C47.0005,15.9548 55.9548,24.9091 55.9548,35.9548C55.9548,47.0005 47.0005,55.9548 35.9548,55.9548C24.9091,55.9548 15.9548,47.0005 15.9548,35.9548C15.9548,24.9091 24.9091,15.9548 35.9548,15.9548Z" fill={color} />
  </svg>
)

export default inlineLoader
