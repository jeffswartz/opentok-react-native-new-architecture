# OpenTok React Native New Architecture support

This is a proof-of-concept implementation of the Vonage Video React Native SDK supporting the React Native [new architecture](https://reactnative.dev/blog/2024/10/23/the-new-architecture-is-here).

## Building the SDK

Install the Node dependencies:

```sh
nvm use
yarn
```

Have CodeGen auto-generate some files to support the native components, based on the TypeScript specs (in the specs directory):

```sh
cd android
./gradlew generateCodegenArtifactsFromSchem
cd ..
```

Currently, the app supports Android.

# Test the app

Set `apiKey`, `sessionId`, and `token` values to your Vonage Video API API key, session ID, and connection token:

```js
const apiKey = '1234';
const sessionId = '1_MX40NzIwMzJ-1fn5-';
const token = 'T1==cGFydPQ==';
```

Note that you can set `apiKey` to a Vonage application ID instead of an OpenTok API key.

Run the app in the Android Emulator or a connected Android device:

```sh
yarn android
```

You may want to connect to the session in [Playground](https://tokbox.com/developer/tools/playground) and publish a stream from there.

## Code walk-through

The specs directory includes the TypeScript spec defining the API.

The package.json file includes a `codegenConfig` property that CodeGen uses to build the Turbo module (NativeSessionManagerModule) and the Fabric native module (OTSubscriberView).

The Android source code is in the android/src directory.

## Known issues

* The app currently only supports basic subscribing and sending signals.

* Receiving signals (using the Video API Android SDK `Session.SignalListener.onSignalReceived()` method) is not working.
