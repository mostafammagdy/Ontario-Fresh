import React from 'react'

import EditListModal from '../../containers/editListModal'

class ProfileListEditModal extends React.Component {
  render() {
    const {
      type,
      data: {
        id,
        details,
      },
      textLink,
      label,
      title,
      subtitle,
      accountRole,
      headerEdit
    } = this.props

    return (
        <EditListModal
          type={type}
          data={details}
          id={id}
          textLink={textLink}
          label={label}
          title={title}
          headerEdit={headerEdit}
          subtitle={subtitle}
          accountRole={accountRole}
        />
    )
  }
}

export default ProfileListEditModal