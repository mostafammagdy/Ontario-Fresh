import React, { Component } from 'react'
import { Row, Col, Grid } from 'react-flexbox-grid'

import Paper from 'material-ui/Paper'
import AboutUsSidebar from '../aboutUsSidebar'

import styles from './styles.module.scss'


class MarketAccess extends Component {
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
                <h1 className={styles.title}>Market Access Grant Stream</h1>

                <p>Regional aggregators and value-added service providers (often referred to as “food hubs”) are proliferating across North America as a feasible option for providing efficient local and regional value chain linkages to small and medium-sized farmers and processors. Given market trends, these services are instrumental in getting these smaller enterprises access to mainstream foodservice and retail markets.</p>
                <p>The Market Access Grant Stream aims to build on these trends by providing funding to identify and capitalize on existing market opportunities through the development of local food aggregation, co-packing, and distribution capacity, and enhancing the availability of processing and value-add services for Ontario farmers.</p>
                <p><a href="https://d3n8a8pro7vhmx.cloudfront.net/greenbeltfund/pages/44/attachments/original/1447425689/Local_Food_Investment_Fund_2015-Grant_Guidelines.pdf?1447425689" target="_blank" rel="noopener noreferrer"><strong>GRANT GUIDELINES</strong></a></p>
                <p><strong>Program Goals</strong></p>
                <p>The Market Access Grant Stream focuses on increasing market access for farmers and processors in order to increase local food choices. Its goals are:</p>
                <ol><li>To increase the amount of Ontario food products purchased by Ontario’s retailers, wholesalers, foodservice operators via local food aggregators and local processors.</li>
                <li>To increase farmers’ and processors’ access to new market channels through increased knowledge of supply chain requirements, enhanced access to aggregation services, and value added local food processing.</li>
                </ol>
                <p><strong>Areas of Focus</strong></p>
                <p>There are three areas of focus, outlined below:</p>
                <ol><li>Regional Aggregation and Food Hubs - Assist in the development and growth of food hubs and regional aggregators, increasing the number of farmers that have access to retail, wholesale, foodservice, and farmers markets</li>
                <li>Value Added Local Food Processing - Encourage and strengthen value chain relationships, and development and growth of products made with Ontario ingredients</li>
                <li>New and Emerging Markets - Assist with business intelligence, networking, and relationship building tools to assist new and emerging markets scale up and access multiple market channels</li>
                </ol>
                <p><strong><span>Some examples of activities that could form parts of a project include:</span></strong></p>
                <ul><li>Conducting a market assessment for new and emerging markets to better understand potential and to develop strategies</li>
                <li>Conducting market research and business planning to strengthen aggregators’, food hubs’, and local food processors’ ability to compete in the marketplace</li>
                <li>Expanding aggregation and distribution services to enable more Ontario farmers to sell to wholesale, foodservice, and/or retail markets</li>
                <li>Increasing the capacity for value-added processing of Ontario-grown or raised products, including services such as chopping, washing, freezing contract processing, canning, dry goods assembly, and dehydration</li>
                <li>Improving the ‘market readiness’ of Ontario-grown or raised food by enhancing capacity in terms of consistency of product characteristics, food safety certification, and/or packaging</li>
                <li>Developing training and education resources that help agriculture and local food businesses gain entry into the market place</li>
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

export default MarketAccess
