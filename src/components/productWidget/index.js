import React, { Component } from 'react'
import { map, filter } from 'lodash'
import styles from './styles.module.scss'

class ProductWidget extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expand: false,
      collapsedNumberOfItems: 6
    }
  }

  handleOpen = () => {
    this.setState({ expand: true })
  }

  handleClose = () => {
    this.setState({ expand: false })
  }

  render() {
    const {
      rootItem,
      secondLevel
    } = this.props

    const secondLevelProducts = filter(secondLevel[rootItem.category], product => product.name !== '__CATEGORY__')
    const displayOnlyCategory = secondLevelProducts.length === 0

    return (
      <div>
        <h6 className={styles.productName} style={{ color: "rgb(0, 112, 60)" }}>{rootItem.label} {!displayOnlyCategory && secondLevelProducts.length > 0 && ('(' + secondLevelProducts.length + ')')}</h6>
        <ul className={`${secondLevelProducts.length === 1 ? "oneColList": "twoColList"}`} style={{marginBottom: "0.5rem"}}>
          {!displayOnlyCategory && (secondLevelProducts.length > 0 && this.state.expand) ?
          map(secondLevelProducts, (subheader, key) =>
          <li key={subheader.id}>
            {subheader.name}
          </li>)
          : !displayOnlyCategory ?
          map(secondLevelProducts.slice(0, Math.min(this.state.collapsedNumberOfItems, secondLevelProducts.length)), (subheader, key) =>
          <li key={subheader.id}>
            {subheader.name}
          </li>)
          :
          null
          }
        </ul>
        {!displayOnlyCategory && secondLevelProducts.length > this.state.collapsedNumberOfItems &&
        <div style={{marginBottom: "0.5rem"}}>
          <a className={styles.expandCollapse} onClick={!this.state.expand ? this.handleOpen : this.handleClose} style={{ color: "rgb(0, 112, 60)" }}>{!this.state.expand ? "Expand to see more" : "Collapse"}</a>
        </div>
        }
      </div>
    )
  }
}

export default ProductWidget
