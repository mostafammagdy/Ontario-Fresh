import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Link } from 'react-router'
import { Row, Col } from 'react-flexbox-grid'
import { map, isEmpty, findIndex } from 'lodash'

import Snackbar from 'material-ui/Snackbar'
import ClampLines from 'react-clamp-lines';

import SearchBar from '../../components/searchbar'
import ProfileCard from '../../components/profilecard'
import ClassifiedItem from '../../components/classifiedItem'
import ResizableButton from '../../components/resizableButton'
import EmptySearch from '../../components/emptySearch'
import BusinessCategoriesBox from '../../components/businessCategoriesBox'
import CreateClassifiedModal from '../createClassifiedModal'

import cx from '../../utils/class-names'

import { publicClassifiedsRequest } from '../../containers/profileClassifieds/actions'
import { featuredProfilesRequest, newProfilesRequest } from '../../containers/profile/actions'
import { searchQueryRequest } from '../../containers/searchComponent/actions'

import OntarioFreshBackgroundImage from '../../assets/images/ontario-fresh-banner.jpg'
import LogisticsImage from '../../assets/images/onf-shipping-banner.jpg'

import styles from './styles.module.scss'


class Homepage extends React.Component {
  
  constructor(props) {
    super(props)

    this.getProfiles()
    this.getClassifieds()
    props.searchQueryRequest(props.client, {values: {
      autocomplete: false,
      list_filters: {},
      profiletype_filters: "ALL",
      search_query: undefined
    }, page: 1 })
  }

  UNSAFE_componentWillMount() {
    window.scrollTo(0, 0)
  }

  getClassifieds = () => {
    return this.props.publicClassifiedsRequest()
  }

  getProfiles = () => {
    this.props.newProfilesRequest()
    return this.props.featuredProfilesRequest()
  }
  
