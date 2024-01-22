import {
  SEARCH_AUTOCOMPLETE_REQUEST,
  SEARCH_AUTOCOMPLETE_SUCCESS,
  SEARCH_AUTOCOMPLETE_ERROR,

  SEARCH_QUERY_REQUESTING,
  SEARCH_QUERY_SUCCESS,
  SEARCH_QUERY_ERROR,

  CLEAR_SEARCH_QUERY,

  CLASSIFIEDS_SEARCH_REQUESTING,
  CLASSIFIEDS_SEARCH_SUCCESS,
  CLASSIFIEDS_SEARCH_ERROR,

  GET_SERVICES_LIST,
  GET_SERVICES_LIST_SUCCESS,
  GET_SERVICES_LIST_ERROR,

  GET_CLASSIFICATIONS_LIST,
  GET_CLASSIFICATIONS_LIST_SUCCESS,
  GET_CLASSIFICATIONS_LIST_ERROR,

  GET_PAYMENT_METHODS_LIST,
  GET_PAYMENT_METHODS_LIST_SUCCESS,
  GET_PAYMENT_METHODS_LIST_ERROR,

  GET_SAFETY_STANDARDS_LIST,
  GET_SAFETY_STANDARDS_LIST_SUCCESS,
  GET_SAFETY_STANDARDS_LIST_ERROR,

  GET_PROCESSING_TYPES_LIST,
  GET_PROCESSING_TYPES_LIST_SUCCESS,
  GET_PROCESSING_TYPES_LIST_ERROR,

  GET_MARKET_TYPES_LIST,
  GET_MARKET_TYPES_LIST_SUCCESS,
  GET_MARKET_TYPES_LIST_ERROR,

  GET_CATEGORIES_LIST,
  GET_CATEGORIES_LIST_SUCCESS,
  GET_CATEGORIES_LIST_ERROR,
} from './constants'

import {
  PRODUCT_CATEGORIES_REQUESTING,
  PRODUCT_CATEGORIES_REQUEST_SUCCESS,
  PRODUCT_CATEGORIES_REQUEST_ERROR,
} from '../editProductsModal/constants'

const initialState = {
  profiles: {
    hits: {
      hits: [],
      total: 0,
    }
  },
  classifieds: {
    hits: {
      hits: [],
      total: 0,
    }
  },
  lists: {},
  search_autocomplete: {
    request: false,
    successful: false,
  },
  search_query: {
    requesting: false,
    successful: false,
  },
  classified_search: {
    requesting: false,
    successful: false,
  },
  services_list: {
    requesting: false,
    successful: false,
  },
  classifications_list: {
    requesting: false,
    successful: false,
  },
  payment_methods_list: {
    requesting: false,
    successful: false,
  },
  safety_standards_list: {
    requesting: false,
    successful: false,
  },
  processing_types_list: {
    requesting: false,
    successful: false,
  },
  market_types_list: {
    requesting: false,
    successful: false,
  },
  categories_list: {
    requesting: false,
    successful: false,
  },
  product_categories_list: {
    requesting: false,
    successful: false,
  },
  suggestions: [],
  messages: [],
  errors: [],
}

