import React from 'react'
import { connect } from 'react-redux'

import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'

import {
  searchAutocompleteRequest,
} from '../../containers/searchComponent/actions'


class TextInputWithSearchComponentSuggestions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuery: '',
    }
  }

  renderSuggestion(suggestion, { query, isHighlighted }) {
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
  }

  renderSuggestionsContainer({ containerProps, children }) {
    return <Paper {...containerProps} style={{ marginTop: 48, position: 'absolute', zIndex: 2, maxHeight: 192, overflowY: 'auto' }}>
      {children}
    </Paper>
  }

  render() {
    const {
      search_component: {
        suggestions
      },
      searchAutocompleteRequest,
      styles,
      placeholder,
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
      renderSuggestion={this.renderSuggestion}
      renderSuggestionsContainer={this.renderSuggestionsContainer}
      inputProps={{
        value: this.state.currentQuery,
        onChange: (event, { newValue }) => {
          this.setState({ currentQuery: newValue })
          this.props.input.onChange(newValue) //even though no onChange function is defined, calling it forces <Field /> to rerender this component
        },
        type: "text",
        placeholder: placeholder,
      }}
    />
  }
}

const mapStateToProps = state => ({
  search_component: state.searchComponent,
})

const connected = connect(mapStateToProps, {
  searchAutocompleteRequest,
})(TextInputWithSearchComponentSuggestions)

export default connected
