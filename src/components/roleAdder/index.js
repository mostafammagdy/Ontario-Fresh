import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import CancelIcon from 'material-ui/svg-icons/content/clear'
import { describeRoles } from '../../utils/warnings'
import { map, drop, first, pull } from 'lodash'

import styles from './styles.module.scss'

class RoleAdder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      primaryAccount: props.initialRoles ? props.initialRoles[0] : undefined,
      accounts: props.initialRoles ? drop(props.initialRoles, 1) : [],
    }
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    initialRoles: PropTypes.arrayOf(PropTypes.number)
  }

  changePrimaryAccount = (event, index, value) => {
    this.setState({
      primaryAccount: value,
      accounts: []
    })
    if (this.props.onChange) {
      this.props.onChange(value, [])
    }
  }

  changeAccounts = (event, index, value) => {
    let accounts = JSON.parse(JSON.stringify(this.state.accounts))
    accounts[accounts.length - 1] = value
    this.setState({
      accounts
    })
    if (this.props.onChange) {
      this.props.onChange(this.state.primaryAccount, accounts)
    }
  }

  addAccount = () => {
    let accounts = JSON.parse(JSON.stringify(this.state.accounts))
    accounts.push(undefined)
    this.setState({
      accounts
    })
    if (this.props.onChange) {
      this.props.onChange(this.state.primaryAccount, accounts)
    }
  }

  removeAccount = (index) => {
    if (this.state.accounts.length > 0) {
      let accounts = pull(this.state.accounts, this.state.accounts[index])
      this.setState({
        accounts
      })

      if (this.props.onChange) {
        this.props.onChange(this.state.primaryAccount, accounts)
      }
    }
  }

  removePrimaryAccount = () => {
    const primaryAccount = first(this.state.accounts)
    const accounts = drop(this.state.accounts, 1)
    this.setState({
      primaryAccount: primaryAccount,
      accounts: accounts
    })

    if (this.props.onChange) {
      this.props.onChange(primaryAccount, accounts)
    }
  }

  shouldAddMore = () => {
    const { primaryAccount, accounts } = this.state
    if (!primaryAccount || (accounts.length > 0 && accounts[accounts.length - 1] === undefined)) { //if the user clicked "Add More" but has not selected a role yet
      return false;
    }

    return (accounts.length < 3)
  }

  render() {
    const allRoleChoices = [
      <MenuItem key={2} value={2} primaryText="SELLER" />,
      <MenuItem key={1} value={1} primaryText="BUYER" />,
      <MenuItem key={5} value={5} primaryText="PROCESSOR" />,
      <MenuItem key={3} value={3} primaryText="SERVICE PROVIDER" />,
      <MenuItem key={6} value={6} primaryText="VENDOR" />,
    ]

    //The selectedChoices array maps to: [seller, buyer. processor, service provider, organization]
    const selectedChoices = [false, false, false, false, true]
    const mapAccountValueToChoiceIndex = [1, 0, 3, 4, 2]
    selectedChoices[mapAccountValueToChoiceIndex[this.state.primaryAccount - 1]] = true

    return (
      <div>
        <div className={styles.roleRow} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>
            I am a
            <DropDownMenu
              value={this.state.primaryAccount}
              disabled={!!this.state.accounts.length && Number.isInteger(this.state.primaryAccount)}
              onChange={this.changePrimaryAccount}
              className={styles.roleDropdown}
              style={{ fontSize: 18, boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px' }}
              iconStyle={{ fill: 'black', right: 0 }}
              underlineStyle={{ border: 'none' }}
            >
              {allRoleChoices}
            </DropDownMenu>
            in Ontario's local food sector.
          </span>
          { this.state.accounts.length > 0 && this.state.accounts[0] !== undefined &&
            <CancelIcon className={styles.deleteRole} onClick={() => this.removePrimaryAccount()} />
          }
        </div>
        <div className={styles.roleRow}>
          {this.state.primaryAccount &&
            <div className={styles.roleDescription}>
              <div className={styles.roleDescriptionText}>
                {describeRoles([this.state.primaryAccount])}
              </div>
            </div>
          }
        </div>
        {this.state.primaryAccount !== undefined && this.state.primaryAccount !== 4 &&
          map(this.state.accounts, (number, index) => {
            let currentChoices = []
            for (let i = 0; i < selectedChoices.length; i++) {
              if (!selectedChoices[i]) {
                currentChoices.push(allRoleChoices[i])
              }
            }
            selectedChoices[mapAccountValueToChoiceIndex[number - 1]] = true

            return <div key={index}>
              <div className={styles.roleRow} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span>
                  I am a
                  <DropDownMenu
                    value={number}
                    disabled={((index + 1) < this.state.accounts.length) && Number.isInteger(number)}
                    onChange={this.changeAccounts}
                    className={styles.roleDropdown}
                    style={{ fontSize: 18, boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px' }}
                    iconStyle={{ fill: 'black', right: 0 }}
                    underlineStyle={{ border: 'none' }}
                  >
                    {currentChoices}
                  </DropDownMenu>
                  in Ontario's local food sector.
                </span>
                <CancelIcon className={styles.deleteRole} onClick={() => this.removeAccount(index)} />
              </div>
              {number &&
                <div className={styles.roleRow}>
                  <div className={styles.roleDescription}>
                    <div className={styles.roleDescriptionText}>
                      {describeRoles([number])}
                    </div>
                  </div>
                </div>
              }
            </div>
          })
        }
        {this.shouldAddMore() && <div className={styles.roleAddMore} onClick={() => this.addAccount()}>+ Add more</div>}
      </div>
    )
  }
}

export default RoleAdder
