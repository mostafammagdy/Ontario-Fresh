import React, { Component } from 'react'
import { reduxForm, Field, reset } from 'redux-form'
import { connect } from 'react-redux'
import { map, filter, findIndex } from 'lodash'
import Paper from 'material-ui/Paper'

import MenuItem from 'material-ui/MenuItem'
import Chip from 'material-ui/Chip'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'

import ResizableButton from '../../components/resizableButton'

import { Row, Col } from 'react-flexbox-grid'

import styles from './styles.module.scss'

import { getProductCategories } from '../../utils/product-hierarchy'

import {
  createProduct,
  deleteProduct,
  getProductSuggestions
} from './actions'

class EditProductsComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasChanged: false,
      productName: "",
    }

    this.props.getProductSuggestions(props.client, {query: ""})
  }

  handleDeleteProductRequest = ( id ) => {
    const {
      client,
      deleteProduct,
    } = this.props

    if (client && client.token) {
      deleteProduct(client, { product_id: id })
    }
  }

  handleCreateProductRequest = ( values ) => {
    const {
      category,
      client,
      createProduct,
      role_id,
      products
    } = this.props

    const rootProducts = getProductCategories(products)
    const parentIndex = findIndex(rootProducts, product => product.category === category)

    if (client && client.token && values.product) {
      const capitalizedProduct = values.product.charAt(0).toUpperCase() + values.product.slice(1)
      createProduct(client, { role_id: role_id, category_id: category, name: capitalizedProduct, parent: rootProducts[parentIndex] ? rootProducts[parentIndex].id : undefined })
      this.setState({productName: ''})
    }
  }

  renderAutocomplete = props => {
    const {
      category,
      client,
      editProductsComponent: {
        suggestions
      },
      getProductSuggestions
    } = this.props
    return <Autosuggest
      key="autocomplete"
      theme={styles}
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) => getProductSuggestions(client, { query: `${category} ${value}` })}
      onSuggestionsClearRequested={() => getProductSuggestions(client, { query: "" })}
      getSuggestionValue={suggestion => suggestion}
      onSuggestionSelected={(event, { suggestionValue }) => this.setState({ productName: suggestionValue })}
      renderSuggestion={(suggestion, { query, isHighlighted }) => {
        const matches = match(suggestion, query)
        const parts = parse(suggestion, matches)

        return <MenuItem>
          <div>
            {parts.map((part, index) => {
              return part.highlight ? (
                <strong key={String(index)}>
                  {part.text}
                </strong>
              ) : (
                <strong key={String(index)} style={{ fontWeight: 300 }}>
                  {part.text}
                </strong>
              )
            })}
          </div>
        </MenuItem>
      }}
      inputProps={{
        value: this.state.productName,
        onChange: (event, { newValue }) => {
          this.setState({ productName: newValue })
          props.input.onChange(newValue) //even though no onChange function is defined, calling it forces <Field /> to rerender this component
        },
        type: "text",
        name: "product",
      }}
      renderSuggestionsContainer={({ containerProps, children }) =>
        <Paper {...containerProps} style={{ listStyleType: 'none', margin: 0, padding: 0, position: 'absolute', zIndex: 2, maxHeight: 192, overflowY: 'auto' }}>
          {children}
        </Paper>
      }
    />
  }

  render() {
    const chipStyles = {
      margin: 4,
    }

    const {
      category,
      products,
      handleSubmit,
      editProductsComponent: {
        requesting
      }
    } = this.props

    return (
      <Row>
        <Col xs={12} sm={6}>
          <div className={styles.greyBox}>
            <form
              onSubmit={handleSubmit(this.handleCreateProductRequest)}
              autoComplete="off"
            >
              <div className={styles.label}>Add a Product</div>
              {[
                <Field
                  key="autocomplete"
                  name="product"
                  disabled={requesting}
                  component={this.renderAutocomplete}
                />,
                <ResizableButton
                  key="add"
                  primary
                  fullWidth
                  type="submit"
                  label="Add"
                  disabled={requesting}
                />
              ]}
            </form>
          </div>
        </Col>
        <Col xs={12} sm={6}>
          <div className={styles.greyBox}>
            <div className={styles.label}>Products List</div>
            {map(filter(products, (product) => { return product.category === category && product.name !== '__CATEGORY__' }), (product, key) =>
              <Chip
                key={key}
                onRequestDelete={() => this.handleDeleteProductRequest(product.id)}
                style={chipStyles}
              >
                {product.name}
              </Chip>
            )}
          </div>
        </Col>
      </Row>
    )
  }
}

const resetForm = (result, dispatch) =>
  dispatch(reset('editProductsComponent'))

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
  editProductsComponent: state.editProductsComponent,
})

const connected = connect(mapStateToProps, {
  createProduct,
  deleteProduct,
  getProductSuggestions
})(EditProductsComponent)

const formed = reduxForm({
  form: 'editProductsComponent',
  onSubmitSuccess: resetForm,
})(connected)

export default formed
