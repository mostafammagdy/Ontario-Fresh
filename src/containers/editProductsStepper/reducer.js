import {
  PRODUCT_CATEGORY_SELECTED,
  RESET_PRODUCTS_STEPPER,
} from './constants'

const initialState = {
  category_selected: null,
  stepIndex: 0,
}

const reducer = function editProductsStepperReducer (state = initialState, action) {
  switch (action.type) {
    case PRODUCT_CATEGORY_SELECTED:
      return {
        ...state,
        stepIndex: 1,
        category_selected: action.category_id,
      }

    case RESET_PRODUCTS_STEPPER:
      return initialState

    default:
      return state
  }
}

export default reducer