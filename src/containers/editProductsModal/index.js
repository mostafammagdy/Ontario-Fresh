import React from 'react'
import { connect } from 'react-redux'
import { findIndex } from 'lodash'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'

import EditIcon from 'material-ui/svg-icons/editor/mode-edit'

import EditProductsStepper from '../../containers/editProductsStepper'

import {
  productCategoriesRequest,
} from './actions'

import {
  resetProductsStepper,
} from '../editProductsStepper/actions'

import styles from './styles.module.scss'

class EditProductsModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      hasChanged: false,
    }
  }

  handleOpen = () => {
    this.props.productCategoriesRequest()
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.resetProductsStepper()
  }

  handleUpdateCheck = ( key ) => {
    this.setState({
      form: {
        ...this.state.form,
        [key]: {
          ...this.state.form[key],
          value: !this.state.form[key].value,
        }
      }
    })

    this.setState({ hasChanged: true })
  }

  handleSubmit = () => {
    this.handleClose()
  }

  render () {
    const {
      headerEdit,
      editProducts,
      editProductsStepper,
      products,
      role_id,
      textLink,
      type,
    } = this.props

    let categoriesIndex = -1
    if (this.props.editProductsStepper.category_selected !== null) {
      categoriesIndex = findIndex(editProducts.categories, object => object.id === this.props.editProductsStepper.category_selected)
    }

    const actions = [
      editProductsStepper.stepIndex === 0 ? 
        <RaisedButton
          primary
          label="Submit"
          onClick={this.handleClose}
        /> : 
        <FlatButton
          disabled={editProductsStepper.stepIndex === 0}
          primary
          label="Back"
          onClick={() => this.props.resetProductsStepper()}
        />
    ]

    return (
      <span>
        { !! textLink ?
          <a onClick={this.handleOpen}>
            {
              type === "buyer" ? "List the products that you are looking to buy in Ontario"
              :
              type === "seller" ? "List the products that you are looking to sell in Ontario"
              :
              type === "processor" ? <div>Add products <span>that you process in Ontario</span></div>
              :
              <div>Add <span className="textLink">products</span> <span>to your profile</span></div>
            }
          </a>
        :
          <span className={headerEdit ? styles.headerEditButton : 'editButton'}>
            <IconButton
              tooltip="Manage Products"
              tooltipPosition="bottom-center"
              onClick={this.handleOpen}
              style={{height:"32px",padding:"3px",marginTop:"10px"}}
            >
              <EditIcon />
            </IconButton>
          </span>
        }
        <Dialog
          autoScrollBodyContent
          modal
          title={categoriesIndex > -1 ? ('Add products that fall under ' + editProducts.categories[categoriesIndex].label)
                                      : "Manage Products"}
          actions={actions}
          contentClassName='responsiveDialog'
          open={this.state.open}
        >
          <span className="close-modal" onClick={this.handleClose}>&times;</span>
          <EditProductsStepper products={products} categories={editProducts.categories} role_id={role_id}/>
        </Dialog>
      </span>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
  editProducts: state.editProducts,
  editProductsStepper: state.editProductsStepper,
})

const connected = connect(mapStateToProps, {
  productCategoriesRequest,
  resetProductsStepper,
 })

export default connected(EditProductsModal)
