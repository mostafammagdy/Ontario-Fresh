import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { VERBS } from './constants';
import Toggle from 'material-ui/Toggle';

import {
  notificationSettingsRequest,
  notificationSettingUpdateRequest
} from './actions';

import styles from './styles.module.scss';

class NotificationSettings extends React.Component {
  static propTypes = {
    client: PropTypes.shape({
      username: PropTypes.string,
      user_id: PropTypes.number,
      email: PropTypes.string,
      exp: PropTypes.number,
      token: PropTypes.string,
    }).isRequired,
    settings: PropTypes.arrayOf(
      PropTypes.shape({
        verb: PropTypes.number.isRequired,
        enable: PropTypes.bool.isRequired
      })
    ),
    notificationSettingsRequest: PropTypes.func.isRequired,
    notificationSettingUpdateRequest: PropTypes.func.isRequired
  };

  UNSAFE_componentWillMount() {
    this.getNotificationSettings();
  }

  getNotificationSettings = () => {
    const { client, notificationSettingsRequest } = this.props;
    return notificationSettingsRequest(client);
  }

  render() {
    const { client, settings, notificationSettingUpdateRequest } = this.props;

    return (
      <div>
        {
          Array.isArray(settings) ?
          settings.map(({verb, enable}) => {
            const { title, description } = VERBS[verb];
            return <Toggle
              key={verb}
              iconStyle={{ alignSelf: 'center' }}
              label={<div><h4 style={{ margin: 0 }}>{title}</h4><p style={{ margin: 0 }}>{description}</p></div>}
              labelPosition="right"
              labelStyle={{ marginLeft: 15 }}
              toggled={enable}
              onToggle={(event, checked) => notificationSettingUpdateRequest(client, verb, checked)}
              className={styles.notificationPreference}
            />
          }) : 'Loading'
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  settings: state.notificationSettings.settings,
});

export default connect(mapStateToProps, { notificationSettingsRequest, notificationSettingUpdateRequest })(NotificationSettings);