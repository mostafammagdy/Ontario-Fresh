import SignupSaga from './containers/signup/sagas'
import CreateAnAccountSaga from './containers/create-an-account/sagas'
import LoginSaga from './containers/login/sagas'
import ActivateSaga from './containers/activate/sagas'
import ClaimProfileSaga from './containers/claimProfile/sagas'
import PasswordResetSaga from './containers/passwordReset/sagas'

import DashboardSaga from './containers/dashboard/sagas'
import MessagesSaga from './containers/messages/sagas'
import MessagesConversationSaga from './containers/messagesConversation/sagas'

import OnboardingSaga from './containers/onboarding/sagas'

import ShippingSaga from './containers/shipping/sagas'

import ProfileManagerSaga from './containers/profileManager/sagas'
import ProfileManagerReportsSaga from './containers/profileManagerReports/sagas'

import ProfileSaga from './containers/profile/sagas'
import ProfileClassifiedsSaga from './containers/profileClassifieds/sagas'
import ProfilePhotosSaga from './containers/profilePhotos/sagas'
import ProfileConnectionsSaga from './containers/profileConnections/sagas'

import SearchComponentSaga from './containers/searchComponent/sagas'

import CreateClassifiedSaga from './containers/createClassifiedModal/sagas'
import EditClassifiedSaga from './containers/editClassifiedModal/sagas'

import EditListSaga from './containers/editListModal/sagas'
import PaymentMethodSaga from './containers/editRoleItemsModal/sagasPaymentMethods'
import EditImageSaga from './containers/editImageModal/sagas'

import CreateContactSaga from './containers/createContactModal/sagas'
import EditContactSaga from './containers/editContactModal/sagas'

import CreateAddressSaga from './containers/createAddressModal/sagas'
import EditAddressSaga from './containers/editAddressModal/sagas'

import CreateProfileOnBehalfSaga from './containers/createProfileOnBehalfModal/sagas'

import MessageAllSaga from './containers/messageAllModal/sagas'

import EditProductsSaga from './containers/editProductsModal/sagas'
import EditProductsStepperSaga from './containers/editProductsStepper/sagas'
import EditProductsComponentSaga from './containers/editProductsComponent/sagas'

import EditProfileItemsModalSaga from './containers/editProfileItemsModal/sagas'
import EditRoleItemsModalSaga from './containers/editRoleItemsModal/sagas'

import NotificationSettingsSaga from './containers/notificationSettings/sagas'

import UserSettingsSaga from './containers/userSettings/sagas'

import HijackSaga from './components/hijack/sagas'

export default function* IndexSaga () {
  yield [
    SignupSaga(),
    CreateAnAccountSaga(),
    LoginSaga(),
    ActivateSaga(),
    ClaimProfileSaga(),
    PasswordResetSaga(),

    DashboardSaga(),
    MessagesSaga(),
    MessagesConversationSaga(),

    OnboardingSaga(),

    ShippingSaga(),

    ProfileManagerSaga(),
    ProfileManagerReportsSaga(),

    ProfileSaga(),
    ProfileClassifiedsSaga(),
    ProfilePhotosSaga(),
    ProfileConnectionsSaga(),

    SearchComponentSaga(),

    CreateClassifiedSaga(),
    EditClassifiedSaga(),

    EditListSaga(),
    EditImageSaga(),

    CreateContactSaga(),
    EditContactSaga(),

    CreateAddressSaga(),
    EditAddressSaga(),

    CreateProfileOnBehalfSaga(),

    MessageAllSaga(),

    EditProductsSaga(),
    EditProductsStepperSaga(),
    EditProductsComponentSaga(),

    EditProfileItemsModalSaga(),
    EditRoleItemsModalSaga(),
    PaymentMethodSaga(),

    NotificationSettingsSaga(),

    UserSettingsSaga(),

    HijackSaga(),
  ]
}
