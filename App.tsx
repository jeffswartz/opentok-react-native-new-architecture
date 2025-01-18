import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

import NativeSessionManager from './specs/NativeSessionManager';
import OTNativeSubscriberView from './specs/WebViewNativeComponent';

function App(): React.JSX.Element {
  const apiKey = '472032';
  const sessionId = '1_MX40NzIwMzJ-fjE3MzM0NTAzOTcyNjh-L0FQMkR0K2tVc214ajJOVzZiYWtYclg1fn5-';
  const token = 'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPWM2MjU2ZTFlYmQ5OWYyMjcxZDAyMDBlMjVlZDI0MTBiNzIzOWQ3OTg6c2Vzc2lvbl9pZD0xX01YNDBOekl3TXpKLWZqRTNNek0wTlRBek9UY3lOamgtTDBGUU1rUjBLMnRWYzIxNGFqSk9WelppWVd0WWNsZzFmbjUtJmNyZWF0ZV90aW1lPTE3MzcxNDQ2NzEmbm9uY2U9MC4wMTgxNjYxMzQxNjM1NDI2MjQmcm9sZT1tb2RlcmF0b3ImZXhwaXJlX3RpbWU9MTczOTczNjY3MDc5OSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';

  const [streamIds, setStreamIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    initSession();
    NativeSessionManager.onStreamDestroyed((event: StreamEvent) => {
      console.log('onStreamCreated', event);
    });
    NativeSessionManager.onSignalReceived((event: SignalEvent) => {
      console.log('onSignalReceived', event);
    });

    NativeSessionManager.onSessionError((event: ErrorEvent) => {
      console.log('onError', event);
    });
  }, []);

  React.useEffect(() => {
    NativeSessionManager.onStreamCreated((event: StreamEvent) => {
      console.log('onStreamCreated', event);
      setStreamIds(prevIds => [...prevIds, event.streamId]);
    });
  }, [streamIds]);

  async function initSession() {
    NativeSessionManager.onSessionConnected((event: SessionConnectEvent) => {
      console.log('onSessionConnected', event);
      NativeSessionManager?.sendSignal(sessionId, 'greeting', 'hello from' + event.connectionId);
    });

    NativeSessionManager?.initSession(apiKey, sessionId, {});
    await NativeSessionManager?.connect(sessionId, token);
      // .then(() => )
    console.log('connect() called');
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.text}>
        Session ID: {sessionId}
      </Text>
      {streamIds?.map((streamId) => <OTNativeSubscriberView
          streamId={streamId}
          sessionId={sessionId}
          key={streamId}
          style={styles.webview}
          onSubscriberConnected={(event) => {
            console.log('onSubscriberConnected', event.nativeEvent);
          }}
        />)
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 20,
  },
  textInput: {
    margin: 10,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
  webview: {
    width: '50%',
    height: '50%',
    borderColor: 'red',
    borderWidth: 1,
  },
});

export default App;
