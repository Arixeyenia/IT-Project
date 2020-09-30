import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import 'whatwg-fetch';
import api from '../../utils/api';
import { signIn, signOut } from '../../actions/auth';

//initialize firebase google authentication
const firebaseConfig = require('../../utils/firebaseConfig').firebaseConfig;
firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

const Navbar = ({
  auth: { isAuthenticated, loading, user },
  signIn,
  signOut,
}) => {
  //function for google sign in
  const GSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(function (idToken) {
            api.defaults.headers.common['x-auth-token'] = idToken;
            localStorage.setItem('token', idToken);
            signIn();
          })
          .catch(function (error) {
            console.debug(error);
          });
      });
  };

  const authLinks = (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fad fa-user-secret' /> Quaranteam
        </Link>
      </h1>
      <ul>
        <li>
          <span className='hide-sm'>Hi, {user && user.name}!</span>
        </li>
        <li>
          <Link to='/dashboard'>
            <i className='fas fa-user' />{' '}
            <span className='hide-sm'>Dashboard</span>
          </Link>
        </li>
        <li>
          <a onClick={signOut} href='/'>
            <i className='fas fa-sign-out-alt' />{' '}
            <span className='hide-sm'>sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );

  const guestLinks = (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fad fa-user-secret' /> Quaranteam
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/'>
            <Button onClick={GSignIn} variant='contained' color='primary'>
              SIGN IN WITH GOOGLE
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );

  return (
    <Fragment>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </Fragment>
  );
};

Navbar.propTypes = {
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  signOut,
  signIn,
})(Navbar);
