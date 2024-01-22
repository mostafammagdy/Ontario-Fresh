import React, { Component } from 'react'
import { Row, Col, Grid } from 'react-flexbox-grid'
import MediaQuery from 'react-responsive'

import Paper from 'material-ui/Paper'
import AboutUsSidebar from '../aboutUsSidebar'

import styles from './styles.module.scss'


class AboutUs extends Component {
  UNSAFE_componentWillMount() {
    window.scrollTo(0, 0)
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
                <h1 className={styles.title}>About Us</h1>
                <p>The Greenbelt Fund works with businesses, broader public sector institutions and NGOs to strengthen Ontario's local food system by getting more local food onto the plates of Ontarians. At <strong>Ontario</strong><em>fresh</em>.ca we help build connections across Ontario's food-service value chain by linking Ontario institutions, food retailers, restaurants, caterers and agriculturally-focused service providers, with local growers, producers, processors and distributors. And we understand that local food is more important than ever! That's why we've expanded <strong>Ontario</strong><em>fresh</em>.ca to help consumers find local producers, processors, distributors and retailers of locally grown products. And it's more than fruits and vegetables! <strong>Ontario</strong><em>fresh</em>.ca makes it easier to find local meats, cheeses, dairy, grains and other speciality items that prioritize Ontario-grown ingredients.</p>
                <p><strong>Ontario</strong><em>fresh</em>.ca proudly adheres to Foodland Ontario's definitions of local food. In some rare cases, you may come across products on our site that do not satisfy these definitions. We do our best to ensure that businesses are transparent about where their products come from and expect businesses registered on <strong>Ontario</strong><em>fresh</em>.ca to deliver in good faith.</p>
                <p>Get to know your local producers and find your next meal on <strong>Ontario</strong><em>fresh</em>.ca!</p>
              </Paper>
              <MediaQuery maxWidth={767}><span className={styles.scrollToTop} onClick={() => window.scrollTo(0, 0)}>Back to the top</span></MediaQuery>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default AboutUs
