import React, { Fragment, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

const Dashboard = () => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Welcome to your dashboard</h1>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({});

export default Dashboard;
