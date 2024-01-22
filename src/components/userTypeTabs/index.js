import React, { Component } from 'react'
import { map, xor } from 'lodash'

import ResizableButton from '../resizableButton'
import styles from './styles.module.scss'

class UserTypeTabs extends Component {

  handleToggleUserType = (number) => () => {
    this.props.input.onChange(xor(this.props.input.value, [number]))
  }

  render() {
    const {
      input: {
        value,
      },
      meta: {
        error,
        warning,
        touched
      }
    } = this.props    

    return (
      <div>
        <div 
          className={styles.tabs}
        >
          <ResizableButton
            secondary={value.includes(1)}
            size="1.2"
            style={{ minWidth: 97 }}
            className={styles.tab}
            label="Buyer"
            onClick={this.handleToggleUserType(1)}
          />
          <ResizableButton
            secondary={value.includes(2)}
            size="1.2"
            style={{ minWidth: 104 }}
            className={styles.tab}
            label="Seller"
            onClick={this.handleToggleUserType(2)}
            />
          <ResizableButton
            secondary={value.includes(3)}
            size="1.2"
            style={{ minWidth: 112 }}
            className={styles.tab}
            label="Service"
            onClick={this.handleToggleUserType(3)}
            />
          <ResizableButton
            secondary={value.includes(5)}
            size="1.2"
            style={{ minWidth: 146 }}
            className={styles.tab}
            label="Processor"
            onClick={this.handleToggleUserType(5)}
          />
          <ResizableButton
            secondary={value.includes(4)}
            size="1.2"
            style={{ minWidth: 168 }}
            className={styles.tab}
            label="Organization"
            onClick={this.handleToggleUserType(4)}
          />
        </div>
        {touched && error ? <div className={styles.fieldError}>{error}</div> : <div className={styles.fieldWarning}>Select all that apply to you</div>}
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

export default UserTypeTabs
