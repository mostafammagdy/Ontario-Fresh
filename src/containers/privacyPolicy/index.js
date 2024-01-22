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
          <h1 className={styles.title}>Privacy Policy</h1>
          <p>The Greenbelt Fund values the privacy of personal information provided by you to our organization.</p>
          <p>We shall only collect the personal information that we require to fulfill our obligations to you, and our funders.</p>
          <p>We shall use and share personal information only for the purpose stated when it was provided to us by you, or with your agreement.</p>
          <p>We will store personal information securely to prevent unauthorized use.  We will destroy personal information when we no longer need it.</p>
          <p>You may, on request, have access to any personal information about you that we have.  We will correct any errors in personal information that you bring to our attention.  Our privacy officer will ensure that we follow the principles of the Personal Information Protection and Electronic Documents Act.  He/she will receive and follow up on any inquiries or complaints about how we collect, use, and share personal information.</p>
          <p>By applying for the right to use the Ontariofresh.ca website, you agree to the Terms of Use and this Privacy Policy.</p>
          <p>You understand that the Greenbelt Fund is gathering personal information and other information for the purpose of assisting Ontario growers and producers to tell the public about their crops/farm products and to help buyers and distributors of food to locate Ontario’s growers and producers.</p>
          <p>You give consent to the Greenbelt Fund to collect, use, and disclose to the public the personal and other information I provide to it through the Ontariofresh.ca website to develop and maintain a searchable, publicly accessible, online database of growers/producers, buyers, distributors, and others with a stake in Ontario’s agricultural sector.</p>
          <p><strong>Collection of your Personal Information</strong></p>
          <p>Through registration on the Ontariofresh.ca website, the Greenbelt Fund collects personally identifiable information, such as your e-mail address, name, home or work address or telephone number, and detailed information about your business with the purpose of creating a publically searchable profile on the Ontariofresh.ca website. Through the Ontariofresh.ca Web Site, the Greenbelt Fund may also collect anonymous demographic information, which is not unique to you, such as your postal code, age, gender, preferences, interests and favourites.</p>
          <p>There is also information about your computer hardware and software that is automatically collected by the Greenbelt Fund through the Ontariofresh.ca website. This information can include: your IP address, browser type, domain names, access times and referring Web site addresses. This information is used by the Greenbelt Fund for the operation of the service, to maintain quality of the service, and to provide general statistics regarding use of the Ontariofresh.ca Web site.</p>
          <p>Please keep in mind that if you directly disclose personally identifiable information or personally sensitive data through Ontariofresh.ca public message boards, this information may be collected and used by others. Note: the Greenbelt Fund does not read any of your private online communications.</p>
          <p>The Greenbelt Fund encourages you to review the privacy statements of Web sites you choose to link to from Ontariofresh.ca so that you can understand how those Web sites collect, use and share your information. The Greenbelt Fund is not responsible for the privacy statements or other content on Web sites outside of the Ontariofresh.ca Web Site.</p>
          <p><strong>Use of your Personal Information</strong></p>
          <p>The Greenbelt Fund collects and uses your personal information to operate the Ontariofresh.ca Web site and deliver the services offered by the Web Site. Information you provide to the website is intended to be made available to the public, and/or to other registrants. The Greenbelt Fund also uses your personally identifiable information to inform you of other products or services available from the Greenbelt Fund and our affiliates. The Greenbelt Fund may also contact you via surveys to conduct research about your opinion of current services or of potential new services that may be offered by the Ontariofresh.ca Web Site.</p>
          <p>The Greenbelt Fund does not sell, rent or lease its member lists to third parties. The Greenbelt Fund may share data with trusted partners to help us perform statistical analysis, send you email or postal mail, provide customer support, or arrange for deliveries. All such third parties are prohibited from using your personal information except to provide these services to the Greenbelt Fund, and they are required to maintain the confidentiality of your information.</p>
          <p>The Greenbelt Fund does not collect, use or disclose sensitive personal information, such as race, religion, or political affiliations.</p>
          <p>The Greenbelt Fund keeps track of the Web sites and pages our customers visit within the Ontariofresh.ca Web Site, in order to determine what Ontariofresh.ca services are the most popular. This data is used to deliver customized content and advertising within Ontariofresh.ca to members whose behaviour indicates that they are interested in a particular subject area.</p>
          <p><strong>Your Information Choices</strong></p>
          <p>The Account Settings section of the Ontariofresh.ca Web Site will allow you to review, enhance or edit your personal information through your personal profile page, control the messages you receive from the Ontariofresh.ca Web Site and the Greenbelt Fund as well as other Users and how these messages are sent.  You can change your settings at any time and also tell us to delete your profile from Ontariofresh.ca.</p>
          <p><strong>Use of Cookies</strong></p>
          <p>The Ontariofresh.ca Web site uses "cookies" to help you personalize your online experience. A cookie is a text file that is placed on your hard disk by a Web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you, and can only be read by a web server in the domain that issued the cookie to you.</p>
          <p>One of the primary purposes of cookies is to provide a convenience feature to save you time. The purpose of a cookie is to tell the Web server that you have returned to a specific page.</p>
          <p>You have the ability to accept or decline cookies.</p>
          <p><strong>Changes to this Statement</strong></p>
          <p>The Greenbelt Fund will occasionally update this Statement of Privacy to reflect company and customer feedback. The Greenbelt Fund encourages you to periodically review this Statement to be informed of how the Greenbelt Fund is protecting your information.</p>
          <p><strong>Contact Information</strong></p>
          <p>The Greenbelt Fund welcomes your comments regarding this Privacy Policy. If you believe the Greenbelt Fund has not adhered to this Statement, please contact us at <a href="mailto:info@ontariofresh.ca">info@ontariofresh.ca</a>. We will use commercially reasonable efforts to promptly determine and remedy the problem.</p>
        </Paper>
        <span className={styles.scrollToTop} onClick={() => window.scrollTo(0, 0)}>Back to the top</span>
      </div>
    )
  }
}

export default ContactUs
