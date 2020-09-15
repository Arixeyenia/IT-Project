import React, { Fragment, useEffect } from 'react';
import { Box, Button, Typography, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Navbar = ({
  auth: { isAuthenticated, loading, user },
  logout,
  getCurrentProfile,
  deleteAccount,
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  const authLinks = (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fad fa-user-secret' /> Quaranteam
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/edit-profile'>
            <span className='hide-sm'>Hello, {user && user.name}!</span>
          </Link>
        </li>
        <li>
          <Link to='/dashboard'>
            <i className='fas fa-user' />{' '}
            <span className='hide-sm'>Dashboard</span>
          </Link>
        </li>
        <li>
          <a onClick={logout} href='#!'>
            <i className='fas fa-sign-out-alt' />{' '}
            <span className='hide-sm'>Logout</span>
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
          <Link to='/register'>
            <Button variant='contained' color='primary'>
              REGISTER
            </Button>
          </Link>
        </li>
        <li>
          <Link to='/login'>
            <Button variant='contained' color='primary'>
              LOG IN
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
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  logout,
  getCurrentProfile,
  deleteAccount,
})(Navbar);
