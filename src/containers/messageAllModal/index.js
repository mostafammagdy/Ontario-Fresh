import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { reduxForm, Field, isPristine, reset } from 'redux-form'

import { Row, Col } from 'react-flexbox-grid'

import { map } from 'lodash'

import ViewMessagesIcon from 'material-ui/svg-icons/communication/message'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import ResizableButton from '../../components/resizableButton'
import IconButton from 'material-ui/IconButton'
import AttachIcon from 'material-ui/svg-icons/editor/attach-file'
import CancelIcon from 'material-ui/svg-icons/navigation/cancel'
import StyledInput from '../../components/styledInput'
import { isIE } from '../../utils/ie-detection'

import Dropzone from 'react-dropzone';

import styles from './styles.module.scss';

import {
  messageAllCreate,
  fileUploadMessageAllRequest,
  clearMessageAllFile
} from './actions'

const iconStyles = {
  display: 'inline-block',
  color: '#6D6F7B',
  userSelect: 'none',
  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  verticalAlign: 'middle',
  marginRight: 6,
  marginTop: -2,
  width: 24,
  height: 24,
  viewBox: '0, 0, 24, 24',
}

class MessageAllModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      files: []
    }
  }

  handleOpen = () => {
    this.setState({
      open: true,
    })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmitForm = (values) => {
    const {
      client,
      messageAllCreate,
      managed: {
        profiles
      },
      messageAll: {
        file_id
      }
    } = this.props

    if (client && client.token && profiles.count > 0) messageAllCreate(client, { to: profiles.results.map(profile => profile.id), ...values, files: file_id.length > 0 ? file_id : undefined })

    this.removeAttachment()
    this.handleClose()
  }

  onDrop = (acceptedFiles) => {
    const {
      client,
      fileUploadMessageAllRequest,
      managed: {
        profiles
      }
    } = this.props

    this.setState({
      ...this.state,
      files: acceptedFiles,
    })

    if (acceptedFiles.length > 0) {
      fileUploadMessageAllRequest(client, { files: acceptedFiles, receiver_ids: profiles.results.map(profile => profile.id) })
    }
  }

  removeAttachment = () => {
    this.state.files.forEach(file =>
      window.URL.revokeObjectURL(file.preview)
    )

    this.props.clearMessageAllFile()

    this.setState({
      files: [],
    })
  }

  render () {
    const {
      handleSubmit,
      pristine,
      managed: {
        profiles: {
          count
        }
      },
      messageAll: {
        file_id
      },
      textLinkWithIcon
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
        label="Send to All"
        form="messageAllModal"
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
      (files && !files.length) ?
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
      null
      ,
      <RaisedButton
        primary
        type="submit"
        label="Send to All"
        form="messageAllModal"
        disabled={pristine}
      />
    ]

    return (
      <span>
        {textLinkWithIcon ?
          <span className={styles.profileLink} onClick={this.handleOpen}><ViewMessagesIcon style={iconStyles} />Send Messages to All</span>
          :
          <ResizableButton
            chat
            fullWidth
            primary
            size="1.2"
            style={{ marginTop: 10 }}
            label="Send Message"
            disabled={count === 0}
            onClick={this.handleOpen}
          />
        }
        <Dialog
          autoScrollBodyContent
          modal
          title={"Send a Message to All " + count + " Members of Your 'Buy Local' Network"}
          actions={isIE() ? null : actions}
          contentClassName='responsiveDialog'
          open={this.state.open}
        >
          <span className="close-modal" onClick={this.handleClose}>&times;</span>
          <Divider style={{ marginTop: 0, marginBottom: 25, marginLeft: -16, marginRight: -16}} />
          <form id="messageAllModal" onSubmit={handleSubmit(this.handleSubmitForm)} style={{ marginBottom: 0 }}>
            <Row>
              <Col xs={12}>
                This message will be sent to all members of your network individually. This means that all replies will only be directed and visible to you.
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
              { (file_id && file_id.length > 0) ?
              map(files, file =>
                <div className={styles.uploadFileButton} key={file_id[0]}>
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
                  component={StyledInput}
                  name="message"
                  type="text"
                />
              </Col>
            </Row>
            {isIE() ? actions : null}
          </form>
        </Dialog>
      </span>
    )
  }
}

const resetForm = (result, dispatch) =>
  dispatch(reset('messageAllModal'))

const mapStateToProps = state => ({
  client: state.client,
  managed: state.profileManager,
  messageAll: state.messageAll,
  pristine: isPristine('messageAllModal')(state)
})

export default compose(
  connect(mapStateToProps, {
    messageAllCreate,
    fileUploadMessageAllRequest,
    clearMessageAllFile
  }),
  reduxForm({
    form: 'messageAllModal',
    onSubmitSuccess: resetForm,
  })
)(MessageAllModal)
