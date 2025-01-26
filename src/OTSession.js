import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import PropTypes from 'prop-types';

export default class OTSession extends Component {

  constructor(props) {
    super(props);
    //
  }

  initComponent = () => {
    //
  };

  signal(signalObj) {
    // OT.sendSignal(this.props.sessionId, signalObj.type, signalObj.data);
  }

  render() {
    const { style, children, sessionId, apiKey, token } = this.props;
    if (children && sessionId && apiKey && token) {
      return (
        <View style={style}>
          <Text>foo</Text>
          { children }
        </View>
      );
    }
    return <View><Text>foobar</Text></View>;
  }
}

OTSession.propTypes = {
  apiKey: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  style: ViewPropTypes.style,
  eventHandlers: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  options: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  signal: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  encryptionSecret: PropTypes.string,
};

OTSession.defaultProps = {
  eventHandlers: {},
  options: {},
  signal: {},
  style: {
    flex: 1,
  },
};
