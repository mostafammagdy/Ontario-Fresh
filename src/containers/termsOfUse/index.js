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
          <h1 className={styles.title}>Terms of Use</h1>

          <p>The Ontariofresh.ca Web Site is comprised of various Web pages operated by the Greenbelt Fund.</p>
          <p>The Ontariofresh.ca Web Site is offered to you conditioned on your acceptance without modification of the terms, conditions, and notices contained herein. Your registration and use of the Ontariofresh.ca Web Site constitutes your agreement to all such terms, conditions and notices.</p>
          <p>PLEASE READ THE FOLLOWING TERMS OF USE CAREFULLY BEFORE USING THE Ontariofresh.ca WEB SITE. &nbsp;IF YOU DO NOT AGREE WITH THESE TERMS OF USE, PLEASE DO NOT USE THIS SITE. &nbsp;ANY FAILURE ON YOUR PART TO COMPLY WITH THESE CONDITIONS OF USE MAY LEAD TO THE CANCELLATION OF YOUR ACCOUNT SUBSCRIPTION AND THE RELATED PRIVILEGES.</p>
          <p><u>“Member” in these Terms of Use refers to those persons who have obtained the right to use this website, and membership continues until that right terminates. A member has no rights beyond those granted in these Terms of Use.</u></p>
          <p><strong>MODIFICATION OF THESE TERMS OF USE</strong></p>
          <p>These Terms of Use may be subject to change, addition or deletion at any time. &nbsp;Any such change will be posted on this page. &nbsp;The Greenbelt Fund reserves the right to change the terms, conditions, and notices under which the Ontariofresh.ca Web Site is offered, including but not limited to the charges associated with the use of the Ontariofresh.ca Web Site. &nbsp;If you consider any future amendments made to these Terms of Use to be unacceptable, you can cancel your membership at any time.</p>
          <p><strong>LINKS TO THIRD PARTY SITES</strong></p>
          <p>The Ontariofresh.ca Web Site may contain links to other Web Sites ("Linked Sites"). The Linked Sites are not under the control of the Greenbelt Fund and the Greenbelt Fund is not responsible for the contents of any Linked Site, including without limitation any link contained in a Linked Site, or any changes or updates to a Linked Site. The Greenbelt Fund is not responsible for webcasting or any other form of transmission received from any Linked Site. The Greenbelt Fund is providing these links to you only as a convenience, and the inclusion of any link does not imply endorsement by the Greenbelt Fund&nbsp;of the site or any association with its operators.</p>
          <p><strong>USE OF COMMUNICATION SERVICES (User-to-User Communication and Sharing)</strong></p>
          <p>The Ontariofresh.ca Web Site may contain Marketplace services to advertise products, ratings and recommendations for fellow members, news, groups or communities based on specific interests, personal web pages, public and private messaging services, and/or other message or communication facilities designed to enable you to communicate with the public at large or with a group (collectively, "Communication Services"), you agree to use the Communication Services only to post, send and receive messages and material that are proper and related to the particular Communication Service. By way of example, and not as a limitation, you agree that when using a Communication Service, you will not:</p>
          <ul><li>Defame, abuse, harass, stalk, threaten or otherwise violate the legal rights (such as rights of privacy and publicity) of others.</li>
          <li>Publish, post, upload, distribute or disseminate any inappropriate, profane, defamatory, infringing, obscene, indecent or unlawful topic, name, material or information.</li>
          <li>Upload files that contain software or other material protected by intellectual property laws (or by rights of privacy of publicity) unless you own or control the rights thereto or have received all necessary consents.</li>
          <li>Upload files that contain viruses, corrupted files, or any other similar software or programs that may damage the operation of another's computer.</li>
          <li>Conduct or forward pyramid schemes or chain letters.</li>
          <li>Download any file posted by another user of a Communication Service that you know, or reasonably should know, cannot be legally distributed in such manner.</li>
          <li>Falsify or delete any author attributions, legal or other proper notices or proprietary designations or labels of the origin or source of software or other material contained in a file that is uploaded.</li>
          <li>Restrict or inhibit any other user from using and enjoying the Communication Services.</li>
          <li>Violate any code of conduct or other guidelines which may be applicable for any particular Communication Service.</li>
          <li><strong>Harvest or otherwise collect information about others, including e-mail addresses, without their consent for the purpose of selling this information to third parties. &nbsp;</strong></li>
          <li>Violate any applicable laws or regulations.</li>
          </ul><p>The Greenbelt Fund has no obligation to monitor the Communication Services. However, the Greenbelt Fund reserves the right to review materials posted to a Communication Service and to remove any materials in its sole discretion. The Greenbelt Fund reserves the right to terminate your access to any or all of the Communication Services at any time without notice for any reason whatsoever.</p>
          <p>The Greenbelt Fund reserves the right at all times to disclose any information as necessary to satisfy any applicable law, regulation, legal process or governmental request, or to edit, refuse to post or to remove any information or materials, in whole or in part, in the Greenbelt Fund’s sole discretion.</p>
          <p>Always use caution when giving out any personally identifying information about yourself in any Communication Service. The Greenbelt Fund does not control or endorse the content, messages or information found in any Communication Service and, therefore, the Greenbelt Fund specifically disclaims any liability with regard to the Communication Services and any actions resulting from your participation in any Communication Service. Members, Featured Members and/or Contributors are not authorized&nbsp;Greenbelt Fund spokespersons, and their views do not necessarily reflect those of the Greenbelt Fund.</p>
          <p>If you have an idea or information that you would like to keep confidential and/or don’t want others to use, or that is subject to third party rights that may be infringed by your sharing it, do not post it on any Ontariofresh.ca Communication Service. The Greenbelt Fund IS NOT RESPONSIBLE FOR A USER’S MISUSE OR MISAPPROPRIATION OF ANY CONTENT OR INFORMATION YOU POST IN ANY Ontariofresh.ca PAGE INCLUDING GROUPS, CONNECTIONS, RATINGS AND RECOMMENDATIONS, CLASSIFIEDS, RESOURCES, OR NEWS.</p>
          <p>Materials uploaded to a Communication Service may be subject to posted limitations on usage, reproduction and/or dissemination. You are responsible for adhering to such limitations if you download the materials.</p>
          <p><strong>MATERIALS PROVIDED TO the Greenbelt Fund<strong>&nbsp;</strong>OR POSTED AT ANY&nbsp;Greenbelt Fund<strong> </strong>WEB SITE</strong></p>
          <p>The Greenbelt Fund does not claim ownership of the materials you provide to the Greenbelt Fund&nbsp;(including feedback and suggestions) or post, upload, input or submit to the &nbsp;Ontariofresh.ca Web Site or its associated services (collectively "Submissions"). However, by posting, uploading, inputting, providing or submitting your Submission you are granting the Greenbelt Fund, its affiliated companies and necessary sublicensees permission to use your Submission in connection with the operation of their Internet businesses including, without limitation, the rights to: copy, distribute, transmit, publicly display, publicly perform, reproduce, edit, translate and reformat your Submission; and to publish your name in connection with your Submission.</p>
          <p>No compensation will be paid with respect to the use of your Submission, as provided herein. The Greenbelt Fund is under no obligation to post or use any Submission you may provide and may remove any Submission at any time in the Greenbelt Fund’s sole discretion.</p>
          <p>By posting, uploading, inputting, providing or submitting your Submission you warrant and represent that you own or otherwise control all of the rights to your Submission as described in this section including, without limitation, all the rights necessary for you to provide, post, upload, input or submit the Submissions.</p>
          <p><strong>NOTIFICATIONS AND SERVICE MESSAGES</strong></p>
          <p>For purposes of service messages and notices about the Services to you, notice shall consist of an email from Ontariofresh.ca to an email address associated with your account, even if we have other contact information. You also agree that the Greenbelt Fund&nbsp;may communicate with you through your Ontariofresh.ca account or through other means including email, mobile number, telephone, or delivery services about your Ontariofresh.ca account or services associated with Ontariofresh.ca. You acknowledge and agree that we shall have no liability associated with or arising from your failure to do so maintain accurate contact or other information, including, but not limited to, your failure to receive critical information about the Service.</p>
          <p><strong>MOBILE SERVICES</strong></p>
          <p>The Greenbelt Fund may offer the Ontariofresh.ca Services through mobile applications created by it or third party developers (“Platform Developers”). If you use the Services through a mobile device, you agree that information about your use of the Services through your mobile device and carrier may be communicated to us, including but not limited to your mobile carrier, your mobile device, or your physical location. &nbsp;By accessing the Services using a mobile device, you represent that to the extent you import any of your Ontariofresh.ca data to your mobile device that you have authority to share the transferred data with your mobile carrier or other access provider. In the event you change or deactivate your mobile account, you must promptly update your Ontariofresh.ca account information to ensure that your messages are not sent to the person that acquires your old number and failure to do so is your responsibility. You acknowledge you are responsible for all charges and necessary permissions related to accessing Ontariofresh.ca through your mobile access provider. Therefore, you should check with your provider to find out if the Services are available and the terms for these services for your specific mobile devices.</p>
          <p>Finally, by using any downloadable application to enable your use of the Services, you are explicitly confirming your acceptance of the terms of the End User License Agreement associated with the application provided at download or installation, or as may be updated from time to time.</p>
          <p><strong>LIABILITY DISCLAIMER</strong></p>
          <p>THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR AVAILABLE THROUGH THE Ontariofresh.ca WEB SITE MAY INCLUDE INACCURACIES OR TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE INFORMATION HEREIN. The Greenbelt Fund AND/OR ITS SUPPLIERS MAY MAKE IMPROVEMENTS AND/OR CHANGES IN THE Ontariofresh.ca WEB SITE AT ANY TIME.</p>
          <p>ADVICE RECEIVED VIA THE Ontariofresh.ca WEB SITE SHOULD NOT BE RELIED UPON FOR PERSONAL, MEDICAL, LEGAL OR FINANCIAL DECISIONS AND YOU SHOULD CONSULT AN APPROPRIATE PROFESSIONAL FOR SPECIFIC ADVICE TAILORED TO YOUR SITUATION.&nbsp;</p>
          <p>The Greenbelt Fund AND/OR ITS SUPPLIERS MAKE NO REPRESENTATIONS ABOUT THE SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, AND ACCURACY OF THE INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS CONTAINED ON THE Ontariofresh.ca WEB SITE FOR ANY PURPOSE. &nbsp;TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ALL SUCH INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS ARE PROVIDED "AS IS" WITHOUT WARRANTY OR CONDITION OF ANY KIND. The Greenbelt Fund AND/OR ITS SUPPLIERS HEREBY DISCLAIM ALL WARRANTIES AND CONDITIONS WITH REGARD TO THIS INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS, INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT.&nbsp;</p>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL the Greenbelt Fund AND/OR ITS SUPPLIERS BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF USE, DATA OR PROFITS, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OR PERFORMANCE OF THE Ontariofresh.ca WEB SITE, WITH THE DELAY OR INABILITY TO USE THE Ontariofresh.ca WEB SITE OR RELATED SERVICES, THE PROVISION OF OR FAILURE TO PROVIDE SERVICES, OR FOR ANY INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS OBTAINED THROUGH THE Ontariofresh.ca WEB SITE, OR OTHERWISE ARISING OUT OF THE USE OF THE Ontariofresh.ca WEB SITE, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, EVEN IF the Greenbelt Fund&nbsp;OR ANY OF ITS SUPPLIERS HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES. BECAUSE SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU.</p>
          <p>IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE Ontariofresh.ca WEB SITE, OR WITH ANY OF THESE TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE Ontariofresh.ca WEB SITE.</p>
          <p><strong>INDEMNITY</strong></p>
          <p>You agree to indemnify the Greenbelt Fund, its officers, agents, partners and employees from any and all claims or damages, including reasonable lawyer’s fees, made by third parties due to, or arising out of theyour use of the Ontariofresh.ca Web Site or connection to the Ontariofresh.ca Web Site, violation of the Terms of Use, or any violation of the rights of another.</p>
          <p><strong>MINORS</strong></p>
          <p>If you are under the age of 18, you may only use this Site in conjunction with and under the supervision of your parents or guardians.&nbsp;</p>
          <p><strong>PROMOTIONS</strong></p>
          <p>The Greenbelt Fund&nbsp;may offer, either on, off or through the Ontariofresh.ca Web Site, contests, promotions or games (“Promotions”). &nbsp;You agree to release the Greenbelt Fund and its agents, advertisers, sponsors and/or promotional partners, from all liability arising from participation in any Promotion located on, or accessed through the Site or through the email communication or advertising. &nbsp;You agree to be bound by the rules of any Promotion. If you violate any such rules or guidelines for behaviour posted on the Site, you will be subject to immediate disqualification and will become ineligible to be awarded any prizes. &nbsp;The Greenbelt Fund reserves the right to cancel, terminate or alter any Promotion or the rules thereof at any time without prior notification.&nbsp;</p>
          <p><strong>COMPLAINTS REGARDING CONTENT POSTED ON THE ONTARIOFRESH.CA WEBSITE</strong></p>
          <p>Ontariofresh.ca was created with the purpose of increasing the amount of Ontario grown food bought and sold within the Province of Ontario and to encourage successful business relationships between stakeholders along the food service value chain. &nbsp;In order to achieve this goal, we encourage our Members to share truthful and accurate information. We also respect the intellectual property rights of others. Accordingly, this Agreement requires that information posted by Users be accurate and not in violation of the intellectual property rights or other rights of third parties. &nbsp;</p>
          <p>If you have a complaint about information posted by another User, outside of a Copyright violation, please send an email providing all details regarding the complaint to <a href="mailto:info@ontariofresh.ca">info@ontariofresh.ca</a>.</p>
          <p><strong>CANCELLATION</strong></p>
          <p>You can cancel your membership at any time by accessing the ‘Account Settings’ Web Page within the Ontariofresh.ca Web Site. &nbsp;</p>
          <p>The Greenbelt Fund can, at its sole discretion, cancel or suspend your membership in whole or in part for any reason, including, without limitation, the non-compliance with these Terms of Use.</p>
          <p><strong>PRIVACY</strong></p>
          <p>By accepting these Terms of Use, you are giving permission to the&nbsp;Greenbelt Fund to publicly display your business information on the Ontariofresh.ca Web Site, and acknowledging that your business information will be searchable via the Internet.</p>
          <p>For further information regarding the Greenbelt Fund’s policies and practices relating to the collection, use and storage of personal information please read our <a href="http://mail.quizative.com:8080/node/268" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</p>
          <p><strong>ASSIGNMENT</strong></p>
          <p>The Greenbelt Fund may assign any or all of its rights hereunder to any party without your consent. &nbsp;You are not permitted to assign any of your rights or obligations under these Conditions of Use without the prior written consent of the Greenbelt Fund, and any such attempted assignment will be void and unenforceable.&nbsp;</p>
          <p><strong>GOVERNING LAW</strong></p>
          <p>The laws of the province of Ontario and the laws of Canada shall govern these Terms of Use as well as any use of the Ontariofresh.ca Web Site.</p>
          <p><strong>ENTIRE AGREEMENT</strong></p>
          <p>These Terms and Conditions, together with our Privacy Policy constitute the entire agreement between you and the Greenbelt Fund regarding your use of the Ontariofresh.ca Web Site, and supersede all prior or contemporaneous communications whether electronic, oral or written between you and the Greenbelt Fund&nbsp;regarding your use of the Ontariofresh.ca Web Site.</p>
          <p><strong>HOW TO CONTACT US ABOUT THIS POLICY</strong></p>
          <p>If you have any questions regarding these Terms of Use, you can reach us at:&nbsp;</p>
          <p><a href="mailto:info@ontariofresh.ca">info@ontariofresh.ca</a></p>
        </Paper>
        <span className={styles.scrollToTop} onClick={() => window.scrollTo(0, 0)}>Back to the top</span>
      </div>
    )
  }
}

export default ContactUs
