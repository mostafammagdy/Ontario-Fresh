import React from 'react'
import MediaQuery from 'react-responsive'

import { Row, Col } from 'react-flexbox-grid'
import styles from './styles.module.scss'

import OntarioTrilliumFoundationLogo from '../../assets/images/ontario-trillium-foundation-logo.jpg'
import ProvinceOfOntarioLogo from '../../assets/images/province-of-ontario-logo.jpg'
import GreenbeltLogo from '../../assets/images/greenbelt-logo.png'
import Facebook from '../../assets/images/facebook.svg'
import Linkedin from '../../assets/images/linkedin.svg'
import Twitter from '../../assets/images/twitter.svg'
import Youtube from '../../assets/images/youtube.svg'
import Email from '../../assets/images/email.svg'


class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.footer}>
        <Row>
          <Col xs={12} sm={7} className={styles.footerColumn}>
            <MediaQuery minWidth={401}>
              <h4>This initiative is proudly supported by:</h4>
            </MediaQuery>
            <MediaQuery maxWidth={400}>
              <p style={{fontSize: 13}}>This initiative is proudly supported by:</p>
            </MediaQuery>
            <Row>
              <Col xs={12} sm={4}>
                <a href="https://otf.ca/" rel="noopener noreferrer" target="_blank">
                  <img alt="Ontariofresh.ca is proudly supported by the Ontario Trillium Foundation" src={OntarioTrilliumFoundationLogo} style={{ width: '100%' }} />
                </a>
              </Col>
              <Col xs={12} sm={4}>
                <a href="https://www.ontario.ca/page/government-ontario" rel="noopener noreferrer" target="_blank">
                  <img alt="Ontariofresh.ca is proudly supported by the Province of Ontario" src={ProvinceOfOntarioLogo} style={{ width: '100%' }} />
                </a>
              </Col>
              <Col xs={12} sm={4}>
                <a href="http://www.greenbelt.ca/" rel="noopener noreferrer" target="_blank">
                  <img alt="For information on grants and programs, visit https://greenbeltfund.ca" src={GreenbeltLogo} style={{ width: '100%' }} />
                </a>
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={5} className={styles.footerColumn}>
            <Row>
              <Col xs={6}>
                <div className={styles.footerButton}>
                  <a className={styles.footerButtonText} href="/about-us">
                    ABOUT US
                  </a>
                </div>
                <div className={styles.footerButton}>
                  <a className={styles.footerButtonText} href="/contact-us">
                    CONTACT US
                  </a>
                </div>
                <div className={styles.footerButton}>
                  <a className={styles.footerButtonText} href="/terms-use">
                    TERMS OF USE
                  </a>
                </div>
                <div className={styles.footerButton}>
                  <a className={styles.footerButtonText} href="/privacy-policy">
                    PRIVACY POLICY
                  </a>
                </div>
              </Col>
              <Col xs={6}>
                <div style={{display: "flex", marginTop: 45, justifyContent: "space-between"}}>
                  <a className={styles.footerButtonText} href="https://www.facebook.com/ontariofresh" rel="noopener noreferrer" target="_blank">
                      <img src={Facebook} alt="" style={{width: 36, height: 36}} />
                  </a>
                  <a className={styles.footerButtonText} href="https://www.linkedin.com/company/1312074/" rel="noopener noreferrer" target="_blank">
                      <img src={Linkedin} alt="" style={{width: 36, height: 36}} />
                  </a>
                  <a className={styles.footerButtonText} href="https://twitter.com/ontariofresh" rel="noopener noreferrer" target="_blank">
                      <img src={Twitter} alt="" style={{width: 36, height: 36}} />
                  </a>
                  <a className={styles.footerButtonText} href="https://www.youtube.com/user/Ontariofresh" rel="noopener noreferrer" target="_blank">
                      <img src={Youtube} alt="" style={{width: 36, height: 36}}  />
                  </a>
                  <a className={styles.footerButtonText} href="mailto:info@ontariofresh.ca">
                      <img src={Email} alt="" style={{width: 36, height: 36}} />
                  </a>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className={styles.copyText}>&copy; {(new Date()).getFullYear()} Greenbelt Fund. All rights reserved.</div>
      </footer>
    )
  }
}

export default Footer