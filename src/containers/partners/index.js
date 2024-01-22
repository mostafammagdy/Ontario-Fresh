import React, { Component } from 'react'
import { Row, Col, Grid } from 'react-flexbox-grid'
import MediaQuery from 'react-responsive'

import Paper from 'material-ui/Paper'
import AboutUsSidebar from '../aboutUsSidebar'

import styles from './styles.module.scss'


class Partners extends Component {
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
                <h1 className={styles.title}>Meet Our Partners!</h1>

                <p><strong>Ontario</strong><em>fresh</em>.ca is partnering with agri-food organizations, associations, and networks from across Ontario to make big noise about local food.</p>
                <p>We’ve enabled ‘Buy Local’ Networks to create, edit and manage profiles for their members on <strong>Ontario</strong><em>fresh</em>.ca. This helps their members to gain visibility and access new business opportunities.</p>
                <p>Collaboration is the name of local-food game, so check out the amazing work of our partners and regional brands:</p>
                <p>
                  <a href="http://norfolkfarms.com/" target="_blank" rel="noopener noreferrer">Direct From Norfolk County</a>
                  <br />
                  <a href="https://feaston.ontarioculinary.com/" target="_blank" rel="noopener noreferrer">Feast ON, Ontario Culinary Tourism Alliance</a>
                  <br />
                  <a href="http://www.locallylambton.com/" target="_blank" rel="noopener noreferrer">Locally Lambton</a>
                  <br />
                  <a href="http://www.organiccouncil.ca/" target="_blank" rel="noopener noreferrer">Organic Council of Ontario</a>
                  <br />
                  <a href="http://www.tastereal.ca/" target="_blank" rel="noopener noreferrer">taste•real Guelph Wellington Local Food</a>
                  <br />
                  <a href="https://www.tourismoxford.ca/listing.aspx?categoryid=726" target="_blank" rel="noopener noreferrer">Oxford Fresh</a>
                  <br />
                  <a href="http://buyalgoma.ca/" target="_blank" rel="noopener noreferrer">Buy Algoma. Buy Local</a>
                </p>
                <p>Interested in becoming a ‘Buy Local’ Network on Ontariofresh.ca? Contact us at <a href="mailto:info@ontariofresh.ca">info@ontariofresh.ca</a> or <a href="tel:14169600001,311">(416) 960-0001 x311</a>.</p>
              </Paper>
              <MediaQuery maxWidth={767}><span className={styles.scrollToTop} onClick={() => window.scrollTo(0, 0)}>Back to the top</span></MediaQuery>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Partners
