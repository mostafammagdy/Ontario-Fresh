import {
  PRODUCT_CATEGORY_SELECTED,
  RESET_PRODUCTS_STEPPER,
} from './constants'

export const productCategorySelected = function productCategorySelected(category_id) {
  return {
    type: PRODUCT_CATEGORY_SELECTED,
    category_id,
  }
}

export const resetProductsStepper = function resetProductsStepper() {
  return {
    type: RESET_PRODUCTS_STEPPER
  }
}