const reducer = function searchComponentReducer (state = initialState, action) {
  switch (action.type) {
    case "@@redux-form/TOUCH":
    case "@@redux-form/CHANGE":
      if (action.meta.form !== "search") {
        return state
      }
      return {
        ...state,
        search_query: {
          requesting: true,
          successful: false,
        },
        classified_search: {
          requesting: true,
          successful: false,
        },
        suggestions: [],
      }

    case SEARCH_AUTOCOMPLETE_REQUEST:
      return {
        ...state,
        search_autocomplete: {
          request: true,
          successful: false,
        }
      }

    case SEARCH_AUTOCOMPLETE_SUCCESS:
      return {
        ...state,
        suggestions: action.response,
        search_autocomplete: {
          request: false,
          successful: true,
        }
      }
    
    case SEARCH_AUTOCOMPLETE_ERROR:
      return {
        ...state,
        search_autocomplete: {
          request: false,
          successful: false,
        }
      }

    case SEARCH_QUERY_REQUESTING:
      return {
        ...state,
        search_query: {
          requesting: true,
          successful: false,
        },
        messages: [{ body: 'Searching with query...', time: new Date() }],
        errors: [],
      }

    case SEARCH_QUERY_SUCCESS:
      return {
        ...state,
        profiles: action.response,
        errors: [],
        messages: [],
        search_query: {
          requesting: false,
          successful: true,
        },
      }

  case SEARCH_QUERY_ERROR:
      return {
        ...state,
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        profiles: {
          hits: {
            hits: [],
            total: 0,
          }
        },
        search_query: {
          requesting: false,
          successful: false,
        },
      }

    case CLEAR_SEARCH_QUERY:
      return {
        ...state,
        profiles: {
          hits: {
            hits: [],
            total: 0,
          }
        },
        classifieds: {
          hits: {
            hits: [],
            total: 0,
          }
        },
        errors: [],
        messages: [],
      }

    case CLASSIFIEDS_SEARCH_REQUESTING:
      return {
        ...state,
        classified_search: {
          requesting: true,
          successful: false,
        },
        messages: [{ body: 'Searching for classifieds...', time: new Date() }],
        errors: [],
      }

    case CLASSIFIEDS_SEARCH_SUCCESS:
      return {
        ...state,
        classifieds: action.response,
        errors: [],
        messages: [],
        classified_search: {
          requesting: false,
          successful: true,
        },
      }

    case CLASSIFIEDS_SEARCH_ERROR:
      return {
        ...state,
        classifieds: {
          hits: {
            hits: [],
            total: 0
          }
        },
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        classified_search: {
          requesting: false,
          successful: false,
        },
      }

    case GET_SERVICES_LIST:
      return {
        ...state,
        services_list: {
          requesting: true,
          successful: false,
        },
        messages: [{ body: 'Getting services list...', time: new Date() }],
        errors: [],
      }

    case GET_SERVICES_LIST_SUCCESS:
      return {
        ...state,
        lists: {
          ...state.lists,
          services: action.response
        },
        errors: [],
        messages: [],
        services_list: {
          requesting: false,
          successful: true,
        },
      }

    case GET_SERVICES_LIST_ERROR:
      return {
        ...state,
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        services_list: {
          requesting: false,
          successful: false,
        },
      }

    case GET_CLASSIFICATIONS_LIST:
      return {
        ...state,
        classifications_list: {
          requesting: true,
          successful: false,
        },
        messages: [{ body: 'Getting classifications list...', time: new Date() }],
        errors: [],
      }

    case GET_CLASSIFICATIONS_LIST_SUCCESS:
      return {
        ...state,
        lists: {
          ...state.lists,
          classifications: action.response
        },
        errors: [],
        messages: [],
        classifications_list: {
          requesting: false,
          successful: true,
        },
      }

    case GET_CLASSIFICATIONS_LIST_ERROR:
      return {
        ...state,
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        classifications_list: {
          requesting: false,
          successful: false,
        },
      }

    case GET_PAYMENT_METHODS_LIST:
      return {
        ...state,
        payment_methods_list: {
          requesting: true,
          successful: false,
        },
        messages: [{ body: 'Getting payment methods list...', time: new Date() }],
        errors: [],
      }

    case GET_PAYMENT_METHODS_LIST_SUCCESS:
      return {
        ...state,
        lists: {
          ...state.lists,
          payment_methods: action.response
        },
        errors: [],
        messages: [],
        payment_methods_list: {
          requesting: false,
          successful: true,
        },
      }

    case GET_PAYMENT_METHODS_LIST_ERROR:
      return {
        ...state,
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        payment_methods_list: {
          requesting: false,
          successful: false,
        },
      }

    case GET_SAFETY_STANDARDS_LIST:
      return {
        ...state,
        safety_standards_list: {
          requesting: true,
          successful: false,
        },
        messages: [{ body: 'Getting safety standards list...', time: new Date() }],
        errors: [],
      }

    case GET_SAFETY_STANDARDS_LIST_SUCCESS:
      return {
        ...state,
        lists: {
          ...state.lists,
          safety_standards: action.response
        },
        errors: [],
        messages: [],
        safety_standards_list: {
          requesting: false,
          successful: true,
        },
      }

    case GET_SAFETY_STANDARDS_LIST_ERROR:
      return {
        ...state,
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        safety_standards_list: {
          requesting: false,
          successful: false,
        },
      }

    case GET_PROCESSING_TYPES_LIST:
      return {
        ...state,
        processing_types_list: {
          requesting: true,
          successful: false,
        },
        messages: [{ body: 'Getting processing types list...', time: new Date() }],
        errors: [],
      }

    case GET_PROCESSING_TYPES_LIST_SUCCESS:
      return {
        ...state,
        lists: {
          ...state.lists,
          processing_types: action.response
        },
        errors: [],
        messages: [],
        processing_types_list: {
          requesting: false,
          successful: true,
        },
      }

    case GET_PROCESSING_TYPES_LIST_ERROR:
      return {
        ...state,
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        processing_types_list: {
          requesting: false,
          successful: false,
        },
      }

    case GET_MARKET_TYPES_LIST:
      return {
        ...state,
        market_types_list: {
          requesting: true,
          successful: false,
        },
        messages: [{ body: 'Getting market types list...', time: new Date() }],
        errors: [],
      }

    case GET_MARKET_TYPES_LIST_SUCCESS:
      return {
        ...state,
        lists: {
          ...state.lists,
          market_types: action.response
        },
        errors: [],
        messages: [],
        market_types_list: {
          requesting: false,
          successful: true,
        },
      }

    case GET_MARKET_TYPES_LIST_ERROR:
      return {
        ...state,
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        market_types_list: {
          requesting: false,
          successful: false,
        },
      }

    case GET_CATEGORIES_LIST:
      return {
        ...state,
        categories_list: {
          requesting: true,
          successful: false,
        },
        messages: [{ body: 'Getting categories list...', time: new Date() }],
        errors: [],
      }

    case GET_CATEGORIES_LIST_SUCCESS:
      return {
        ...state,
        lists: {
          ...state.lists,
          categories: action.response
        },
        errors: [],
        messages: [],
        categories_list: {
          requesting: false,
          successful: true,
        },
      }

    case GET_CATEGORIES_LIST_ERROR:
      return {
        ...state,
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        categories_list: {
          requesting: false,
          successful: false,
        },
      }

    case PRODUCT_CATEGORIES_REQUESTING:
      return {
        ...state,
        product_categories_list: {
          requesting: true,
          successful: false,
        }
      }

    case PRODUCT_CATEGORIES_REQUEST_SUCCESS:
      const category_map = {}
      action.response.forEach(categoryObject => {
        category_map[categoryObject.id] = categoryObject.label
      })

      return {
        ...state,
        lists: {
          ...state.lists,
          category_map
        },
        errors: [],
        messages: [],
        product_categories_list: {
          requesting: false,
          successful: true,
        }
      }

    case PRODUCT_CATEGORIES_REQUEST_ERROR:
      return {
        ...state,
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        product_categories_list: {
          requesting: false,
          successful: false,
        }
      }

    default:
      return state
  }
}

export default reducer
