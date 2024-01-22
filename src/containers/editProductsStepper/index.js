import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Step, Stepper, StepLabel } from 'material-ui/Stepper'

import EditProductsCategoriesList from '../../components/editProductsCategoriesList'
import EditProductsComponent from '../editProductsComponent'

import styles from './styles.module.scss'

class EditProductsStepper extends Component {

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <EditProductsCategoriesList
          categories={this.props.categories}
          products={this.props.products}
          role_id={this.props.role_id}
          />
      case 1:
        return <EditProductsComponent
          category={this.props.editProductsStepper.category_selected}
          products={this.props.products}
          role_id={this.props.role_id}
          />
      default:
        return 'Sorry - something went terribly wrong. Please refresh the page, or contact us if this error persists.'
    }
  }

  render() {
    const { stepIndex } = this.props.editProductsStepper
    const contentStyle = { margin: '0 16px' }

    return (
      <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
        <div className={styles.responsiveStepper}>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Select Food & Beverage Category</StepLabel>
            </Step>
            <Step>
              <StepLabel>Manage Products Within that Category</StepLabel>
            </Step>
          </Stepper>
        </div>
        <div style={contentStyle}>
          {this.getStepContent(stepIndex)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  editProductsStepper: state.editProductsStepper,
})

export default connect(mapStateToProps)(EditProductsStepper)
