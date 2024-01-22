import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Row, Col } from 'react-flexbox-grid'
import Checkbox from 'material-ui/Checkbox'
import ConfirmationDialog from '../../components/confirmationDialog'
import { filter, findIndex, map } from 'lodash'

import { getProductCategories } from '../../utils/product-hierarchy'

import { productCategorySelected } from '../../containers/editProductsStepper/actions'
import {
  createProduct,
  deleteProduct
} from '../../containers/editProductsComponent/actions'

import styles from './styles.module.scss'

class ListButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmWithUser: false,
    }
  }

  handleClick = () => {
    const {
      clickCallback,
      id,
      client,
      role_id,
      products,
      createProduct
    } = this.props
    const rootProducts = getProductCategories(products)
    const parentIndex = findIndex(rootProducts, product => product.category === id)
    const categorySelected = filter(this.props.products, (product) => product.category === this.props.id && product.name === '__CATEGORY__')[0]

    if (client && client.token) {
      if (categorySelected) {
        this.setState({ confirmWithUser: true })
      } else {
        createProduct(client, { role_id: role_id, category_id: id, name: '__CATEGORY__', parent: rootProducts[parentIndex] ? rootProducts[parentIndex].id : undefined })
        clickCallback()
      }
    }
  }

  handleConfirm = () => {
    const {
      id,
      client,
      products,
      deleteProduct
    } = this.props

    this.setState({ confirmWithUser: false })

    if (client && client.token) {
      map(filter(products, product => product.category === id),
          product => deleteProduct(client, { product_id: product.id })
      )
    }
  }

  handleClose = () => {
    this.setState({ confirmWithUser: false })
  }

  selectCategory = (id) => {
    this.props.productCategorySelected(id)
  }

  render() {
    const categorySelected = filter(this.props.products, (product) => product.category === this.props.id && product.name === '__CATEGORY__')[0]
    const {
      editProductsComponent: {
        requesting,
      }
    } = this.props

    return (
      <div className={`${this.props.selected ? styles.selectedCategory: styles.listButton} ${this.props.checked ? '' : styles.disabled}`}>
        <Row style={{flexGrow: 1, alignItems: 'center'}}>
          <Col>
            <Checkbox
              onClick={() => this.handleClick()}
              disabled={requesting}
              checked={!!categorySelected}
              // label={<div className={styles.label}>{this.props.label}</div>}
              style={{alignItems: 'center'}}
            />
          </Col>
          <Col>
           <div className={styles.label}>{this.props.label}</div>
          </Col>
          {categorySelected &&
          <Col xs={12} sm={12}>
            <a className={styles.category} onClick={() => this.selectCategory(this.props.id)}>Add products</a>
          </Col>
          }
        </Row>
        <ConfirmationDialog
          open={this.state.confirmWithUser}
          confirmationTitle={'Confirmation Required'}
          confirmationMessage={'Are you sure you want to remove your product listing under this category? Once you remove a category from your profile, you cannot recover its associated product list.'}
          confirmationLabel={'Proceed'}
          cancelLabel={'Cancel'}
          handleConfirm={this.handleConfirm}
          handleClose={this.handleClose}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  editProductsStepper: state.editProductsStepper,
  editProductsComponent: state.editProductsComponent
})

const connected = connect(mapStateToProps, {
  productCategorySelected,
  createProduct,
  deleteProduct
})

export default connected(ListButton)