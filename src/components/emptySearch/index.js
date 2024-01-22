import React, { Component } from 'react'

import { Link } from 'react-router'

import SearchIcon from '../../assets/images/search-icon.svg'
//import ClassifiedIcon from '../../assets/images/classified-icon.svg'

class EmptySearch extends Component {
  render() {
    const {
      type
    } = this.props

    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <div><img src={SearchIcon} alt="" /></div>
        {
          type === "classifieds" ?
            <h3>There are currently no classifieds. Add your listing today!</h3>
          :
            <div>
              <h3>What can we help you find today?</h3>
              <span>Try searching for <Link to="/search/cheese">cheese</Link>, <Link to="/search/beef">beef</Link>, <Link to="/search/processing">processing</Link>, etc.</span>
          </div>
        }
      </div>
    )
  }
}

export default EmptySearch