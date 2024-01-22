import React from 'react'
import { Card, CardMedia, CardText } from 'material-ui/Card'

import { Col } from 'react-flexbox-grid'
import { Link } from 'react-router'

import styles from './styles.module.scss'
import ProfilePlaceholder from '../../assets/images/ontario-fresh-profile-placeholder-profilecard.jpg'

let business = {
  name: 'Business Name',
  location: 'City, Ontario',
  categories: 'Business description name and information',
  image: {ProfilePlaceholder}
}

const cardStyle = {
  width: '100%',
  textAlign: 'left',
  marginBottom: '1rem',
  position: 'relative',
  boxShadow: "0 1px 2px 0 rgba(0,0,0,.2)"
}

const featuredCardStyle = Object.assign({ border: "solid green" }, cardStyle)

class ProfileCard extends React.Component {
  render () {
    const {
      business_name,
      photo_file_name,
      description,
      location,
      noLocation,
      slug,
      featured,
      threeByThree,
      lonesome
    } = this.props

    return (
      <Col className="hoverable" xs={12} sm={lonesome ? 12 : 6} md={lonesome ? 12 : threeByThree ? 4 : 3}>
        <Link to={slug ? `/profiles/${slug}` : undefined} style={{ textDecoration: 'none', userSelect: 'none' }}>
          <Card style={featured ? featuredCardStyle : cardStyle}>
            <CardMedia>
              <div className={styles.cardImage} style={{backgroundImage: `url(${photo_file_name || ProfilePlaceholder})`}}></div>
            </CardMedia>
            <CardText>
              <div className={styles.name}>{business_name || business.name}</div>
              <div className={styles.location}>{location || (!noLocation && "Ontario")}</div>
              <hr className={styles.separator} />
              <div className={threeByThree ? styles.descriptionThreeByThree : styles.description}>{description || business.categories}</div>
            </CardText>
          </Card>
        </Link>
      </Col>
    )
  }
}

export default ProfileCard
