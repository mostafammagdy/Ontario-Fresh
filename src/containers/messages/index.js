import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import MediaQuery from 'react-responsive'

import { connect } from 'react-redux'
import { compose } from 'recompose'

import { map, isEmpty, filter } from 'lodash'
import { Row, Col } from 'react-flexbox-grid'

import {List, ListItem, makeSelectable} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import AddIcon from 'material-ui/svg-icons/content/add-circle'
import NewIcon from 'material-ui/svg-icons/av/fiber-new'

import InlineLoader from '../../components/inlineLoader'

import MessagesConversation from '../messagesConversation'

import { 
  userMessagesRequest,
  conversationRequest,
  blockConversationRequest,
  sendMessage,
  fileUploadRequest,
  clearMessageFile
} from './actions'

import ProfilePlaceholder from '../../assets/images/ontario-fresh-profile-placeholder.jpg'

import styles from './styles.module.scss'

let SelectableList = makeSelectable(List)

const getParticipantAccount = (conversation, client) => {
  const accounts = map(conversation.conversation_participations, object => object.account)
  const account = filter(accounts, account => account.id !== client.account_id)[0]

  return account
}

class Messages extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedConversation: null,
      files: [],
      startNewConversation: false,
      newConversationParticipant: [],
      readStatuses: {},
      lastUserMessagesFetchTime: undefined,
      showLoading: false
    }
  }

  UNSAFE_componentWillMount() {
    window.scrollTo(0, 0)
    document.body.style.backgroundColor = "#F5F4F5"

    if (this.props.client && this.props.client.token) {
      this.props.userMessagesRequest(this.props.client)
    }
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null
  }

  componentDidUpdate() {
    const {
      messages: {
        user_messages: {
          results,
        },
        lastUserMessagesFetchTime
      },
      client,
    } = this.props

    const {
      selectedConversation,
      startNewConversation
    } = this.state

    if (lastUserMessagesFetchTime && !this.state.lastUserMessagesFetchTime) {
      let readStatuses = {}
      map(results, (item, key) => {
        const account = getParticipantAccount(item, client)
        const readStatus = this.getReadStatus(item, client)
        
        readStatuses[account.id] = readStatus
      })

      this.setState({
        readStatuses,
        lastUserMessagesFetchTime
      })
    }
    else if (lastUserMessagesFetchTime > this.state.lastUserMessagesFetchTime) {
      let readStatuses = {}
      const cachedReadSatuses = this.state.readStatuses
      map(results, (item, key) => {
        const account = getParticipantAccount(item, client)
        const readStatus = this.getReadStatus(item, client)

        //only update the read status for a conversation if that conversation has new messages
        if (!readStatus) {
          readStatuses[account.id] = false //will only change from false to true, but not true to false
        }
        else {
          readStatuses[account.id] = cachedReadSatuses[account.id] === undefined ? readStatus : cachedReadSatuses[account.id]
        }
      })

      this.setState({
        readStatuses,
        lastUserMessagesFetchTime
      })
    }

    if (!startNewConversation && selectedConversation === null && results && results.length > 0) {
      let account, result
      if (this.props.location.query && this.props.location.query.recipient) {
        for (let i = 0; i < results.length; i++) {
          if (results[i].last_message.messages_meta[0].account.id === parseInt(this.props.location.query.recipient, 10) ||
              results[i].last_message.messages_meta[1].account.id === parseInt(this.props.location.query.recipient, 10)) {
            account = getParticipantAccount(results[i], client)
            result = results[i]
            break
          }
        }
        if (!result) {
          account = getParticipantAccount(results[0], client)
        }
      } else {
        account = getParticipantAccount(results[0], client)
      }
      browserHistory.push('/messages')

      this.handleSelectConversation((result ? result : results[0]).id, account.id, account.business_name, account.slug, (result ? result : results[0]).silenced)
    }
    this.handleScrollMessageDiv()
  }

  getReadStatus = (conversation, client) => {
    if (!conversation.last_message) { //migrated conversations do not have the last_message attribute
      return true
    }
    const account = filter(conversation.last_message.messages_meta, messages_meta => messages_meta.account.id === client.account_id)[0]
    const participant = filter(conversation.last_message.messages_meta, messages_meta => messages_meta.account.id !== client.account_id)[0]

    if (!account) { //not sure why this case happens, but it happens
      return true
    }

    if (participant.account.id in this.state.readStatuses) {
      return this.state.readStatuses[participant.account.id] //return the cached status
    }

    return account.read //only refer to the state's read status if this component don't have a cached value for it
  }

  handleSelectConversation = (id, account_id, business_name, slug, silenced) => {
    let readStatuses = {}
    if (this.state.selectedAccount) {
      let temp = {}
      temp[this.state.selectedAccount] = true //mark the conversation as read when switching between conversations

      readStatuses = Object.assign(this.state.readStatuses, temp)
    }

    if (this.state.selectedConversation === id || this.props.messages.uploadRequesting) {
      if (this.props.client && this.props.client.token) {
        this.props.userMessagesRequest(this.props.client) //to fetch the latest messages
      }
      
      this.setState({readStatuses})

      return;
    }

    this.state.files.forEach(file =>
      window.URL.revokeObjectURL(file.preview)
    )

    const newState = {
      selectedConversation: id,
      selectedAccount: account_id,
      selectedAccountName: business_name,
      selectedAccountSlug: slug,
      silenced: silenced,
      newConversationParticipant: [],
      startNewConversation: false,
    }

    if (this.state.selectedAccount) {
      newState.readStatuses = readStatuses
    }

    this.setState(newState)

    if (this.props.client && this.props.client.token) {
      this.props.clearMessageFile()
      this.props.conversationRequest(this.props.client, id)
      this.props.userMessagesRequest(this.props.client) //to fetch the latest messages
    }
  }

  handleNewConversation = () => {
    if (this.props.messages.uploadRequesting) {
      return;
    }

    this.state.files.forEach(file =>
      window.URL.revokeObjectURL(file.preview)
    )

    this.setState({
      selectedConversation: null,
      selectedAccount: null,
      selectedAccountName: "",
      selectedAccountSlug: "",
      silenced: null,
      startNewConversation: true
    })

    if (this.props.client && this.props.client.token) {
      this.props.clearMessageFile()
      this.props.conversationRequest(null, null)
    }
  }

  handleScrollMessageDiv = () => {
    const {
      messages,
    } = this.props
    
    if (messages && messages.user_messages.results && !isEmpty(messages.user_messages.results)) {
      let messageDiv = document.getElementById("messagesContainer")
      messageDiv.scrollTop = messageDiv.scrollHeight;
    }
  }
 
  handleSendMessage = (values) => {
    if (this.props.client && this.props.client.token && (this.state.newConversationParticipant.length > 0 || this.state.selectedAccount)) {
      let messageObject = {
        to: this.state.newConversationParticipant.length > 0 ? this.state.newConversationParticipant[0].id : this.state.selectedAccount,
        message: values.message,
        conversation: this.state.selectedConversation
      }

      if (this.props.messages.file_id.length > 0) {
        messageObject.files = this.props.messages.file_id
      }

      this.props.sendMessage(this.props.client, messageObject)

      this.removeAttachment();

      if (this.state.newConversationParticipant.length > 0) {
        this.setState({
          showLoading: true
        })

        setTimeout(() => {
          this.props.userMessagesRequest(this.props.client)

          setTimeout(() => {
            this.setState({
              ...this.state,
              showLoading: false,
              selectedConversation: null,
              selectedAccount: null,
              selectedAccountName: "",
              selectedAccountSlug: "",
              silenced: (new Date()).toGMTString(),
              newConversationParticipant: [],
              startNewConversation: false,
              files: [],
            })
          }, 1000)
        }, 1000)
      }
    }
  }

  onDrop = (acceptedFiles) => {
    const {
      client,
    } = this.props

    this.setState({
      ...this.state,
      files: acceptedFiles,
    })

    if (acceptedFiles.length > 0) {
      this.props.fileUploadRequest(client, { files: acceptedFiles, receiver_id: this.state.selectedAccount })
    }
  }

  removeAttachment = () => {
    this.state.files.forEach (file =>
      window.URL.revokeObjectURL(file.preview)
    )

    this.props.clearMessageFile()

    this.setState({
      files: [],
    })
  }

  resetNewConversationParticipant = (value = []) => {
    this.setState({
      newConversationParticipant: value
    })
  }

  toggleSilence = () => {
    this.setState({
      ...this.state,
      silenced: this.state.silenced ? null : (new Date()).toGMTString()
    })
  }

  render () {
    const {
      messages,
      client,
      profile
    } = this.props

    const {
      selectedConversation
    } = this.state

    return (
      <div className={styles.messagePageContainer}>
        <Row className={styles.messagePageInnerContainer}>
          <Col xs={12} sm={3} className={styles.section}>
            <Paper>
              <MediaQuery minWidth={768}>
                <SelectableList style={{ height: "calc(100vh - 250px)" }} value={selectedConversation}>
                  <Subheader>Your Conversations</Subheader>
                  <div className={styles.profilesContainer}>
                    <ListItem
                      leftAvatar={
                        <AddIcon style={{height: 40, width: 40}} />
                      }
                      primaryText={
                        "Start Conversation"
                      }
                      onClick={
                        () => this.handleNewConversation()
                      }
                    />
                    {messages.user_messages.results ?
                      !isEmpty(messages.user_messages.results) &&
                        map(messages.user_messages.results, (item) => {
                          const account = getParticipantAccount(item, client)
                          const readStatus = this.getReadStatus(item, client)

                          return <div key={item.id} className={(account && account.id === this.state.selectedAccount) ? styles.selectedConversation : undefined}>
                                  <Divider /> 
                                  <ListItem
                                      value={item.id}
                                      leftAvatar={
                                        <Avatar
                                          src={account.photo_file_name}
                                          style={{objectFit: 'cover'}}
                                          onError={(e) => { e.target.src = ProfilePlaceholder }} />
                                      }
                                      primaryText={
                                        (!readStatus && !item.silenced) ? 
                                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', height: 20 }}><strong>{account.business_name}</strong></div>
                                        :
                                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', height: 20 }}>{account.business_name}</div>
                                      }
                                      secondaryText={
                                        <div style={{ height: 20 }}>{item.silenced ?
                                          <em>BLOCKED</em>
                                          : (item.last_message && item.last_message.content) ?
                                            !readStatus ?
                                            <strong>{item.last_message.content}</strong>
                                            :
                                            item.last_message.content
                                          :
                                          item.title
                                        }
                                        </div>
                                      }
                                      rightIcon={(!readStatus && !item.silenced) ? <NewIcon style={{ fill: 'green' }} /> : null}
                                      onClick={
                                        () => this.handleSelectConversation(item.id, account.id, account.business_name, account.slug, item.silenced)
                                      }
                                  />
                                  <Divider />
                                  </div>
                        })
                    :
                      <InlineLoader avatar />
                    }
                  </div>
                </SelectableList>
              </MediaQuery>
              <MediaQuery maxWidth={767}>
                <SelectableList value={selectedConversation}>
                  <Subheader>Your Conversations</Subheader>
                  <div className={styles.profilesContainer}>
                    <ListItem
                      leftAvatar={
                        <AddIcon style={{ height: 40, width: 40 }} />
                      }
                      primaryText={
                        "Start Conversation"
                      }
                      onClick={
                        () => this.handleNewConversation()
                      }
                    />
                    {messages.user_messages.results ?
                      !isEmpty(messages.user_messages.results) &&
                        map(messages.user_messages.results, (item, key) => {
                          const account = getParticipantAccount(item, client)
                          const readStatus = this.getReadStatus(item, client)

                          return <div key={item.id} className={account.id === this.state.selectedAccount ? styles.selectedConversation : undefined}>
                                  <Divider />
                                  <ListItem
                                    value={item.id}
                                    leftAvatar={
                                      <Avatar
                                        src={account.photo_file_name}
                                        style={{objectFit: 'cover'}}
                                        onError={(e) => { e.target.src = ProfilePlaceholder }} />
                                    }
                                    primaryText={
                                      (!readStatus && !item.silenced) ? 
                                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', height: 20 }}><strong>{account.business_name}</strong></div>
                                      :
                                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', height: 20 }}>{account.business_name}</div>
                                    }
                                    secondaryText={
                                      <div style={{ height: 20 }}>
                                        {item.silenced ?
                                        <em>BLOCKED</em>
                                        : (item.last_message && item.last_message.content) ?
                                          !readStatus ?
                                          <strong>{item.last_message.content}</strong>
                                          :
                                          item.last_message.content
                                        :
                                        item.title
                                        }
                                      </div>
                                    }
                                    rightIcon={(!readStatus && !item.silenced) ? <NewIcon style={{ fill: 'green' }} /> : null}
                                    onClick={
                                      () => this.handleSelectConversation(item.id, account.id, account.business_name, account.slug, item.silenced)
                                    }
                                  />
                                  <Divider />
                                  </div>
                        })
                    :
                      <InlineLoader avatar />
                    }
                  </div>
                </SelectableList>
              </MediaQuery>
            </Paper>
          </Col>
          <Col xs={12} sm={9} className={styles.section}>
            <MessagesConversation
              files={this.state.files}
              conversationInformation={{
                accountID: profile.authed ? profile.authed.id : undefined,
                selectedConversation: this.state.selectedConversation,
                selectedAccount: this.state.selectedAccount,
                selectedAccountName: this.state.selectedAccountName,
                selectedAccountSlug: this.state.selectedAccountSlug,
                silenced: this.state.silenced,
                newConversationParticipant: this.state.newConversationParticipant,
                showLoading: messages.fetchRequest || this.state.showLoading
              }}
              toggleSilence={this.toggleSilence}
              resetNewConversationParticipant={this.resetNewConversationParticipant}
              blockConversationRequest={this.props.blockConversationRequest}
              handleSendMessage={this.handleSendMessage}
              removeAttachment={this.removeAttachment}
              onDrop={this.onDrop}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
  messages: state.messages,
})

export default compose(
  connect(mapStateToProps,
  {
    userMessagesRequest,
    conversationRequest,
    blockConversationRequest,
    sendMessage,
    fileUploadRequest,
    clearMessageFile
  })
)(Messages)
