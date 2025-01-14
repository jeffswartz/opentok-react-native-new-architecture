import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

import NativeSessionManager from './specs/NativeSessionManager';
import SubscriberView from './specs/SubscriberViewComponent';

function App(): React.JSX.Element {
  const apiKey = '472032';
  const sessionId = '1_MX40NzIwMzJ-fjE3MzM0NTAzOTcyNjh-L0FQMkR0K2tVc214ajJOVzZiYWtYclg1fn5-';
  const token = 'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPTQ4YzFiYjUyOWYzM2FiYTUxZTJkYjE5NmY5ODVmN2U2ZDdlZWU3YzY6c2Vzc2lvbl9pZD0xX01YNDBOekl3TXpKLWZqRTNNek0wTlRBek9UY3lOamgtTDBGUU1rUjBLMnRWYzIxNGFqSk9WelppWVd0WWNsZzFmbjUtJmNyZWF0ZV90aW1lPTE3MzYyNzkyOTEmbm9uY2U9MC4yMTI0Nzc0NzA1NTc3Mzc5JnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3Mzg4NzEyOTA1NTcmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';

  const [streamId, setStreamId] = React.useState<string | null>(null);

  React.useEffect(() => {
    initSession();
    NativeSessionManager.onStreamCreated((event: StreamEvent) => {
      console.log('onStreamCreated', event);
      setStreamId(event.streamId);
    });
    NativeSessionManager.onStreamDestroyed((event: StreamEvent) => {
      console.log('onStreamCreated', event);
    });
    NativeSessionManager.onSignalReceived((event: SignalEvent) => {
      console.log('onSignalReceived', event);
    });
  }, []);

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
      {streamId &&
      <SubscriberView
          streamId={streamId}
          sessionId={sessionId}
          style={styles.webview}
          onSubscriberConnected={(event) => {
            console.log('onSubscriberConnected', event.nativeEvent);
          }}
      />
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
    width: '100%',
    height: '100%',
    backgroundColor: 'orange',
    borderColor: 'red',
    borderWidth: 1,
  },
});

export default App;
