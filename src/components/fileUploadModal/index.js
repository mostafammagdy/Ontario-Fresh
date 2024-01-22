import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file'

import Dropzone from 'react-dropzone';

import styles from './styles.module.scss';

class FileUploadModal extends Component {
  static propTypes = {
    button: PropTypes.node.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      files: [],
    };
  }

  onDrop = (files) => this.setState({
    files
  });

  handleOpen = () => this.setState({
    open: true
  });

  handleClose = () => this.setState({
    open: false,
    files: [],
  });

  handleSubmit = () => {
    const {
      onSelect
    } = this.props

    onSelect(this.state.files[0]);

    this.handleClose();
  };

  render() {
    const {
      open,
      files: [file]
    } = this.state;

    const {
      button
    } = this.props;

    const actions = [
      <FlatButton
        primary
        label="Cancel"
        onClick={this.handleClose}
      />,
      <RaisedButton
        disabled={!this.state.files.length}
        primary
        label="Upload"
        onClick={() => this.handleSubmit()}
      />
    ];

    return (
      <div>
        <div onClick={this.handleOpen}>{button}</div>
        <Dialog
          modal
          title="Upload a File"
          actions={actions}
          contentClassName='responsiveDialog'
          open={open}
        >
          <span className="close-modal" onClick={this.handleClose}>&times;</span>
          <Row style={{ paddingTop: '1rem' }}>
            <Col xs={12}>
            {
              file ?
              <div className={styles.fileAddedContainer}>
                <FileIcon className={styles.fileIcon} />
                File added
              </div>
              :
              <Dropzone
                accept="image/*, application/pdf, application/zip, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.openxmlformats-officedocument.presentationml.presentation"
                activeClassName={styles.dropzoneActive}
                className={styles.dropzone}
                onDrop={this.onDrop.bind(this)}
                multiple={false}
              >
                <div className={styles.uploadZone}>
                  {
                    ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/)) ?
                    <div style={{ width: '100%' }}>
                      <span className={styles.highlight}>Tap</span> to Choose Images
                    </div>
                    :
                    <div>
                      <span className={styles.highlight}>Drag and Drop</span> Images or <span className={styles.highlight}>Click</span> to Choose Files
                    </div>
                  }
                </div>
              </Dropzone>
            }
            </Col>
          </Row>
        </Dialog>
      </div>
    );
  }
}

export default FileUploadModal;