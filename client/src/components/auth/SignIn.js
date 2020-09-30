import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
// import StyledFirebaseUi from 'react-firebaseui/StyledFirebaseAuth';
import 'whatwg-fetch';
import axios from 'axios';
import api from '../../utils/api';
import { signIn } from '../../actions/auth';

const firebaseConfig = require('../../utils/firebaseConfig').firebaseConfig;
firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

const SignIn = ({ signIn, isAuthenticated }) => {
  const GSignIn = () => {
    var user;
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token.
        console.log(
          'this is result from component/auth/SignIn.js_______________'
        );
        // console.log(result.credential.idToken);
        // var token = result.credential.idToken;
        // api.defaults.headers.common['x-auth-token'] = token;
        // localStorage.setItem('token', token);
        // The signed-in user info.
        user = result.user;
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(function (idToken) {
            signIn(user, idToken);
          })
          .catch(function (error) {
            console.debug(error);
          });
      });

    if (isAuthenticated) {
      return <Redirect to='/' />;
    }
  };

  return (
    <Fragment>
      <h3>Login</h3>
      <button onClick={GSignIn}>Sign In with Google</button>
    </Fragment>
  );
};

SignIn.propTypes = {
  isAuthenticated: PropTypes.bool,
  signIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signIn })(SignIn);

// var uiConfig = {
//   callbacks: {
//     //After user signs in this function is called
//     signInSuccessWithAuthResult: function (authResult, redirectUrl) {
//       //api call
//       axios
//         .post('/api/auth/verifyUser', null, {
//           params: { user: firebase.auth().currentUser },
//         })
//         .then((res) => {
//           console.log(res);
//         });
//       return true;
//     },
//   },
//   signInFlow: 'popup',
//   signInSuccessUrl: '/dashboard',
//   signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
// };
// Using a popup.
// var provider = new firebase.auth.GoogleAuthProvider();
// provider.addScope('profile');
// provider.addScope('email');

//    const firebase = useFirebase();
//   const auth = useSelector(state => state.firebase.auth);

//       const signInWithGoogle = () => {
//         firebase
//           .login({
//             provider: "google",
//             type: "popup",
//           })
//           .then(() => {
//             history.push("/dashboard");
//           });
//       };
//       const history = useHistory();

//   }

//   componentDidMount() {
//     //Auth State Listener, called any time the user logs in or out
//     firebase.auth().onAuthStateChanged((user) => {
//       this.setState({ isAuthenticated: !this.state.isAuthenticated });
//     });
//   }

//   if (isAuthenticated) {
//     return <Redirect to='/dashboard' />;
//   }
