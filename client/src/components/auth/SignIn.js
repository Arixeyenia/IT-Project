import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseUi from 'react-firebaseui/StyledFirebaseAuth';
import 'whatwg-fetch';
import axios from 'axios';

const firebaseConfig = require('../../utils/firebaseConfig').firebaseConfig;
firebase.initializeApp(firebaseConfig);

var uiConfig = {
  callbacks: {
    //After user signs in this function is called
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      //api call
      axios
        .post('/api/auth/verifyUser', null, {
          params: { user: firebase.auth().currentUser },
        })
        .then((res) => {
          console.log(res);
        });
      return true;
    },
  },
  signInFlow: 'popup',
  signInSuccessUrl: '/dashboard',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    //Auth State Listener, called any time the user logs in or out
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isAuthenticated: !this.state.isAuthenticated });
    });
  }

  render() {
    return (
      <>
        <h3>Login</h3>
        <StyledFirebaseUi uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </>
    );
  }
}

export default Login;
