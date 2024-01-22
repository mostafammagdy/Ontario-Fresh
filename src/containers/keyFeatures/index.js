import React, { Component } from 'react'
import { Row, Col, Grid } from 'react-flexbox-grid'
import MediaQuery from 'react-responsive'

import Paper from 'material-ui/Paper'
import AboutUsSidebar from '../aboutUsSidebar'

import styles from './styles.module.scss'


class KeyFeatures extends Component {
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
                <h1 className={styles.title}>Key Features</h1>
                <p>As a professional networking site, your <strong>Ontario</strong><em>fresh</em>.ca profile will enable you to engage with other food businesses across the province. Detailed and easily accessible business and product specifications will help you determine whether or not a buyer, seller, processor, or service provider is the right fit for your business.</p>
                <p>With a variety of powerful business-to-business tools, <strong>Ontario</strong><em>fresh</em>.ca places you at the centre of the local food network like never before.</p>
                <p><strong>Shipping Calculator</strong></p>
                <p>Our innovative shipping calculator helps suppliers find shipping options that work best for them. By allowing you to compare estimates from shipping companies across Ontario, <strong>Ontario</strong><em>fresh</em>.ca users can easily find the most cost-effective option. Try it out!</p>
                <p><strong>Search</strong></p>
                <p>Our search engine filters allow users to generate tailored results quickly and easily. From processors with HACCP Certification to producers with organic rainbow carrots, <strong>Ontario</strong><em>fresh</em>.ca will help you find what you’re looking for.</p>
                <p><strong>Classifieds</strong></p>
                <p>Got a bumper crop? In need of last minute produce? The Classifieds feature allows users to buy or sell products with haste. The Classifieds are intended to facilitate opportunistic sales, purchases and other requests of interest to the <strong>Ontario</strong><em>fresh</em>.ca community.</p>
                <p><strong>Messages</strong></p>
                <p>Once you find a potential partner through the Search or Classifieds, you can send them a message directly through the platform, or you can choose to take things off-site by emailing or phoning them.</p>
              </Paper>
              <MediaQuery maxWidth={767}><span className={styles.scrollToTop} onClick={() => window.scrollTo(0, 0)}>Back to the top</span></MediaQuery>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default KeyFeatures
