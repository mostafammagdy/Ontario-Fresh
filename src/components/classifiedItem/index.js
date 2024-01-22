import React from 'react'
import moment from 'moment'

import Paper from 'material-ui/Paper'

import EditClassifiedModal from '../../containers/editClassifiedModal'
import ClassifiedsDetailedViewModal from '../../components/classifiedsDetailedViewModal'

import ProfilePlaceholder from '../../assets/images/ontario-fresh-profile-placeholder.jpg'

import styles from './styles.module.scss'

import { formatText } from '../../utils/markup'

class ClassifiedItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {

    const {
      looking_for,
      title,
      description,
      photo_file_name,
      classified_id,
      needed_by,
      editable,
      loading,
      expired,
      brief
    } = this.props

    return (
      <div>
        <Paper className="hoverable" style={{ display: 'flex', marginBottom: '1rem', boxShadow: "0 1px 2px 0 rgba(0,0,0,.2)" }} onClick={!loading && !editable && this.handleOpen}>
          <div className={styles.classifiedImageContainer}>
            <img alt="" className={styles.classifiedImage} src={photo_file_name || "invalid_link"} onError={(e) => { e.target.src = ProfilePlaceholder }} />
          </div>
          <div className={styles.infoContainer}>
            <div>
              <div className={styles.classifiedsName}>
                <span className={styles.classifiedsType}>
                  {looking_for ? "Wanted" : "For Sale"}:
                </span>
                {title}
              </div>
              <div className={styles.classifiedDate}>
                {needed_by &&
                  <span>{looking_for ? "By" : "Until"}&nbsp;
                    {moment(needed_by).utc().format('dddd, MMMM Do YYYY')}&nbsp;
                  </span>
                }
                {expired &&
                  <strong><i>- EXPIRED</i></strong>
                }
              </div>
            </div>
            <hr className={styles.separator} />
            <div>
              { !loading && editable && <EditClassifiedModal classified_id={classified_id} /> }
              { brief ?
                <div className={styles.classifiedDetailBrief}>{formatText(description)}</div>
                :
                <div className={styles.classifiedDetail}>{formatText(description)}</div>
              }
            </div>
          </div>
        </Paper>
        <ClassifiedsDetailedViewModal data={this.props} open={this.state.open} handleClose={this.handleClose} />
      </div>
    )
  }
}

export default ClassifiedItem