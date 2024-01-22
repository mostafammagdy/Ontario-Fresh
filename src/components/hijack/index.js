import { Component } from 'react'
import { connect } from 'react-redux'

import {
  hijackRequest
} from './actions'

class HijackComponent extends Component {
  componentDidMount() {
    const {
      hijackRequest,
      params: {
        id
      },
      client
    } = this.props;

    hijackRequest(client, id)
  }

  render () {
    return null;
  }
}

const mapStateToProps = state => ({
  client: state.client
});

export default connect(mapStateToProps, {
  hijackRequest
})(HijackComponent);
