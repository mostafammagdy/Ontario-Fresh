import React from 'react'

import BuyerProfileCard from '../../components/buyerProfileCard'
import SellerProfileCard from '../../components/sellerProfileCard'
//import ServiceProfileCard from '../../components/serviceProfileCard'
//import OrgProfileCard from '../../components/orgProfileCard'
import ProcessProfileCard from '../../components/processProfileCard'
import VendorProfileCard from '../../components/vendorProfileCard'

class ProfileTypeCard extends React.Component {
  render () {
    const {
      role: {
        value,
        data,
        id,
      },
      editable,
    } = this.props
    
    return (
      <div>
        {value === 'buyer' && <BuyerProfileCard data={data} id={id} editable={editable} type={value} />}
        {value === 'seller' && <SellerProfileCard data={data} id={id} editable={editable} type={value} />}
        {/*value === 'service_provider' && <ServiceProfileCard data={data} id={id} editable={editable} type={value} />*/}
        {/*value === 'organization' && <OrgProfileCard data={data} id={id} editable={editable} type={value} />*/}
        {value === 'processor' && <ProcessProfileCard data={data} id={id} editable={editable} type={value} />}
        {value === 'vendor' && <VendorProfileCard data={data} id={id} editable={editable} type={value} />}
      </div>
    )
  }
}

export default ProfileTypeCard