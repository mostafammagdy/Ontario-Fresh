import React, { Component } from 'react'
import { map, filter, orderBy, cloneDeep } from 'lodash'
import { connect } from 'react-redux'

import { Row, Col } from 'react-flexbox-grid'
import RaisedButton from 'material-ui/RaisedButton'
import ListButton from '../../components/listButton'

import {
  updateProduct
} from '../../containers/editProductsComponent/actions'

import styles from './styles.module.scss'

class EditProductCategoriesList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      categoryOrder: [],
      selectedCategory: -1,
      displayObjects: []
    }
  }

  componentDidMount () {
    this.setCategoryOrder()
  }

  setCategoryOrder = () => {
    this.setState({categoryOrder: orderBy(filter(this.props.products, (product) => product.name ==="__CATEGORY__"), ['category_order', 'label'])})
  }

  isChecked = (id) => {
    return map(this.state.categoryOrder, (product) => product.category).includes(id)
  }

  handleClick = (id) => {
    if(id === this.state.selectedCategory){
      this.setState({selectedCategory: -1})
    }
    else if (this.isChecked(id)){
      this.setState({selectedCategory: id})
    }
    else {
      this.setState({selectedCategory: -1})
    }
  }

  handleUp = () => {
    this.switchOrder(-1)
  }

  handleDown = () => {
    this.switchOrder(1)
  }

  swapCategories = (order, first, second) => {
    var temp
    if (first < 0 || first >= order.length || second < 0 || second >= order.length){
      return false
    }
    temp = order[first].category_order
    order[first].category_order = order[second].category_order
    order[second].category_order = temp
    return true
  }

  switchOrder = (offset) => {
    const {
      client,
      updateProduct
    } = this.props

    if (this.state.selectedCategory === -1) {
      return
    }
    var newOrder = cloneDeep(this.state.categoryOrder)
    var updated = false

    for (var k = 0; k < this.state.categoryOrder.length; k++){   // these are going to be 1-indexed
      newOrder[k].category_order = k+1
    }
    for (var i = 0; i < this.state.categoryOrder.length; i++){
      if(newOrder[i].category === this.state.selectedCategory){
        updated = this.swapCategories(newOrder, i, i + offset)
        break
      }
    }
    if(updated) {
      for (var l = 0; l < newOrder.length; l++){
        updateProduct(client, { product_id: newOrder[l].id, category_order: newOrder[l].category_order })
      }
    }
    
    this.setState({categoryOrder: orderBy(newOrder, ['category_order'])})
  }

  displayOrder = () => {
    const categories = this.props.categories
    if (!categories.length){
      return []
    }
    var ordered_categories = map(this.state.categoryOrder, cat => ({ id: cat.category, label: cat.label, value: cat.short}))
    var ids_only = map(this.state.categoryOrder, cat => (cat.category))
    for (var i = 0; i < categories.length; i++){
      if (!ids_only.includes(categories[i].id)){
        ordered_categories.push(categories[i])
      }
    }
    return ordered_categories
  }

  render() {
    const {
      editProductsComponent: {
        requesting,
      }
    } = this.props
    return (
      <div>
        <Row>
          <RaisedButton
            primary
            label=" Move Up"
            onClick={this.handleUp}
            disabled={this.state.selectedCategory === -1 || requesting}
            className={styles.moveButton}
          />
          <RaisedButton
            primary
            label="Move Down"
            onClick={this.handleDown}
            disabled={this.state.selectedCategory === -1 || requesting}
            className={styles.moveButton}
          />
        </Row>
        <Row className={styles.categoryContainer}>
          {map(this.displayOrder(), (item) =>
            <Col xs={12} sm={6} key={item.id} onClick={() => this.handleClick(item.id)} >
              <ListButton  clickCallback={this.setCategoryOrder} label={item.label} id={item.id} role_id={this.props.role_id} products={this.props.products} selected={this.state.selectedCategory === item.id} checked={this.isChecked(item.id)}/>
            </Col>
          )}
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  editProductsComponent: state.editProductsComponent
})

const connected = connect(mapStateToProps, {
  updateProduct
})

export default connected(EditProductCategoriesList)