  render () {
    const {
      profileClassifieds: {
        current,
      },
      client,
      profile: {
        authed,
        featured,
        newProfiles,
      },
      messages,
      search_component
    } = this.props

    let loggedIn = !!client.username
    let randCount = ((search_component && search_component.profiles && search_component.profiles.hits && search_component.profiles.hits.total) || 0).toLocaleString()
    const getUniqueFeaturedProfile = (popular, featured) => {
      if (popular.hits && popular.hits.hits && featured.hits && featured.hits.hits) {
        const popularCondensed = map(popular.hits.hits, (item, key) => item._source.id)
        for (let i = 0; i < featured.hits.hits.length; i++) {
          if (findIndex(popularCondensed, id => id === featured.hits.hits[i]._source.id) > -1) {
            continue;
          }
          return [featured.hits.hits[i]]
        }
      }
    }

    return (
      <div>
        <section
          id="main"
          className={`${styles.hero}${loggedIn && authed && !authed.is_manager ? ' ' + styles['hero--loggedIn'] : loggedIn && authed && authed.is_manager ? ' ' + styles['hero--loggedInManager'] : ''}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${OntarioFreshBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top'
          }}
        >
          <div className={cx(styles.heroInfo, styles.shadow, styles.minWidth)}>
            <h1 style={{display: 'inline', fontWeight: 'normal'}}>Welcome to </h1><h1 style={{display: 'inline'}}>Ontario's Local Food Revolution</h1>
            {/* search_component.classifieds && search_component.classifieds.hits && search_component.classifieds.hits.total) || 0).toLocaleString() */}
            <p className={styles.tagLine}>
              Connect with {randCount} businesses to buy or sell your food products. Register now, it's free!
            </p>
            <div>
              <SearchBar /> 
            </div>
          </div>
        </section>

        <section
          id="discover"
          className={styles.discover}
        >
          <BusinessCategoriesBox />
          {!loggedIn &&
            <div className={styles.center} style={{ marginBottom: 48 }}>
              <h2 className={styles.cta} style={{ fontSize: '1.125rem'}}>Create Your Free Profile Today</h2>
              <Link to="/register">
                <ResizableButton
                  size="1.4"
                  primary
                  label="Register"
                />
              </Link>
            </div>
          }
          <Row style={{ textAlign: 'center' }}>
            <Col xs={12} sm={12} md={9}>
              <h2 className={styles.discoverHeader} style={{ fontSize: '1.125rem' }}>Featured Members</h2>
              <div>
                  <Row>
                    {featured.hits && featured.hits.hits ?
                      map(featured.hits.hits.slice(0, 3), (item, key) =>
                        <ProfileCard
                          key={item._source.id}
                          slug={item._source.slug}
                          threeByThree
                          business_name={item._source.business_name}
                          photo_file_name={item._source.photo_file_name}
                          description={
                            <ClampLines
                              text={item._source.description}
                              lines={2}
                              ellipsis="..."
                              buttons={false}
                            />
                          }
                          location={!isEmpty(item._source.addresses) && item._source.addresses[0].city}
                        />)
                      :
                        [
                          <ProfileCard key={0} />,
                          <ProfileCard key={1} />,
                          <ProfileCard key={2} />,
                        ]
                    }
                  </Row>
              </div>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <h2 className={styles.discoverHeader} style={{ fontSize: '1.125rem' }}>Partners</h2>
              <div>
                <Row>
                  {featured.hits && featured.hits.hits && newProfiles.hits && newProfiles.hits.hits ?
                    map(getUniqueFeaturedProfile(featured, newProfiles), (item) =>
                      <ProfileCard
                        featured
                        key={item._source.id}
                        slug={item._source.slug}
                        lonesome
                        business_name={item._source.business_name}
                        photo_file_name={item._source.photo_file_name}
                        description={
                          <ClampLines
                            text={item._source.description}
                            lines={2}
                            ellipsis="..."
                            buttons={false}
                          />
                        }
                        location={!isEmpty(item._source.addresses) && item._source.addresses[0].city}
                      />)
                    :
                    <ProfileCard key={3} />
                  }
                </Row>
              </div>
            </Col>
          </Row>
        </section>
        
        <section 
          id="shipping"
          className={cx(styles.shipping, styles.shadow)}
          style={{ 
            background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${LogisticsImage}) center top`,
          }}
        >
          <div className={styles.shippingContainer}>
            <h2 className={styles.shippingHeader}>Get the Best Shipping Rates in Ontario</h2>
            <p className={styles.tagLine}>
              Get your products to new markets using our brand-new shipping tool.
            </p>
            <Link to={loggedIn ? "/shipping" : "/register"}>
              <ResizableButton
                size="1.4"
                primary
                label="Get Rates"
              />
            </Link>
          </div>
        </section>

        <section
          id="classifieds"
          className={styles.classifieds}
        >
          <div className={styles.classifiedsContainer}>
            <h2 className={styles.classifiedsHeader} style={{ fontSize: '1.125rem' }}>
              Latest Classifieds&nbsp;
              { !isEmpty(current) && <Link to="/search/classifieds">{current.count > 0 && '(See All)'}</Link> }
            </h2>
            {current && current.results && current.count > 0 ?
              <Row>
                {map(current.results.slice(0, current.count < 4 ? 2 : 4), (item) =>
                  <Col xs={12} sm={6} key={item.id}>
                    <ClassifiedItem
                      looking_for={item.looking_for}
                      title={item.title}
                      description={item.description}
                      photo_file_name={item.photo_file_name}
                      account={item.account}
                      classified_id={item.id}
                      needed_by={item.needed_by}
                      category={item.category}
                      brief={true}
                    />
                  </Col>
                )}
              </Row>
              : 
              <EmptySearch type="classifieds" />
            }
            { loggedIn ?
              <div className={styles.center} style={{marginTop: 20}}>
                <CreateClassifiedModal homepage />
              </div>
              :
              <div className={styles.center} style={{ marginTop: 20 }}> 
                <Link to="/register">
                  <ResizableButton
                    size="1.4"
                    primary
                    label="Register Now"
                  />
                </Link>
              </div>
            }
            <div className={styles.scrollToTopContainer}>
              {/* scrollToTopContainer is bad practice, but it was taking too long to do it the proper way */}
              <span className={styles.scrollToTop} onClick={() => window.scrollTo(0, 0)}>Back to the top</span>
            </div>
          </div>
        </section>
        <Snackbar
          open={messages.notify}
          message="Successfully Sent Message!"
          autoHideDuration={4000}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
  profileClassifieds: state.profileClassifieds,
  search_component: state.searchComponent,
  messages: state.messages
})

export default compose(
  connect(mapStateToProps, 
  {
    publicClassifiedsRequest,
    featuredProfilesRequest,
    newProfilesRequest,
    searchQueryRequest
  })
)(Homepage)
