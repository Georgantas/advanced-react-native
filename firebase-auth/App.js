import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import firebase from 'firebase';

export default class App extends React.Component {
  componentDidMount() {
    const config = {
      apiKey: "AIzaSyCPAgs4Mex0b31JCVtE561IwAz9x4KJiko",
      authDomain: "one-time-password-bde6e.firebaseapp.com",
      databaseURL: "https://one-time-password-bde6e.firebaseio.com",
      projectId: "one-time-password-bde6e",
      storageBucket: "one-time-password-bde6e.appspot.com",
      messagingSenderId: "35807110742"
    };
    
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
