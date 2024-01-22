import React from 'react'

import styles from './styles.module.scss'

class ProfileTypeMenu extends React.Component {

  render() {
    return (
      <div style={{ padding: '2rem 0' }}>
        <h4 className={styles.active}>Suppliers</h4>
        <h4>Buyers</h4>
        <h4>Service Providers</h4>
        <h4>Organizations</h4>
        <h4>See All ({this.props.count}+)</h4>
    </div>
    )
  }
}

export default ProfileTypeMenu