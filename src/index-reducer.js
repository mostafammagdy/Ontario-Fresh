import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import client from './utils/client/reducer'

import signup from './containers/signup/reducer'
import createAnAccount from './containers/create-an-account/reducer'
import login from './containers/login/reducer'
import activate from './containers/activate/reducer'
import claimProfile from './containers/claimProfile/reducer'
import passwordReset from './containers/passwordReset/reducer'

import dashboard from './containers/dashboard/reducer'
import messages from './containers/messages/reducer'
import messagesConversation from './containers/messagesConversation/reducer'

import onboarding from './containers/onboarding/reducer'

import shipping from './containers/shipping/reducer'

import profileManager from './containers/profileManager/reducer'
import profileManagerReports from './containers/profileManagerReports/reducer'

import profile from './containers/profile/reducer'
import profileClassifieds from './containers/profileClassifieds/reducer'
import profilePhotos from './containers/profilePhotos/reducer'
import profileConnections from './containers/profileConnections/reducer'

import searchComponent from './containers/searchComponent/reducer'

import createClassified from './containers/createClassifiedModal/reducer'
import editClassified from './containers/editClassifiedModal/reducer'

import editList from './containers/editListModal/reducer'
import editImage from './containers/editImageModal/reducer'

import createContact from './containers/createContactModal/reducer'
import editContact from './containers/editContactModal/reducer'

import createAddress from './containers/createAddressModal/reducer'
import editAddress from './containers/editAddressModal/reducer'

import createAProfileOnBehalfReducer from './containers/createProfileOnBehalfModal/reducer'

import messageAll from './containers/messageAllModal/reducer'

import editProducts from './containers/editProductsModal/reducer'
import editProductsStepper from './containers/editProductsStepper/reducer'
import editProductsComponent from './containers/editProductsComponent/reducer'

import editProfileItemsModal from './containers/editProfileItemsModal/reducer'
import editRoleItemsModal from './containers/editRoleItemsModal/reducer'

import notificationSettings from './containers/notificationSettings/reducer'

import userSettings from './containers/userSettings/reducer'

import hijack from './components/hijack/reducer'

const IndexReducer = combineReducers({
  client,
  
  form,
  
  signup,
  createAnAccount,
  login,
  activate,
  claimProfile,
  passwordReset,

  dashboard,
  messages,
  messagesConversation,

  onboarding,

  shipping,

  profileManager,
  profileManagerReports,
  
  profile,
  profileClassifieds,
  profilePhotos,
  profileConnections,

  searchComponent,

  createClassified,
  editClassified,

  editList,
  editImage,

  createContact,
  editContact,

  createAddress,
  editAddress,

  createAProfileOnBehalfReducer, //this is named this long to avoid naming conflicts

  messageAll,

  editProducts,
  editProductsStepper,
  editProductsComponent,
  
  editProfileItemsModal,
  editRoleItemsModal,

  notificationSettings,

  userSettings,

  hijack,
})

export default IndexReducer
