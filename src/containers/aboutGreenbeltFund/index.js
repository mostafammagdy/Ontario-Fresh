import React, { Component } from 'react'
import { Row, Col, Grid } from 'react-flexbox-grid'
import MediaQuery from 'react-responsive'

import Paper from 'material-ui/Paper'
import AboutUsSidebar from '../aboutUsSidebar'

import styles from './styles.module.scss'


class AboutGreenbeltFund extends Component {
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
                <h1 className={styles.title}>About the Greenbelt Fund</h1>

                <p><strong>Ontario</strong><em>fresh</em>.ca is administered by the Greenbelt Fund; a non-profit organization that supports and enhances the viability, integrity, and sustainability of agriculture in Ontario.</p>
                <p>For more details, visit the <a href="http://greenbeltfund.ca/" rel="noopener noreferrer" target="_blank">Greenbelt Fund</a> website.</p>
              </Paper>
              <MediaQuery maxWidth={767}><span className={styles.scrollToTop} onClick={() => window.scrollTo(0, 0)}>Back to the top</span></MediaQuery>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default AboutGreenbeltFund
