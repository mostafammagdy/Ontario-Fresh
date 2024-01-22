import React from 'react'

import EditRoleItemsModal from '../../containers/editRoleItemsModal'

class RoleItemEditModal extends React.Component {
  render() {
    const {
      type,
      id,
      payment_data,
      role_details,
      category,
    } = this.props
    return (
      <EditRoleItemsModal type={type} role_details={role_details} payment_data={payment_data ? payment_data.details : null} payment_id={payment_data ? payment_data.id : null} category={category} id={id} />
    )
  }
}

export default RoleItemEditModal
