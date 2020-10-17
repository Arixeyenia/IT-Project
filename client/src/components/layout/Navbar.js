import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import 'whatwg-fetch';
import api from '../../utils/api';
import { signIn, signOut } from '../../actions/auth';
import logo from '../../images/Quaranteam.png'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  logo: {
    margin: 0,
    width: '20%',
    padding: '0px'
  },
  logoLink: {
    padding: '0 !important'
  }
}));

//initialize firebase google authentication
const firebaseConfig = require('../../utils/firebaseConfig').firebaseConfig;
firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');


//function for google sign in
export const GSignIn = (signIn) => {
  //sign in google with pop up window
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      //get idToken from google server
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(function (idToken) {
          signIn(idToken);
        })
        .catch(function (error) {
          console.debug(error);
        });
    });
};

//navbar includes home page, sign in with google and dashboard
const Navbar = ({
  auth: { isAuthenticated, loading, user },
  signIn,
  signOut,
}) => {
  const classes = useStyles();
  //navbar for users signed in
  const authLinks = (
    <nav className='navbar bg-dark'>
      <Link className={classes.logoLink} to='/'>
        <img src={logo} alt='Quaranteam' className={classes.logo}></img>
      </Link>
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

  //navbar for guests not signed in yet
  const guestLinks = (
    <nav className='navbar bg-dark'>
      <Link className={classes.logoLink} to='/'>
        <img src={logo} alt='Quaranteam' className={classes.logo}></img>
      </Link>
      <ul>
        <li>
          <Link to='/'>
            <Button onClick={() => GSignIn(signIn)} variant='contained' color='primary'>
              SIGN IN WITH GOOGLE
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );

  return (
    <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
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
