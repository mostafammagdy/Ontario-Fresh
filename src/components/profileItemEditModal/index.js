import React from 'react'

import EditProfileItemsModal from '../../containers/editProfileItemsModal'

class ProfileItemEditModal extends React.Component {
  render() {
    const {
      type,
      data: {
        id,
        details,
      }
    } = this.props

    return (
      <EditProfileItemsModal type={type} data={details} id={id} />
    )
  }
}

export default ProfileItemEditModal