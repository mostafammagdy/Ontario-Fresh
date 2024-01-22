import React from 'react'

import BarChart from '../barChart'
import StyledCard from '../styledCard'

class BusinessTypeBarGraph extends React.Component {

  componentDidMount() {
    const {
      graphID,
      data
    } = this.props
  }

  render () {
    const {
      data
    } = this.props

    return (
      <StyledCard cardText={
        <BarChart
          data={data.map(d => ({ count: d.count, label: d.role }))} 
        />
      } />
    )
  }
}

export default BusinessTypeBarGraph