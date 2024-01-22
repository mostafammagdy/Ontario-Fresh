import React from 'react'
import { reduxForm, Field, isPristine, reset } from 'redux-form'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { Row, Col } from 'react-flexbox-grid'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import AttachIcon from 'material-ui/svg-icons/editor/attach-file'
import CancelIcon from 'material-ui/svg-icons/navigation/cancel'

import StyledInput from '../../components/styledInput'
import ResizableButton from '../../components/resizableButton'

import { indexOf, isEmpty, map } from 'lodash'

import { isIE } from '../../utils/ie-detection'

import Dropzone from 'react-dropzone'

import styles from './styles.module.scss'

import {
  sendMessage,
  fileUploadRequest,
  clearMessageFile
} from '../../containers/messages/actions'


class CreateMessageModal extends React.Component {
  constructor(props) {
    super(props)

    const { client } = props
    this.state = {
      open: client && client.token && window.location.search && indexOf(window.location.search.split('?'), 'message') > -1 ? true : false,
      files: []
    }
    if (client && !client.token && window.location.search && indexOf(window.location.search.split('?'), 'message') > -1) {
      browserHistory.push('/login?message&next=' + window.location.pathname)
    }
    else {
      browserHistory.push({
        pathname: window.location.pathname,
        query: ''
      })
    }
  }

  handleOpen = () => {
    const {
      nextPageAfterLogin
    } = this.props

    if (!this.props.client.token) {
      if (nextPageAfterLogin) {
        window.location.replace(`/login?next=${nextPageAfterLogin}`)
      } else {
        window.location.replace('/login')
      }
    }
    else {
      this.setState({
        open: true,
        files: []
      })
    }
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSendMessage = (values) => {
    const {
      client,
      profile,
      messages,
      sendMessage
    } = this.props

    if (client && client.token && ((this.props.recipient && this.props.recipient.id) || profile.current.id)) {
      sendMessage(client, {
        to: (this.props.recipient && this.props.recipient.id) || this.props.profile.current.id,
        message: values.message,
        files: messages.file_id.length > 0 ? messages.file_id : undefined
      })
    }
    this.removeAttachment();
    this.handleClose()
  }

  onDrop = (acceptedFiles) => {
    const {
      client,
      fileUploadRequest,
    } = this.props

    this.setState({
      ...this.state,
      files: acceptedFiles,
    })
    if (acceptedFiles.length > 0) {
      fileUploadRequest(client, { files: acceptedFiles, receiver_id: ((this.props.recipient && this.props.recipient.id) || this.props.profile.current.id) })
    }
  }

  removeAttachment = () => {
    this.state.files.forEach(file =>
      window.URL.revokeObjectURL(file.preview)
    )

    this.props.clearMessageFile()

    this.setState({
      files: [],
    })
  }

  render () {
    const {
      handleSubmit,
      messages,
      pristine,
      profile,
      disabled,
      recipient,
      client,
      textLink,
      actionButton
    } = this.props

    const {
      files
    } = this.state

    const actions = isIE() ? <div style={{ paddingTop: 40, paddingBottom: 20, float: 'right' }}>
      <FlatButton
        primary
        label="Cancel"
        onClick={this.handleClose}
      />
      { files && !files.length &&
      <Dropzone
        accept="image/*,application/pdf"
        className={styles.dropzone}
        onDrop={this.onDrop.bind(this)}
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
        type="submit"
        label="Send Message"
        form="messageDetails"
        disabled={pristine}
      />
    </div>
    :
    [
      <FlatButton
        primary
        label="Cancel"
        onClick={this.handleClose}
      />,
      files && !files.length ?
      <Dropzone
        accept="image/*,application/pdf"
        className={styles.dropzone}
        onDrop={this.onDrop.bind(this)}
        multiple={false}
      >
        <IconButton
          tooltip="Photo or PDF"
          tooltipPosition="bottom-center"
        >
          <AttachIcon />
        </IconButton>
      </Dropzone>
      :
      undefined
      ,
      <RaisedButton
        primary
        type="submit"
        label="Send Message"
        form="messageDetails"
        disabled={pristine}
      />
    ]

    return (
      <div style={{ display: 'initial' }}>
        {!!textLink ?
        (isEmpty(profile.authed) ?
        <a href={'/login?message&next='+window.location.pathname} style={{textDecoration: "underline", cursor: "pointer"}}>
          Message us for more details
        </a>
        :
        <a onClick={this.handleOpen} style={{textDecoration: "underline", cursor: "pointer"}}>
          Message us for more details
        </a>)
        :
        actionButton ?
        <RaisedButton
          primary
          label={client.token ? "Message" : "Log In to Message"}
          onClick={this.handleOpen}
        />
        :
        <ResizableButton
          fullWidth
          notCaps
          primary
          chat
          disabled={disabled}
          type="submit"
          label={client.token ? "Message" : "Log In to Message"}
          size="1.2"
          onClick={this.handleOpen}
        />
        }

        <Dialog
          autoScrollBodyContent
          modal
          title={"Send a Message to " + ((recipient && recipient.business_name) || profile.current.business_name)}
          actions={isIE() ? null : actions}
          contentClassName='responsiveDialog'
          open={this.state.open}
        >
          <span className="close-modal" onClick={this.handleClose}>&times;</span>
          <form
            id="messageDetails"
            style={{ marginBottom: -15 }}
            onSubmit={handleSubmit(this.handleSendMessage)}
          >
            <Row>
              <Col xs={12}>
                {(messages.file_id && messages.file_id.length > 0) ?
                  map(files, file =>
                    <div className={styles.uploadFileButton} key={messages.file_id[0]}>
                      <a href={files[0].preview} className={styles.fileDownloadLink} target="_blank" rel="noopener noreferrer">{file.name}</a>
                      <CancelIcon hoverColor={"gray"} onClick={() => this.removeAttachment()} />
                    </div>
                  )
                  :
                  <div className={styles.filePlaceholder}></div>
                }
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Field
                  textarea
                  tallTextArea
                  maxlength="1000"
                  component={StyledInput}
                  disabled={messages.requesting}
                  name="message"
                  type="text"
                />
              </Col>
            </Row>
            {isIE() ? actions : null}
          </form>
        </Dialog>
      </div>
    )
  }
}


const resetForm = (result, dispatch) =>
  dispatch(reset('createMessageModal'))

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
  messages: state.messages,
  pristine: isPristine('createMessageModal')(state)
})

const connected = connect(mapStateToProps, {
  sendMessage,
  fileUploadRequest,
  clearMessageFile
})(CreateMessageModal)

const formed = reduxForm({
  form: 'createMessageModal',
  onSubmitSuccess: resetForm,
})(connected)

export default formed