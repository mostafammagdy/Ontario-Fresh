import React, { Component } from 'react'
import { reduxForm, Field, reset } from 'redux-form'
import { PropTypes } from 'prop-types'

import { connect } from 'react-redux'
import { compose } from 'recompose'

import { map, isEmpty, filter } from 'lodash'

import { List } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Popover from 'material-ui/Popover'
import Subheader from 'material-ui/Subheader'
import Chip from 'material-ui/Chip'
import IconButton from 'material-ui/IconButton'
import MoreIcon from 'material-ui/svg-icons/navigation/more-horiz'
import RaisedButton from 'material-ui/RaisedButton'
import Dropzone from 'react-dropzone'
import AttachIcon from 'material-ui/svg-icons/editor/attach-file'
import CancelIcon from 'material-ui/svg-icons/navigation/cancel'
import DownloadIcon from 'material-ui/svg-icons/file/file-download'
import Autosuggest from 'react-autosuggest'
import Avatar from 'material-ui/Avatar'

import StyledInput from '../../components/styledInput'
import InlineLoader from '../../components/inlineLoader'

import cx from '../../utils/class-names'

import { checkRequiredSilent } from '../../utils/client-side-validation'
import { formatText } from '../../utils/markup'
import { filePrefix } from '../../utils/file-hosting'

import {
  getParticipantSuggestions,
} from './actions'

import ProfilePlaceholder from '../../assets/images/ontario-fresh-profile-placeholder.jpg'

import styles from './styles.module.scss'

