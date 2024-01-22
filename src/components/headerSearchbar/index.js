import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui/svg-icons/action/search'

import TextInputWithSearchComponentSuggestions from '../../components/textInputWithSearchComponentSuggestions'

import styles from './styles.module.scss'


class HeaderSearchbar extends React.Component {
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
    //let loggedIn = !!this.props.client.username

    const {
      handleSubmit,
    } = this.props

    return (
      <form
        onSubmit={handleSubmit(this.submit)}
        className={styles.searchBar}
      >
        <Field
          name="search_query"
          component={this.renderTextInputWithSearchSuggestions}
          className={styles.inputArea}
        />
        <IconButton
          type="submit"
          style={{
            backgroundColor: "#00703C",
            width: 36,
            height: 36,
            padding: 6
          }}
        >
          <SearchIcon color="white" />
        </IconButton>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
})

const connected = connect(mapStateToProps, {})(HeaderSearchbar)

const formed = reduxForm({
  form: 'headersearchBar',
})(connected)

export default formed