import React, { Component } from 'react'

import Paper from 'material-ui/Paper'

import styles from './styles.module.scss'


class ContactUs extends Component {
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
        <Paper style={{ padding: '1rem' }}>
          <h1 className={styles.title}>Contact Us</h1>

          <p>Thanks for your interest in <strong>Ontario</strong><em>fresh</em>.ca! We look forward to speaking with you.</p>
          <p>For general inquiries and feedback, please contact us at: <a href="mailto:info@ontariofresh.ca">info@ontariofresh.ca</a> or <strong><a href="tel:14169600001,311">(416) 960-0001 x311</a></strong>.</p>
          <p>For assistance with technical issues, please email: <a href="mailto:support@ontariofresh.ca">support@ontariofresh.ca</a>.</p>
        </Paper>
      </div>
    )
  }
}

export default ContactUs