class MessagesConversation extends Component {
  static propTypes = {
    conversationInformation: PropTypes.shape({
      accountID: PropTypes.number,
      selectedConversation: PropTypes.number,
      selectedAccount: PropTypes.number,
      selectedAccountName: PropTypes.string,
      selectedAccountSlug: PropTypes.string,
      silenced: PropTypes.string,
      newConversationParticipant: PropTypes.array,
      showLoading: PropTypes.bool
    })
  }
  
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      participantSearchBar: ""
    }
  }

  openOptions = (event) => {
    event.preventDefault();

    this.setState({
      ...this.state,
      open: true,
      anchorEl: event.currentTarget,
    })
  }

  closeOptions = () => {
    this.setState({
      ...this.state,
      open: false
    })
  }

  render () {
    const {
      client,
      files,
      messages,
      handleSubmit,
      toggleSilence,
      resetNewConversationParticipant,
      conversationInformation: {
        accountID,
        selectedConversation,
        selectedAccountName,
        selectedAccountSlug,
        silenced,
        newConversationParticipant,
        showLoading
      },
      handleSendMessage,
      removeAttachment,
      onDrop,
      blockConversationRequest,
      getParticipantSuggestions,
      messagesConversation: {
        suggestions
      }
    } = this.props

    const chipStyles = {
      margin: "8px 4px",
    }

    const disableMessageBox = () => newConversationParticipant.length === 0 && (messages.requesting || selectedConversation === null || !!silenced || this.props.messages.uploadRequesting)
    const filteredResults = silenced ? filter(messages.conversations.results, message => message.created_at < silenced) : messages.conversations.results

    return (
      <Paper style={{ height: "100%" }}>
        <List>
          {selectedAccountName ?
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className={styles.messagesHeader}>
                <div>
                  <a className={styles.messagesHeaderLink} href={`/profiles/${selectedAccountSlug}`}>{selectedAccountName}</a>
                  {silenced && <span> - <i>Blocked</i></span>}
                </div>
                <IconButton
                  onClick={this.openOptions}
                >
                  <MoreIcon />
                </IconButton>
                <Popover
                  open={this.state.open}
                  anchorEl={this.state.anchorEl}
                  onRequestClose={this.closeOptions}
                >
                  <Menu>
                    <MenuItem
                      primaryText={silenced ? "Unblock this conversation" : "Block this conversation"}
                      onClick={() => {
                        blockConversationRequest(client, { slug: selectedAccountSlug, silenced: !silenced, conversation_id: selectedConversation })
                        this.setState({
                          ...this.state,
                          open: false
                        })
                        toggleSilence()
                      }}
                    />
                  </Menu>
                </Popover>
              </div>
            </div>
            : (messages.requesting || showLoading) ?
            <Subheader>Viewing Conversation</Subheader>
            : newConversationParticipant.length > 0 ?
            <div className={styles.messagesHeader}>
              <Chip
                onRequestDelete={() => {
                  this.setState({ participantSearchBar: ''})
                  resetNewConversationParticipant()}
                }
                label={newConversationParticipant.business_name}
                style={chipStyles}
              >
                <Avatar src={newConversationParticipant[0].photo_file_name || "invalid_link"} style={{objectFit: 'cover', marginBottom: 0}} onError={(e) => { e.target.src = ProfilePlaceholder }} />
                {newConversationParticipant[0].business_name}
              </ Chip>
            </div>
            :
            <Autosuggest
              key="autocomplete"
              theme={styles}
              suggestions={suggestions}
              onSuggestionsFetchRequested={({ value }) => getParticipantSuggestions(client, { query: value, blacklistID: accountID })}
              onSuggestionsClearRequested={() => getParticipantSuggestions(client, { query: "" })}
              getSuggestionValue={suggestion => suggestion}
              onSuggestionSelected={(event, { suggestionValue }) => this.setState({ productName: suggestionValue })}
              renderSuggestion={(suggestion, { query }) => {
                return <MenuItem>
                  <div>
                    <strong>
                      {suggestion.business_name}
                    </strong>
                    <img alt="" src={suggestion.photo_file_name || "invalid_link"} onError={(e) => { e.target.src = ProfilePlaceholder }} style={{marginBottom: 0, height: 22, marginLeft: 15}} />
                  </div>
                </MenuItem>
              }}
              inputProps={{
                placeholder: "Search for a profile",
                value: this.state.participantSearchBar,
                onChange: (event, { newValue, method }) => {
                  if (method === 'click') {
                    this.setState({ participantSearchBar: ''})
                    resetNewConversationParticipant([newValue])
                  } else {
                    typeof newValue === 'string' && this.setState({ participantSearchBar: newValue })
                  }
                },
                style: {
                  margin: '8px 0',
                  width: '100%'
                }
              }}
              renderInputComponent={inputProps =>
                <div className={styles.suggestionMessagesHeader}>
                  <input {...inputProps} />
                </div>
              }
              renderSuggestionsContainer={({ containerProps, children }) =>
                <Paper {...containerProps} style={{ listStyleType: 'none', margin: 0, padding: 0, position: 'absolute', zIndex: 2, maxHeight: 480, overflowY: 'auto' }}>
                  {children}
                </Paper>
              }
            />
          }
          <hr style={{ marginBottom: 0, backgroundColor: "rgb(224, 224, 224)" }} />
          <div id="messagesContainer" className={styles.messagesContainer}>
            {
              (messages.requesting || showLoading) ?
                <InlineLoader />
              : !isEmpty(messages.conversations.results) ?
                map(filteredResults, (item, key) =>
                  <div className={styles.messageItem} key={key}>
                    <div className={styles.chatTimestamp}>{item.updated_at}</div>
                    <div className={cx(styles.chatBubble, item.messages_meta[0].account.id === client.account_id ? styles.myMessage : null)}>
                      {formatText(item.content)}
                    </div>
                    {item.files_detail.length > 0 &&
                      <div className={cx(styles.chatRectangle, item.messages_meta[0].account.id === client.account_id ? styles.myMessageFile : null)}>
                        <a className={styles.fileDownloadLink} href={filePrefix + item.files_detail[0].file_data} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                          {item.files_detail[0].file_data.substr(item.files_detail[0].file_data.lastIndexOf('/') + 1)}
                          <DownloadIcon style={{ marginTop: 5 }} />
                        </a>
                      </div>
                    }
                  </div>
                )
              : selectedAccountName && <i>{`This is the beginning of your new message history with ${selectedAccountName}.`}</i>
            }
          </div>
          <form
            id="messageChat"
            style={{ marginBottom: 0 }}
            onSubmit={handleSubmit(handleSendMessage)}
          >
            <div className={styles.messageUtilities}>
              {files.length > 0 &&
                <div className={styles.uploadStatus}>
                  {this.props.messages.uploadSuccessful &&
                    <span className={styles.uploadComplete}>
                      <a href={files[0].preview} target="_blank" rel="noopener noreferrer">{files[0].name}</a> - Upload complete
                                    <IconButton
                        onClick={removeAttachment}
                      >
                        <CancelIcon />
                      </IconButton>
                    </span>
                  }
                  {this.props.messages.uploadRequesting && <span>Uploading...</span>}
                  {this.props.messages.uploadFailed && <span>Upload failed</span>}
                </div>}
              <Field
                textarea
                noResize
                component={StyledInput}
                disabled={disableMessageBox()}
                name="message"
                hintText={files.length > 0 && this.props.messages.uploadSuccessful ? "A message is required..." : "Type your message..."}
                type="text"
                maxlength="1000"
                validate={checkRequiredSilent}
              />
              <div className={styles.messageActions}>
                {!disableMessageBox() && selectedConversation !== null && files.length === 0 &&
                  <Dropzone
                    accept="image/*,application/pdf"
                    className={styles.dropzone}
                    onDrop={onDrop.bind(this)}
                    multiple={false}
                  >
                    <IconButton
                      tooltip="Photo or PDF"
                      tooltipPosition="bottom-center"
                    >
                      <AttachIcon />
                    </IconButton>
                  </Dropzone>
                }
                <RaisedButton
                  primary
                  type={!silenced ? "submit" : ""}
                  label="Send"
                  disabled={disableMessageBox()}
                  form={!silenced ? "messageChat" : ""}
                  style={{ marginTop: 6, marginBottom: 6 }}
                />
              </div>
            </div>
          </form>
        </List>
      </Paper>
    )
  }
}

const resetForm = (result, dispatch) =>
  dispatch(reset('messagesForm'))

const mapStateToProps = state => ({
  client: state.client,
  messages: state.messages,
  messagesConversation: state.messagesConversation
})

export default compose(
  connect(mapStateToProps,
    {
      getParticipantSuggestions
    }),
  reduxForm({
    form: 'messagesForm',
    onSubmitSuccess: resetForm,
  })
)(MessagesConversation)
