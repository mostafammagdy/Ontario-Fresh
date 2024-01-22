import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import CancelIcon from 'material-ui/svg-icons/navigation/cancel'
import ConfirmationDialog from '../../components/confirmationDialog'

import cx from '../../utils/class-names'
import { describeRoles } from '../../utils/warnings'
import { map } from 'lodash'

import styles from './styles.module.scss'

class RoleSelector extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accounts: props.initialRoles ? (props.initialRoles.length < 4 ? [...props.initialRoles, undefined] : props.initialRoles) : [],
      confirmWithUser: false,
      index: -1
    }
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    initialRoles: PropTypes.arrayOf(PropTypes.number)
  }

  changeAccounts = (event, index, value) => {

    /*
      ALERT: This is where the user prepares to change their profiles.
    */

    let accounts = JSON.parse(JSON.stringify(this.state.accounts))
    accounts[accounts.length - 1] = value
    this.setState({
      accounts
    })
    if (this.props.onChange) {
      this.props.onChange(accounts)
    }
  }

  addAccount = () => {
    let accounts = JSON.parse(JSON.stringify(this.state.accounts))
    accounts.push(undefined)
    this.setState({
      accounts
    })
    if (this.props.onChange) {
      this.props.onChange(accounts)
    }
  }

  removeAccount = (index) => {
    if (this.state.accounts.length > 0) {
      let accounts = this.state.accounts.filter(accountValue => accountValue !== this.state.accounts[index])
      this.setState({
        accounts
      })

      if (this.props.onChange) {
        this.props.onChange(accounts)
      }
    }
  }

  shouldAddMore = () => this.state.accounts[this.state.accounts.length - 1] !== undefined && this.state.accounts.length < 5

  handleClick = (index) => {
    this.setState({
      confirmWithUser: true,
      index
    })
  }

  handleConfirm = () => {
    if (this.state.index > -1) {
      this.removeAccount(this.state.index)
    }

    this.setState({
      confirmWithUser: false,
      index: -1
    })
  }

  handleClose = () => {
    this.setState({
      confirmWithUser: false,
      index: -1
    })
  }

  render() {

    console.log('%c roleSelector Props:', 'color: red; font-weight: bold;')
    console.log({ props: this.props })

    // const roleValuesToLabel = [ 'SELLER', 'BUYER', 'PROCESSOR', 'SERVICE PROVIDER', 'ORGANIZATION' ]
    const roleValuesToLabel = [ 'SELLER', 'BUYER', 'PROCESSOR', 'SERVICE PROVIDER', 'ORGANIZATION', 'VENDOR' ]
    const allRoleChoices = [
      <MenuItem key={2} value={2} primaryText={roleValuesToLabel[0]} />,
      <MenuItem key={1} value={1} primaryText={roleValuesToLabel[1]} />,
      <MenuItem key={5} value={5} primaryText={roleValuesToLabel[2]} />,
      <MenuItem key={3} value={3} primaryText={roleValuesToLabel[3]} />,
      <MenuItem key={4} value={4} primaryText={roleValuesToLabel[4]} />,
      <MenuItem key={6} value={6} primaryText={roleValuesToLabel[5]} />,
    ]

    //The selectedChoices array maps to: [seller, buyer. processor, service provider, organization, vendor]
    // const selectedChoices = [ false, false, false, false, true ]
    const selectedChoices = [ false, false, false, false, true, false ]
    // const mapAccountValueToChoiceIndex = [ 1, 0, 3, 4, 2 ]
    const mapAccountValueToChoiceIndex = [1, 0, 3, 4, 2, 5]

    return (
      <div>
        {map(this.state.accounts, (number, index) => {
          let currentChoices = []
          for (let i = 0; i < selectedChoices.length; i++) {
            if (!selectedChoices[i]) {
              currentChoices.push(allRoleChoices[i])
            }
          }
          selectedChoices[mapAccountValueToChoiceIndex[number - 1]] = true

          return <div key={index}>
            <div className={styles.roleRow}>
              <div className={styles.roleDescription}>
                <div className={styles.roleDescriptionText}>
                  {!Number.isInteger(this.state.accounts[index]) ?
                  [
                    <h5 key='noRolePrompt' className={styles.roleTitle}>Select a type to add</h5>,
                    <DropDownMenu
                      key='selectRole'
                      onChange={this.changeAccounts}
                      className={styles.roleDropdown}
                      style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px' }}
                      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                      iconStyle={{ fill: 'black', right: 0 }}
                      underlineStyle={{ border: 'none' }}
                    >
                      {currentChoices}
                    </DropDownMenu>
                  ]
                  :
                  [
                    <h5 key={number} className={styles.roleTitle}><strong>{roleValuesToLabel[mapAccountValueToChoiceIndex[this.state.accounts[index] - 1]]}</strong></h5>,
                    describeRoles([number])
                  ]
                  }
                </div>
                {this.state.accounts.length > 1 && this.state.accounts[index] &&
                <CancelIcon className={styles.deleteRole} onClick={() => this.handleClick(index)} style={{width: 40}} />
                }
              </div>
            </div>
          </div>
        })}
        <p className={styles.contactUs}>Are you a member based organization or a farmers’ market looking to expand your visibility?<br />
          Contact us @ <a href='mailto:support@ontariofresh.ca'>support@ontariofresh.ca</a> to learn more!</p>
        {this.shouldAddMore() && <div className={cx(styles.roleRow, styles.roleAddMore)} onClick={() => this.addAccount()}>+ Add more</div>}
        <ConfirmationDialog
          open={this.state.confirmWithUser}
          confirmationTitle={'Confirmation Required'}
          confirmationMessage={'Removing an account type will cause you to lose your information for this role.'}
          confirmationLabel={'Confirm'}
          cancelLabel={'Cancel'}
          handleConfirm={this.handleConfirm}
          handleClose={this.handleClose}
        />
      </div>
    )
  }
}

export default RoleSelector
