import React, { Component } from 'react'
import { reduxForm, Field, getFormValues, initialize, change } from 'redux-form'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import { Row, Col, Grid } from 'react-flexbox-grid'
import { map, isEmpty, filter } from 'lodash'

import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import RadioButton from 'material-ui/RadioButton'
import Snackbar from 'material-ui/Snackbar'
import Checkbox from 'material-ui/Checkbox'
import ClampLines from 'react-clamp-lines';

import { SelectField, Slider, RadioButtonGroup } from 'redux-form-material-ui'

import ExpandedIcon from 'material-ui/svg-icons/navigation/unfold-more'
import CollapsedIcon from 'material-ui/svg-icons/navigation/unfold-less'
import RadioIcon from 'material-ui/svg-icons/toggle/radio-button-unchecked'
import CheckedRadioIcon from 'material-ui/svg-icons/toggle/radio-button-checked'
import CheckboxIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import FlagIcon from 'material-ui/svg-icons/content/flag'

import EmptySearch from '../../components/emptySearch'
import InlineLoader from '../../components/inlineLoader'
//import StyledInput from '../../components/styledInput'
import ProfileCard from '../../components/profilecard'
import ClassifiedItem from '../../components/classifiedItem'
import ResizableButton from '../../components/resizableButton'
import RaisedButton from 'material-ui/RaisedButton'
import CreateClassifiedModal from '../createClassifiedModal'
import EditProfileItemsModal from '../editProfileItemsModal'

import {
  profileRequest
} from '../profile/actions'

import { 
  searchAutocompleteRequest,
  searchQueryRequest,
  classifiedsSearchRequest,
  getServicesList,
  getClassificationsList,
  getPaymentMethodsList,
  getSafetyStandardsList,
  getProcessingTypesList,
  getMarketTypesList,
  getCategoriesList,
  clearSearchQuery,
} from './actions'

import {
  productCategoriesRequest,
} from '../editProductsModal/actions'

import styles from './styles.module.scss'

import cx from '../../utils/class-names'

const compact = 1
const normal = 0
const breakpoint = 411

const scrollBuffer = 18

class SearchComponent extends Component {
  constructor(props) {
    super(props)  
    this.state = {
      mode: window.innerWidth < breakpoint ? compact : normal,
      collapsed: window.innerWidth < breakpoint ? true : false,
      shouldScroll: false,
      currentQuery: props.location.query.category || props.params.query === 'classifieds' ? '' : props.params.query !== undefined ? props.params.query : sessionStorage.getItem('search_parameters') ? JSON.parse(sessionStorage.getItem('search_parameters')).search_query : '',
    }
  }

  updateDimensions() {
    if (this.state.mode === compact && window.innerWidth >= breakpoint) {
      this.setState({ mode: normal })
    }
    else if (this.state.mode === normal && window.innerWidth < breakpoint) {
      this.setState({ mode: compact })
    }
  }

  submit = (values) => {
    const {
      client,
      searchQueryRequest,
      classifiedsSearchRequest,
    } = this.props

    if (values.list_filters && values.list_filters.roles && values.list_filters.roles.data.services_needed === "") {
      //this happens when services_needed is passed in through the url parameter and is unchecked. not sure what causes this case
      delete values.list_filters.roles.data.services_needed
    }

    const modifiedValues = {
      ...values,
      search_query: this.state.currentQuery
    }

    if (values.profile_type === "CLASSIFIEDS") {
      searchQueryRequest(client, { values: Object.assign({}, modifiedValues, { profile_type: 'ALL', list_filters: {}, value_filters: {} }) })
      classifiedsSearchRequest(client, { values: modifiedValues })
    }
    else {
      searchQueryRequest(client, { values: modifiedValues })
      classifiedsSearchRequest(client, { values: Object.assign({}, modifiedValues, { list_filters: {} }) })
    }
    sessionStorage.setItem('search_parameters', JSON.stringify(modifiedValues))

    browserHistory.push({
      pathname: '/search',
      search: ''
    })
  }

  loadMore = (values) => {
    const {
      client,
      searchQueryRequest,
      classifiedsSearchRequest,
      search_component
    } = this.props

    const modifiedValues = {
      ...values,
      search_query: this.state.currentQuery
    }

    let page = search_component.profiles.hits.hits.length / 24

    if (values.profile_type === 'CLASSIFIEDS') {
      classifiedsSearchRequest(client, { values: Object.assign({}, modifiedValues), page })
    } else {
      searchQueryRequest(client, { values: Object.assign({}, modifiedValues), page })
    }
  }

  handleInitializeSearch = () => {
    window.scrollTo(0, 0)
    const {
      params,
      handleSubmit,
      location,
      dispatch
    } = this.props

    const defaultFormValues = {
      'search_query': (params.query !== undefined && params.query !== "classifieds") ? params.query : '',
      'profile_type': params.query === "classifieds" ? "CLASSIFIEDS" : location.query.profile_type ? location.query.profile_type : "ALL",
      'list_filters': {
        'roles': {
          'data': {}
        },
        'category': location.query.category ? [location.query.category] : [],
      },
      'value_filters': {
        'roles': {
          'data': {}
        }
      },
      'classified_filters': {}
    }

    if (location.query.services_needed) defaultFormValues.list_filters.roles.data.services_needed = [location.query.services_needed]

    const initialFormValues = params.query || location.query.category? defaultFormValues : sessionStorage.getItem('search_parameters') ? JSON.parse(sessionStorage.getItem('search_parameters')) : defaultFormValues

    dispatch(initialize('search', initialFormValues))
    if ((params.query && params.query !== "undefined") || location.query) setTimeout(handleSubmit(this.submit))
  }

