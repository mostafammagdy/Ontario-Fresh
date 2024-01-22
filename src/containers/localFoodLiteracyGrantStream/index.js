import React, { Component } from 'react'
import { Row, Col, Grid } from 'react-flexbox-grid'

import Paper from 'material-ui/Paper'
import AboutUsSidebar from '../aboutUsSidebar'

import styles from './styles.module.scss'


class LocalFoodLiteracy extends Component {
  UNSAFE_componentWillMount() {
    document.body.style.backgroundColor = "#F5F4F5";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  render () {
    return (
      <div className={styles.pageContainer}>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={3}>
              <AboutUsSidebar />
            </Col>
            <Col xs={12} sm={9}>
              <Paper style={{ padding: '1rem' }}>
                <h1 className={styles.title}>Local Food Literacy Grant Stream</h1>
                <p>Significant work on local food literacy is already taking place. Public education campaigns at the point of sale, such as work done by Foodland Ontario and Feast ON, have had a significant impact. Organizations such as Farmers’ Markets Ontario and the Greenbelt Farmers’ Market Network support farmers’ markets as key places where consumers interact with growers, learn about where food comes from, and can access a range of local food products. Information sharing among stakeholders in the agricultural system is supported by, among other organizations, Farm and Food Care. Many more organizations are holding awareness and educational events, preparing resource materials, and engaging stakeholders.</p>
                <p><strong><span>Program Goals</span></strong></p>
                <p>The Local Food Literacy Stream aims to support work that builds on these initiatives, addressing gaps in the existing work to lead towards a stronger local agriculture system. Its goals are:&nbsp;</p>
                <ol><li>To increase awareness and knowledge of local food, its availability, and local food skills to maximize local food usage among consumers, retailers, wholesalers, foodservice operators, associations, and governments.</li>
                <li>To increase farmers’ and commodity organizations’ ability to communicate the value of their products to retailers, wholesalers, foodservice operators, and consumers.</li>
                </ol>
                <p><strong>Areas of Focus</strong></p>
                <p>There are four areas of focus, as outlined below:</p>
                <ol><li>Consumer Awareness - Increase consumers’ awareness and understanding of local food products, when they are available, where to find them, and how to prepare them</li>
                <li>Value-chain Relationships - Encourage and strengthen value chain relationships among local food industry stakeholders to deepen understanding of the local products, how to use them, and how to promote them</li>
                <li>Local/Regional Agriculture System - Increase the awareness of what is required for a viable local agricultural system among municipal governments and other public agencies, and not-for-profit organizations</li>
                <li>Communication and Marketing - Improve farmers’ and commodity organizations’ ability to communicate the value of their products through educating retailers, wholesalers, foodservice operators’ staff, and consumers</li>
                </ol>
                <p><strong>Some examples of activities that could form parts of a project include:</strong></p>
                <ul><li>Organizing local food events or competitions to promote increased awareness of seasonality and benefits of locally-grown food among consumers</li>
                <li>Convening stakeholders to address barriers and strengthen relationships along the value chain and to promote the who, where, and how’s of local food</li>
                <li>Developing and delivering local food education or training sessions that could incorporate farm visits, on-farm education, and workshops to increase local food skills, knowledge, and awareness</li>
                <li>Developing and producing educational/training materials, point-of-sale materials, promotional resources, such as videos or other digital tools</li>
                </ul>
                <p><strong>Note that projects that exclusively address the following issues are not the main focus of this grant program (although they can be aspects of eligible projects):</strong></p>
                <ul><li><span>Health and nutrition</span></li>
                <li>Community development</li>
                <li>Gardening skills development</li>
                </ul>
                <p><span>Contact:</span></p>
                <p>
                  <span>Franco Naccarato</span>
                  <br />
                  <span>Program Manager</span>
                  <br />
                  <span>Greenbelt Fund</span>
                  <br />
                  <a href="mailto:fnaccarato@greenbeltfund.ca">fnaccarato@greenbeltfund.ca</a>
                </p>
              </Paper>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default LocalFoodLiteracy
