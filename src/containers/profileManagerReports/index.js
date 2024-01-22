import React, { Component } from 'react'

import { connect } from 'react-redux'
import { compose } from 'recompose'

//import { map } from 'lodash'
import { Row, Col, Grid } from 'react-flexbox-grid'

import StyledCard from '../../components/styledCard'
import BarChart from '../../components/barChart'
import PieChart from '../../components/pieChart'

import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

import { 
  reportOrganizationBusinessTypesRequesting,
} from './actions'

import styles from './styles.module.scss'

const roles = ["", "Buyer", "Seller", "Processor", "Service Provider", "Organization"]

class ProfileManager extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedBusinessType: 0 };
  }

  UNSAFE_componentWillMount() {
    document.body.style.backgroundColor = "#F5F4F5"

    if (this.props.client && this.props.client.token) {
      this.props.reportOrganizationBusinessTypesRequesting(this.props.client, this.props.params.slug)
    }
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null
  }

  render () {
    const {
      reports
    } = this.props

    return (
      <div>
        <Grid fluid className={styles.dashboardPageContainer}>
          <Row>
            <Col xs={12} sm={4}>
              { 
                reports.businessTypes &&
                <StyledCard cardText={
                  <PieChart
                    data={reports.businessTypes.map(d => ({ count: d.count, label: roles[d.role] }))} 
                  />
                } />
              }
            </Col>
            <Col xs={12} sm={8}>
              { 
                reports.businessTypes &&
                <StyledCard cardText={
                  <BarChart
                    data={reports.businessTypes.map(d => ({ count: d.count, label: roles[d.role] }))} 
                  />
                } />
              }
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {
                reports.categoriesByBusinessType &&
                <div>
                  <div className={styles.alignLeft}>
                    <DropDownMenu
                      value={this.state.selectedBusinessType}
                      onChange={(event, index, value) => this.setState({ selectedBusinessType: value })}
                      iconStyle={{ fill: 'black' }}
                    >
                      <MenuItem value={0} primaryText="Select Business Type" />
                      {
                        reports.availableBusinessTypes.map(t => (<MenuItem key={t} value={t} primaryText={roles[t]} />))
                      }
                    </DropDownMenu>
                  </div>
                  <StyledCard cardText={
                    <BarChart
                      data={reports.categoriesByBusinessType.filter(d => d.role === this.state.selectedBusinessType).map(d => ({ count: d.count, label: d.category }))} 
                    />
                  } />
                </div>
              }
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  reports: state.profileManagerReports,
})

export default compose(
  connect(mapStateToProps,
  {
    reportOrganizationBusinessTypesRequesting,
  })
)(ProfileManager)