import React from 'react'

import StyledCard from '../styledCard';
import PieChart from '../pieChart';

class BusinessTypePieChart extends React.Component {

  render () {
    const { data } = this.props;
    return (
      <StyledCard cardText={
        <PieChart data={data.map(d => ({ count: d.count, label: d.role }))} />
      } />
    )
  }
}

export default BusinessTypePieChart
