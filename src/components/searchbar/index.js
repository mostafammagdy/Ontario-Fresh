import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import MediaQuery from 'react-responsive'

import TransparentButton from '../transparentButton'
import RaisedButton from 'material-ui/RaisedButton'

import TextInputWithSearchComponentSuggestions from '../../components/textInputWithSearchComponentSuggestions'

import cx from '../../utils/class-names'

import styles from './styles.module.scss'


class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuery: '',
    }
  }

  submit = (values) => {
    values.search_query === undefined ? 
      browserHistory.push('/search/')
      : 
      browserHistory.push(`/search/${values.search_query}`)
  }

  renderTextInputWithSearchSuggestions = (props) => {
    return <TextInputWithSearchComponentSuggestions {...props} styles={styles} placeholder="ex: cheese, apples, distributors" />
  }

  render () {
    let loggedIn = !!this.props.client.username

    const {
      handleSubmit,
    } = this.props

    return (
      <div className={styles.searchContainer}>
        <span className={styles.textShadow}>What are you looking for?</span>
        <form
          onSubmit={handleSubmit(this.submit)}
          className={styles.searchBar}
        >
          <Field
            name="search_query"
            component={this.renderTextInputWithSearchSuggestions}
            className={cx(styles.inputArea, styles.shadow)}
          />
          <RaisedButton
            primary
            type="submit"
            label="Search"
            size="1.2"
            className={cx(styles.searchButton, styles.shadow)}
            style={{
              //this may seem redundant with styles.searchButton, but it is necessary because there is always 1 second when this element is rendered but the css isn't loaded
              height: 48
            }}
          />
          { !loggedIn &&
          <MediaQuery minWidth={814}>
            <Link to="/register">
              <TransparentButton
                size="1.2"
                label="Register"
                className={cx(styles.transparentButton, styles.shadow)}
                style={{
                  //this may seem redundant with styles.transparentButton, but it is necessary because there is always 1 second when this element is rendered but the css isn't loaded
                  height: 48
                }}
              />
            </Link>
          </MediaQuery>
          }
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
})

const connected = connect(mapStateToProps, {})(SearchBar)

const formed = reduxForm({
  form: 'searchBar',
})(connected)

export default formed