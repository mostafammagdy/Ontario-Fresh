import React, { Component } from 'react'
import { map, xor } from 'lodash'

import ResizableButton from '../resizableButton'
import styles from './styles.module.scss'

const tabButtonStyle = {
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '33%',
}

class ScaleTabs extends Component {

  handleToggleScaleType = (scale) => () => {
    this.props.input.onChange(xor(this.props.input.value, [scale]))
  }

  render() {
    const {
      input: {
        value,
      },
      meta: {
        warning,
        error,
      }
    } = this.props    

    return (
      <div>
        <div 
          className={styles.tabs}
        >
          <ResizableButton
            secondary={value.includes("SML")}
            size="1.1"
            style={tabButtonStyle}
            label="Small"
            onClick={this.handleToggleScaleType("SML")}
          />
          <ResizableButton
            secondary={value.includes("MED")}
            size="1.1"
            style={tabButtonStyle}
            label="Medium"
            onClick={this.handleToggleScaleType("MED")}
            />
          <ResizableButton
            secondary={value.includes("LRG")}
            size="1.1"
            style={tabButtonStyle}
            label="Large"
            onClick={this.handleToggleScaleType("LRG")}
            />
        </div>
        { error && <div className={styles.fieldError}>{error}</div> }
        {warning &&
          <div className={styles.fieldWarning}>
            <ul>
              {map(warning, (item, key) => { return <li key={key}>{item}</li> })}
            </ul>
          </div>
        }
      </div>
    )
  }
}

export default ScaleTabs