  UNSAFE_componentWillMount() {
    window.scrollTo(0, 0)
    document.body.style.backgroundColor = "#F5F4F5"
    window.addEventListener("resize", this.updateDimensions.bind(this))
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null
    window.removeEventListener("resize", this.updateDimensions.bind(this))
    this.props.clearSearchQuery()
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      params: {
        query
      },
      handleSubmit
    } = this.props

    if (this.state.shouldScroll) {
      this.setState({
        shouldScroll: false,
      })

      if (this.state.mode === compact) {
        setTimeout(this.scrollDownSearch, 1000)
      }
    }

    if (query !== prevProps.params.query && query !== undefined) {
      this.handleInitializeSearch()
    }

    if (prevState.currentQuery !== this.state.currentQuery) {
      setTimeout(handleSubmit(this.submit))
    }
  }

  componentDidMount() {
    const {
      client,
      getServicesList,
      getPaymentMethodsList,
      getSafetyStandardsList,
      getProcessingTypesList,
      getMarketTypesList,
      getClassificationsList,
      getCategoriesList,
      productCategoriesRequest,
      profileRequest
    } = this.props

    this.handleInitializeSearch()

    getClassificationsList()
    getServicesList()
    getPaymentMethodsList()
    getSafetyStandardsList()
    getProcessingTypesList()
    getMarketTypesList()
    getCategoriesList()
    productCategoriesRequest()
    if (client && client.token) {
      profileRequest(client)
    }
  }

  clearFilters = () => {
    const {
      dispatch,
      handleSubmit,
    } = this.props

    dispatch(change('search', 'profile_type', 'ALL'))
    dispatch(change('search', 'list_filters', {
      'roles': {
        'data': {}
      },
      'category': [],
    }))
    dispatch(change('search', 'value_filters', {
      'roles': {
        'data': {}
      }
    }))
    dispatch(change('search', 'classified_filters', {}))
    dispatch(change('search', 'distance', null))
    dispatch(change('search', 'looking_for', ""))
    dispatch(change('search', 'looking_for', undefined))
    this.setState({
      currentQuery: '',
    })
    setTimeout(handleSubmit(this.submit), 1000)
  }

  toggleExpandCollapse = () => {
    if (!this.state.collapsed && this.state.mode === compact) {
      this.scrollDownSearch()
    }

    this.setState({
      collapsed: !this.state.collapsed,
      shouldScroll: false
    })
  }

  refreshClassifiedsSearchResults = () => {
    const {
      handleSubmit
    } = this.props

    const submitter = handleSubmit(this.submit)
    submitter()
  }

  scrollDownSearch = () => {
    window.scrollTo({
      top: document.getElementById('resultsRef').offsetTop - scrollBuffer,
      behavior: "smooth"
    })
  }

  renderAutocomplete = props => {
    const {
      search_component: {
        suggestions
      },
      searchAutocompleteRequest,
    } = this.props
    return <Autosuggest
      key="autocomplete"
      theme={styles}
      className={styles.autocompleteDiv}
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) => searchAutocompleteRequest({ query: value })}
      onSuggestionsClearRequested={() => searchAutocompleteRequest({ query: "" })}
      onSuggestionSelected={(event, { suggestionValue }) => this.setState({ currentQuery: suggestionValue })}
      getSuggestionValue={suggestion => suggestion}
      renderSuggestion={(suggestion, { query, isHighlighted }) => {
        const matches = match(suggestion, query)
        const parts = parse(suggestion, matches)

        return <MenuItem>
          <div>
            {parts.map((part, index) => {
              return part.highlight ? (
                <strong key={String(index)}>
                  {part.text}
                </strong>
              ) : (
                  <strong key={String(index)} style={{ fontWeight: 300 }}>
                    {part.text}
                  </strong>
                )
            })}
          </div>
        </MenuItem>
      }}
      inputProps={{
        value: this.state.currentQuery,
        onChange: (event, { newValue }) => {
          this.setState({ currentQuery: newValue })
          props.input.onChange(newValue) //even though no onChange function is defined, calling it forces <Field /> to rerender this component
        },
        type: "text",
        placeholder: "What are you looking for today?",
      }}
      renderSuggestionsContainer={({ containerProps, children }) =>
        <Paper {...containerProps} style={{ marginTop: 48, position: 'absolute', zIndex: 2, maxHeight: 192, overflowY: 'auto' }}>
          {children}
        </Paper>
      }
    />
  }

  renderCheckbox = ({ input }) => (
    <Checkbox
      label={'View classifieds ending soon'}
      uncheckedIcon={<CheckboxIcon style={{ fill: '#949799' }} />}
      checked={input.value ? true : false}
      onCheck={input.onChange}
      style={{ marginTop: 30, backgroundColor: '#A9ABAE', padding: 10, borderRadius: 4, border: '1px solid #A9ABAE' }}
      labelStyle={{color: '#FFFFFF'}}
    />
  )

  renderClassifiedsSection = search_component => {
    return !search_component.classified_search.requesting ?
      map(search_component.classifieds.hits.hits, (item) =>
        <Col
          xs={12}
          key={item._id}
        >
          <ClassifiedItem
            looking_for={item._source.looking_for}
            title={item._source.title}
            description={item.highlight.description ? (item.highlight.description[0][0] + item.highlight.description[0][1] + item.highlight.description[0][2]) : item._source.description}
            photo_file_name={item._source.photo_file_name}
            account={item._source.account}
            classified_id={item._source.id}
            category={item._source.category}
            needed_by={item._source.needed_by}
            brief={true}
          />
        </Col>
      )
    :
      <Col xs={12}>
        <ClassifiedItem
          loading
          title={"Please Wait..."}
          description={<InlineLoader />}
        />
      </Col>
  }

  renderProfilesSection = (search_component, longitude, latitude) => {
    if (search_component.search_query.requesting) {
      return map([0, 0, 0], (item, index) =>
        <ProfileCard
          threeByThree
          key={"dummyProfile" + index}
          description={
            <InlineLoader />
          }
        />
      )
    }
    else {
      if (search_component.profiles.hits.hits.length) {
        return map(search_component.profiles.hits.hits, (item) => {
          const highlightedDescription = item.highlight.description ? (item.highlight.description[0][0] + item.highlight.description[0][1] + item.highlight.description[0][2]).replace(/(\r\n|\n|\r)/gm, " ") : ''
          const regularDescription = item._source.description ? (item._source.description[0][0] + item._source.description[0][1] + item._source.description[0][2]).replace(/(\r\n|\n|\r)/gm, " ") : ''
          return <ProfileCard
            threeByThree
            key={item._id}
            slug={item._source.slug}
            business_name={item._source.business_name}
            photo_file_name={item._source.photo_file_name}
            description={
              item.highlight["roles.data.products.name"] ?
                <ClampLines
                  text={"Products: " + map(item.highlight["roles.data.products.name"], (item, key) => { return item[0] + item[1] + item[2] }).join(", ")}
                  lines={2}
                  ellipsis="..."
                  buttons={false}
                />
                : highlightedDescription ?
                  <ClampLines
                    text={highlightedDescription}
                    lines={2}
                    ellipsis="..."
                    buttons={false}
                  />
                  : regularDescription ?
                    <ClampLines
                      text={regularDescription}
                      lines={2}
                      ellipsis="..."
                      buttons={false}
                    />
                    : "Visit our profile to learn more."
            }
            location={!isEmpty(item._source.addresses) && item._source.addresses[0].city + (Array.isArray(item.sort) && typeof latitude === 'number' && (latitude !== 0 || longitude !== 0) ? ' | ' + parseFloat(Math.round(item.sort[1] * 100) / 100).toFixed(2) + 'km' : '')}
          />
        })
      }
      else {
        return <Col xs={12}>
          <div className={styles.heading} style={{ marginBottom: '14px' }}>
            <EmptySearch />
          </div>
        </Col>
      }
    }
  }

  render () {
    const {
      handleSubmit,
      search_component,
      form_values,
      client,
      messages,
      profile: {
        requesting,
        current: {
          id,
          longitude,
          latitude,
        }
      }
    } = this.props

    let loggedIn = !!client.username
    let buckets = []
    if (search_component && search_component.profiles && search_component.profiles.aggregations &&
      search_component.profiles.aggregations.roles && search_component.profiles.aggregations.roles.roles.buckets) {
      buckets = search_component.profiles.aggregations.roles.roles.buckets
    }
    const defaultBucket = { doc_count: 0 }
    const sellBucket = filter(buckets, ['key', 'SELLS'])[0] || defaultBucket
    const buyBucket = filter(buckets, ['key', 'BUYS'])[0] || defaultBucket
    const processBucket = filter(buckets, ['key', 'PROCESSES'])[0] || defaultBucket
    const serviceBucket = filter(buckets, ['key', 'BUSINESS OPPORTUNITIES'])[0] || defaultBucket
    const organizationBucket = filter(buckets, ['key', 'ORG'])[0] || defaultBucket
    const totalLengthForCurrentFilter = (form_values && buckets.length > 0 && (
      form_values.profile_type === 'SELLS' ? sellBucket.doc_count :
      form_values.profile_type === 'BUYS' ? buyBucket.doc_count :
      form_values.profile_type === 'PROCESSES' ? processBucket.doc_count :
      form_values.profile_type === 'BUSINESS OPPORTUNITIES' ? serviceBucket.doc_count :
      form_values.profile_type === 'ORG' ? organizationBucket.doc_count :
      search_component.profiles.hits.total
    )) || 0
    const category_map = search_component.lists.category_map || {}
    const searchComponentSelectFieldStylings = this.state.mode === compact ? { fontSize: 13 } : {}

    const filtersLoaded = !search_component.search_query.requesting && !search_component.classified_search.requesting

    return (
      <div className={styles.searchContainer}>
        <Grid fluid>
          <form
            onChange={() => setTimeout(handleSubmit(this.submit))}
            onSubmit={handleSubmit(this.submit)}
            className={styles.searchBar}
          >
            <Field
              name="search_query"
              component={this.renderAutocomplete}
              onKeyPress={(event) => { if (event.key === 'Enter') {
                  this.scrollDownSearch()
                }
              }}
            />
            <RaisedButton
              primary
              type="submit"
              label="Search"
              size="1.2"
              className={styles.searchButton}
              disabled={search_component.search_query.requesting || 
                        search_component.classified_search.requesting ||
                        search_component.services_list.requesting ||
                        search_component.classifications_list.requesting ||
                        search_component.payment_methods_list.requesting ||
                        search_component.safety_standards_list.requesting ||
                        search_component.processing_types_list.requesting ||
                        search_component.market_types_list.requesting ||
                        search_component.categories_list.requesting ||
                        search_component.product_categories_list.requesting
                       }
              style={{
                //this may seem redundant with styles.searchButton, but it is necessary because there is always 1 second when this element is rendered but the css isn't loaded
                height: 48
              }}
              onClick={this.scrollDownSearch}
            />
          </form>
          {form_values &&
          <Col xs={12}>
            <div className={styles.heading} style={{ marginBottom: '14px' }}>
            {form_values.profile_type !== "CLASSIFIEDS" &&
              <h2 style={{ display: 'inline', fontSize: '1.125rem' }}>
              { search_component.search_query.requesting ?
                'Loading Profile Results'
              :
                [
                  totalLengthForCurrentFilter.toLocaleString(),
                  ' Profile Results',
                  (this.state.currentQuery ?
                    ` for "${this.state.currentQuery}"`
                    : null
                  ),
                ]
              }
              </h2>
            }
            {form_values.profile_type === "CLASSIFIEDS" &&
              <h2 style={{ fontSize: '1.125rem', marginBottom: 0 }}>
                { search_component.classified_search.requesting ?
                  'Loading ' :
                  search_component.classifieds.hits.total.toLocaleString()
                }
                {' Classifieds'}
                {this.state.currentQuery && ` for "${this.state.currentQuery}"`}
              </h2>
            }
            </div>
          </Col>
          }
          <RaisedButton
            primary
            label="Clear Filters"
            size="1.2"
            className={styles.clearFiltersButton}
            onClick={this.clearFilters}
          />
          <Row id="resultsRef">
            <Col xs={12} sm={4} md={3} className={styles.searchFilters} style={{marginBottom: 40}}>
              <Paper
                style={{ padding: '1rem', boxShadow: "0 1px 2px 0 rgba(0,0,0,.2)", backgroundColor: "#5B5F63" }}
              >
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <span className={cx(styles.fieldLabel, styles.collapseExpandedButton)} onClick={this.toggleExpandCollapse}>Search filters</span>
                  {this.state.collapsed ?
                    <ExpandedIcon className={styles.collapseExpandedButton} onClick={this.toggleExpandCollapse} style={{ fill: '#FFFFFF' }} /> :
                    <CollapsedIcon className={styles.collapseExpandedButton} onClick={this.toggleExpandCollapse} style={{ fill: '#FFFFFF' }} />
                  }
                </div>
                <Divider className={styles.divider} />
                {!this.state.collapsed &&
                <form 
                  onChange={() => setTimeout(handleSubmit(this.submit))}
                  onSubmit={handleSubmit(this.submit)}
                  style={{marginBottom: 0}}
                >
                  <Field
                    name="profile_type"
                    component={RadioButtonGroup}
                    onChange={() => this.setState({ shouldScroll: true })}
                  >
                    <RadioButton value="ALL"
                                uncheckedIcon={<RadioIcon style={{ fill: '#949799' }} />}
                                checkedIcon={<CheckedRadioIcon style={{fill: '#FFFFFF'}} />}
                                label={(filtersLoaded && search_component.profiles && search_component.profiles.hits ?
                                        <span className={styles.searchFilter}>All Profiles <span className={styles.filterNumber}>{search_component.profiles.hits.total.toLocaleString()}</span></span>
                                        :
                                        <span className={styles.searchFilter}>All Profiles</span>)
                                }
                    />
                    <RadioButton value="SELLS"
                                uncheckedIcon={<RadioIcon style={{ fill: '#949799' }} />}
                                checkedIcon={<CheckedRadioIcon style={{fill: '#FFFFFF'}} />}
                                label={(filtersLoaded && buckets.length > 0 ?
                                        <span className={styles.searchFilter}>Suppliers <span className={styles.filterNumber}>{(sellBucket.doc_count || 0).toLocaleString()}</span></span>
                                        :
                                        <span className={styles.searchFilter}>Suppliers</span>)
                                }
                    />
                    <RadioButton value="PROCESSES"
                                uncheckedIcon={<RadioIcon style={{ fill: '#949799' }} />}
                                checkedIcon={<CheckedRadioIcon style={{fill: '#FFFFFF'}} />}
                                label={(filtersLoaded && buckets.length > 0 ?
                                        <span className={styles.searchFilter}>Processors <span className={styles.filterNumber}>{(processBucket.doc_count || 0).toLocaleString()}</span></span>
                                        :
                                        <span className={styles.searchFilter}>Processors</span>)
                                      }
                    />
                    <RadioButton value="BUYS"
                                uncheckedIcon={<RadioIcon style={{fill: '#949799'}} />}
                                checkedIcon={<CheckedRadioIcon style={{ fill: '#FFFFFF' }} />}
                                label={(filtersLoaded && buckets.length > 0 ?
                                        <span className={styles.searchFilter}>Buyers <span className={styles.filterNumber}>{(buyBucket.doc_count || 0).toLocaleString()}</span></span>
                                        :
                                        <span className={styles.searchFilter}>Buyers</span>)
                                      }
                    />
                    <RadioButton value="BUSINESS OPPORTUNITIES"
                                uncheckedIcon={<RadioIcon style={{ fill: '#949799' }} />}
                                checkedIcon={<CheckedRadioIcon style={{ fill: '#FFFFFF' }} />}
                                label={(filtersLoaded && buckets.length > 0 ?
                                        <span className={styles.searchFilter}>Service Providers <span className={styles.filterNumber}>{(serviceBucket.doc_count || 0).toLocaleString()}</span></span>
                                        :
                                        <span className={styles.searchFilter}>Service Providers</span>)
                                      }
                    />
                    <RadioButton value="ORG"
                                uncheckedIcon={<RadioIcon style={{fill: '#949799'}} />}
                                checkedIcon={<CheckedRadioIcon style={{fill: '#FFFFFF'}} />}
                                label={(filtersLoaded && buckets.length > 0 ?
                                        <span className={styles.searchFilter}>Buy Local Networks <span className={styles.filterNumber}>{(organizationBucket.doc_count || 0).toLocaleString()}</span></span>
                                        :
                                        <span className={styles.searchFilter}>Buy Local Networks</span>)
                                      }
                    />
                    <RadioButton value="CLASSIFIEDS"
                                uncheckedIcon={<RadioIcon style={{fill: '#949799'}} />}
                                checkedIcon={<CheckedRadioIcon style={{fill: '#FFFFFF'}} />}
                                style={{fontSize: 19, fontWeight: 900}}
                                label={(filtersLoaded && search_component.classifieds && search_component.classifieds.hits ?
                                        <span className={styles.classifiedFilter}>Classifieds <span className={styles.filterNumber}>{search_component.classifieds.hits.total.toLocaleString()}</span><FlagIcon style={{ fill: 'red' }} /></span>
                                        :
                                        <span className={styles.classifiedFilter}>Classifieds<FlagIcon style={{ fill: 'red' }} /></span>)
                                      }
                    />
                  </Field>
                  { form_values && 
                  <div>
                    <div className={styles.filterHeading} />
                    {form_values.profile_type !== "CLASSIFIEDS" && loggedIn && !requesting && typeof latitude === 'number' && (latitude !== 0 || longitude !== 0) &&
                      <div style={{ marginBottom: -20 }}>
                        <h4 className={styles.filterHeading}>Filter by distance {`${form_values.distance ? `(` + form_values.distance + `km)` : ''}`} </h4>
                        <Field
                          name="distance"
                          component={Slider}
                          defaultValue={0}
                          format={null}
                          min={0}
                          max={1000}
                          step={1}
                          onChange={() => setTimeout(handleSubmit(this.submit))}
                          normalize={v => { return v === 0 ? null : v }}
                        />
                      </div>
                    }
                    {form_values.profile_type !== "CLASSIFIEDS" && loggedIn && !requesting && typeof latitude === 'number' && latitude === 0 && longitude === 0 &&
                      <div>
                        <h4 className={styles.filterHeading}>Filter by distance</h4>
                        <div style={{marginBottom:20, marginTop: 20}}>
                          <EditProfileItemsModal onSearchComponent id={id} />
                        </div>
                      </div>
                    }
                    {form_values.profile_type !== "CLASSIFIEDS" &&
                      <span key='businessOpportunities' className={styles.fieldLabel}>Find businesses by</span>
                    }
                    {/*form_values.profile_type !== "CLASSIFIEDS" &&
                      <Field
                        name="filters.addresses.city"
                        type="text"
                        label="Filter by City"
                        component={StyledInput}
                      />
                    */}
                    {(form_values.profile_type === "SELLS" || form_values.profile_type === "PROCESSES") &&
                      <Field
                        name="list_filters.roles.data.classifications"
                        style={{width: '100%', marginTop: -14}}
                        component={SelectField}
                        floatingLabelText="Business Classifications"
                        floatingLabelStyle={{color: "#949799"}}
                        labelStyle={{color: "#50B948"}}
                        multiple={true}
                        autoWidth={true}
                        onChange={() => setTimeout(handleSubmit(this.submit))}
                        menuItemStyle={searchComponentSelectFieldStylings}
                        normalize={v => { return isEmpty(v) ? '' : v }}
                      >
                        {map(search_component.lists && search_component.lists.classifications && search_component.lists.classifications, (item, key) =>
                          <MenuItem
                            key={key}
                            value={item.value}
                            primaryText={item.label}
                            checked={form_values && form_values.list_filters && form_values.list_filters.roles && form_values.list_filters.roles.data.classifications && form_values.list_filters.roles.data.classifications.indexOf(item.value) > -1}
                            insetChildren={true}
                          />
                        )}
                      </Field>
                    }
                    {form_values.profile_type !== "CLASSIFIEDS" &&
                      <Field
                        name="list_filters.category"
                        style={{width: '100%', marginTop: -14}}
                        component={SelectField}
                        floatingLabelText="Business Types"
                        floatingLabelStyle={{color: "#949799"}}
                        labelStyle={{color: "#50B948"}}
                        multiple={true}
                        autoWidth={true}
                        onChange={() => setTimeout(handleSubmit(this.submit))}
                        menuItemStyle={searchComponentSelectFieldStylings}
                        // normalize={v => { return isEmpty(v) ? '' : v }}
                      >
                        {map(search_component.lists && search_component.lists.categories, (item, key) =>
                          <MenuItem
                            key={key}
                            value={item}
                            primaryText={search_component.profiles.aggregations && search_component.profiles.aggregations[item] ? `${item} (${search_component.profiles.aggregations[item].doc_count})` : item}
                            checked={form_values && form_values.list_filters && form_values.list_filters.category && form_values.list_filters.category.indexOf(item) > -1}
                            insetChildren={true}
                          />
                        )}
                      </Field>
                    }
                    {(form_values.profile_type === "BUYS" || form_values.profile_type === "SELLS" || form_values.profile_type === "PROCESSES") &&
                      <Field
                        name="list_filters.roles.data.safety_standards"
                        style={{width: '100%', marginTop: -14}}
                        component={SelectField}
                        floatingLabelText="Food Safety &amp; Traceability"
                        floatingLabelStyle={{color: "#949799"}}
                        labelStyle={{color: "#50B948"}}
                        multiple={true}
                        autoWidth={true}
                        onChange={() => setTimeout(handleSubmit(this.submit))}
                        menuItemStyle={searchComponentSelectFieldStylings}
                        normalize={v => { return isEmpty(v) ? '' : v }}
                      >
                        {map(search_component.lists && search_component.lists.safety_standards && search_component.lists.safety_standards, (item, key) =>
                          <MenuItem
                            key={key}
                            value={item.value}
                            primaryText={item.label}
                            checked={form_values && form_values.list_filters && form_values.list_filters.roles && form_values.list_filters.roles.data.safety_standards && form_values.list_filters.roles.data.safety_standards.indexOf(item.value) > -1}
                            insetChildren={true}
                          />
                        )}
                      </Field>
                    }
                    {form_values.profile_type === "PROCESSES" &&
                      <Field
                        name="list_filters.roles.data.processing_types"
                        style={{width: '100%', marginTop: -14}}
                        component={SelectField}
                        floatingLabelText="Processing Methods"
                        floatingLabelStyle={{color: "#949799"}}
                        labelStyle={{color: "#50B948"}}
                        multiple={true}
                        autoWidth={true}
                        onChange={() => setTimeout(handleSubmit(this.submit))}
                        menuItemStyle={searchComponentSelectFieldStylings}
                        normalize={v => { return isEmpty(v) ? '' : v }}
                      >
                        {map(search_component.lists && search_component.lists.processing_types && search_component.lists.processing_types, (item, key) =>
                          <MenuItem
                            key={key}
                            value={item.value}
                            primaryText={item.label}
                            checked={form_values && form_values.list_filters && form_values.list_filters.roles && form_values.list_filters.roles.data.processing_types && form_values.list_filters.roles.data.processing_types.indexOf(item.value) > -1}
                            insetChildren={true}
                          />
                        )}
                      </Field>
                    }
                    {(form_values.profile_type === "BUYS" || form_values.profile_type === "SELLS" || form_values.profile_type === "PROCESSES") &&
                      <Field
                        name="value_filters.roles.data.products.category"
                        style={{width: '100%', marginTop: -14}}
                        component={SelectField}
                        floatingLabelText="Product Categories"
                        floatingLabelStyle={{color: "#949799"}}
                        labelStyle={{color: "#50B948"}}
                        multiple={true}
                        autoWidth={true}
                        onChange={() => setTimeout(handleSubmit(this.submit))}
                        menuItemStyle={searchComponentSelectFieldStylings}
                        normalize={v => { return isEmpty(v) ? '' : v }}
                      >
                        {Object.entries(category_map).map(([key, value]) =>
                          <MenuItem
                            key={key}
                            value={+key}
                            primaryText={value}
                            checked={form_values.value_filters && form_values.value_filters.roles && form_values.value_filters.roles.data && form_values.value_filters.roles.data.products && form_values.value_filters.roles.data.products.category && form_values.value_filters.roles.data.products.category.indexOf(+key) > -1}
                            insetChildren={true}
                          />
                        )} 
                      </Field>
                    }
                    {form_values.profile_type !== "CLASSIFIEDS" &&
                      [
                        <Field
                          key='servicesOffered'
                          name="list_filters.roles.data.services_provided"
                          style={{width: '100%', marginTop: -14}}
                          component={SelectField}
                          floatingLabelText="Services Offered"
                          floatingLabelStyle={{color: "#949799"}}
                          labelStyle={{color: "#50B948"}}
                          multiple={true}
                          autoWidth={true}
                          onChange={() => setTimeout(handleSubmit(this.submit))}
                          menuItemStyle={searchComponentSelectFieldStylings}
                          normalize={v => { return isEmpty(v) ? '' : v }}
                        >
                          {map(search_component.lists && search_component.lists.services && search_component.lists.services, (item, key) =>
                            <MenuItem
                              key={key}
                              value={item.value}
                              primaryText={item.label}
                              checked={form_values.list_filters && form_values.list_filters.roles && form_values.list_filters.roles.data.services_provided && form_values.list_filters.roles.data.services_provided.indexOf(item.value) > -1}
                              insetChildren={true}
                            />
                          )}
                        </Field>,
                        <Field
                          key='servicesNeeded'
                          name="list_filters.roles.data.services_needed"
                          style={{ width: '100%', marginTop: -14 }}
                          component={SelectField}
                          floatingLabelText="Services Needed"
                          floatingLabelStyle={{color: "#949799"}}
                          labelStyle={{ color: "#50B948" }}
                          multiple={true}
                          autoWidth={true}
                          onChange={() => setTimeout(handleSubmit(this.submit))}
                          menuItemStyle={searchComponentSelectFieldStylings}
                          normalize={v => {return isEmpty(v) ? '' : v}}
                        >
                          {map(search_component.lists && search_component.lists.services && search_component.lists.services, (item, key) =>
                            <MenuItem
                              key={key}
                              value={item.value}
                              primaryText={item.label}
                              checked={form_values.list_filters && form_values.list_filters.roles && form_values.list_filters.roles.data.services_needed && form_values.list_filters.roles.data.services_needed.indexOf(item.value) > -1}
                              insetChildren={true}
                            />
                          )}
                        </Field>
                      ]
                    }

                    { form_values.profile_type === "CLASSIFIEDS" && 
                    <div>
                      <h4 className={styles.filterHeading} style={{ marginBottom: 10 }}>Classified Type</h4>
                      <Field
                        name="looking_for"
                        component={RadioButtonGroup}
                      >
                        <RadioButton uncheckedIcon={<RadioIcon style={{ fill: '#949799' }} />} checkedIcon={<CheckedRadioIcon style={{ fill: '#FFFFFF' }} />} value="" label={<span className={styles.searchFilter}>All Classifieds</span>} />
                        <RadioButton uncheckedIcon={<RadioIcon style={{ fill: '#949799' }} />} checkedIcon={<CheckedRadioIcon style={{ fill: '#FFFFFF' }} />} value="true" label={<span className={styles.searchFilter}>Wanted</span>} />
                        <RadioButton uncheckedIcon={<RadioIcon style={{ fill: '#949799' }} />} checkedIcon={<CheckedRadioIcon style={{ fill: '#FFFFFF' }} />} value="false" label={<span className={styles.searchFilter}>For Sale</span>} />
                      </Field>
                    </div>
                    }
                    {/* { (form_values.profile_type === " BUYS" || form_values.profile_type === "SELLS" || form_values.profile_type === "PROCESSES") &&
                      <div>
                        <Field
                          name="filters.roles.data.delivery"
                          type="checkbox"
                          label="Offers Delivery"
                          component={Checkbox}
                          normalize={v => { return v === false ? '' : v }}
                        />
                        <Field
                          name="filters.roles.data.third_party_insurance"
                          type="checkbox"
                          label="Third-Party Insurance"
                          component={Checkbox}
                          normalize={v => { return v === false ? '' : v }}
                        />
                      </div>
                    } */}
                    {/* { form_values.profile_type === "PROCESSES" &&
                      <Field
                        name="filters.roles.data.custom_process"
                        type="checkbox"
                        label="Offers Custom Processing"
                        component={Checkbox}
                        normalize={v => { return v === false ? '' : v }}
                      />
                    } */}
                    {/* { (form_values.profile_type !== "ALL" && form_values.profile_type !== "CLASSIFIEDS" && form_values.profile_type !== "ORG") &&
                      <Field
                        name="list_filters.roles.data.payment_methods"
                        component={SelectField}
                        floatingLabelText="Payment Methods"
                        multiple={true}
                        autoWidth={true}
                        onChange={() => setTimeout(handleSubmit(this.submit))}
                        menuItemStyle={searchComponentSelectFieldStylings}
                        normalize={v => { return isEmpty(v) ? '' : v }}
                      >
                        {map(search_component.lists && search_component.lists.payment_methods && search_component.lists.payment_methods, (item, key) =>
                          <MenuItem
                            key={key}
                            value={item.value}
                            primaryText={item.label}
                            checked={form_values.list_filters && form_values.list_filters.roles.data.payment_methods && form_values.list_filters.roles.data.payment_methods.indexOf(item.value) > -1}
                            insetChildren={true}
                          />
                        )}
                      </Field>
                    } */}
                    {/* form_values.profile_type === "PROCESSES" &&
                      <div>
                        <Field
                          name="list_filters.roles.data.market_types"
                          style={{width: '100%'}}
                          component={SelectField}
                          floatingLabelText="Market Types"
                          multiple={true}
                          autoWidth={true}
                          onChange={() => setTimeout(handleSubmit(this.submit))}
                          menuItemStyle={searchComponentSelectFieldStylings}
                          normalize={v => { return isEmpty(v) ? '' : v }}
                        >
                          {map(search_component.lists && search_component.lists.market_types && search_component.lists.market_types, (item, key) =>
                            <MenuItem
                              key={key}
                              value={item.value}
                              primaryText={item.label}
                              checked={form_values.list_filters && form_values.list_filters.roles.data.market_types && form_values.list_filters.roles.data.market_types.indexOf(item.value) > -1}
                              insetChildren={true}
                            />
                          )}
                        </Field>
                      </div>*/
                    }
                    {
                      form_values.profile_type === "CLASSIFIEDS" &&
                      <div>
                        <Field
                          name="classified_filters.category"
                          style={{ width: '100%', marginTop: -14 }}
                          component={SelectField}
                          floatingLabelText="Categories"
                          floatingLabelStyle={{ color: "#949799" }}
                          labelStyle={{ color: "#50B948" }}
                          multiple={true}
                          autoWidth={true}
                          onChange={() => setTimeout(handleSubmit(this.submit))}
                          menuItemStyle={searchComponentSelectFieldStylings}
                          normalize={v => { return isEmpty(v) ? '' : v }}
                        >
                          {Object.entries(category_map).map(([key, value]) =>
                            <MenuItem
                              key={key}
                              value={key}
                              primaryText={value}
                              checked={form_values.classified_filters && form_values.classified_filters.category && form_values.classified_filters.category.indexOf(key) > -1}
                              insetChildren={true}
                            />
                          )}
                        </Field>
                        <Field
                          name="expired_by"
                          style={{ width: '100%' }}
                          component={this.renderCheckbox}
                          autoWidth={true}
                          onChange={() => setTimeout(handleSubmit(this.submit))}
                        />
                        <div className={styles.center} style={{ marginTop: 20 }}>
                          {loggedIn ?
                            <CreateClassifiedModal callback={() => setTimeout(this.refreshClassifiedsSearchResults, 3000)}/>
                          :
                            <Link to="/register">
                              <ResizableButton
                                fullWidth
                                primary
                                size="1.2"
                                longText
                                label="Post a Classified"
                              />
                            </Link>
                          }
                        </div>
                      </div>
                    }
                  </div>
                  }
                </form>
                }
              </Paper>
            </Col>
            <Col xs={12} sm={8} md={9}>
              { form_values &&
              <Row>
                { form_values.profile_type === "CLASSIFIEDS" ? this.renderClassifiedsSection(search_component) : null }
                { form_values.profile_type !== "CLASSIFIEDS" ? this.renderProfilesSection(search_component, longitude, latitude) : null }
              </Row>
              }
              { form_values && form_values.profile_type !== "CLASSIFIEDS" && search_component.profiles.hits &&
                <ResizableButton
                  fullWidth
                  disabled={search_component.search_query.requesting || (search_component.profiles.hits && search_component.profiles.hits.hits.length === totalLengthForCurrentFilter)}
                  primary
                  size="1.2"
                  label={search_component.classifieds && search_component.classifieds.hits === 0 && totalLengthForCurrentFilter === 0 ? "No Results" : search_component.profiles.hits && search_component.profiles.hits.hits.length === totalLengthForCurrentFilter ? "No More Profile Results" : "Load More Profiles"}
                  onClick={() => setTimeout(handleSubmit(this.loadMore))}
                />          
              }
              { form_values && form_values.profile_type === "CLASSIFIEDS" &&
                <ResizableButton
                  fullWidth
                  disabled={search_component.classified_search.requesting || (search_component.classifieds.hits && search_component.classifieds.hits.hits.length === search_component.classifieds.hits.total)}
                  primary
                  size="1.2"
                  label={search_component.classifieds.hits && search_component.classifieds.hits.total === 0 ? "No Results" : search_component.classifieds.hits && search_component.classifieds.hits.hits.length === search_component.classifieds.hits.total ? "No More Classified Results" : "Load More Classifieds"}
                  onClick={() => setTimeout(handleSubmit(this.loadMore))}
                /> 
              }
            </Col>
          </Row>
          <span className={styles.scrollToTop} onClick={() => window.scrollTo(0, 0)}>Back to the top</span>
        </Grid>
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
  search_component: state.searchComponent,
  form_values: getFormValues('search')(state),
  messages: state.messages
})

const connected = connect(mapStateToProps, {
  searchAutocompleteRequest,
  searchQueryRequest,
  classifiedsSearchRequest,
  getServicesList,
  getClassificationsList,
  getPaymentMethodsList,
  getSafetyStandardsList,
  getProcessingTypesList,
  getMarketTypesList,
  getCategoriesList,
  productCategoriesRequest,
  clearSearchQuery,
  profileRequest //loads the authed profile into current so the account information modal is functional
})(SearchComponent)

const formed = reduxForm({
  form: 'search',
})(connected)

export default formed
