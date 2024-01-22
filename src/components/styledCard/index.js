import React from 'react'

import {Card, CardTitle, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider'

import InlineLoader from '../../components/inlineLoader'

// import styles from './styles.module.scss'

class StyledCard extends React.Component {

  render() {
    const {
      cardTitle,
      cardText
    } = this.props
    return (
      <Card style={{ marginBottom: '1rem', boxShadow: "0 1px 2px 0 rgba(0,0,0,.2)" }}>
        { cardTitle &&
          <div>
            <CardTitle title={cardTitle || <InlineLoader />} />
            <Divider />
          </div>
        }
        <CardText>{cardText || <InlineLoader />}</CardText>
      </Card>
    )
  }
}

export default StyledCard
