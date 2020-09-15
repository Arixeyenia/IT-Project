import React, { Fragment, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Typography, Divider, Box, List } from '@material-ui/core';

const Dashboard = () => {
  return (
    <Box className="content">
        <Typography variant="h1">Welcome to your dashboard</Typography>
        <Category title="Your existing ePortfolios"></Category>
        <List children={this.getMyePortfolios()}></List>
        <Category title="Your favourited ePortfolios"></Category>
        <List children={this.getFavouritedEPortfolios()}></List>
        <Link to={'/createPortfolio'}>
          <button type='button' className='btn btn-primary btn-block'>
            create a portfolio
          </button>
        </Link>
      </Box>
  );
};

function Category(props) {
  return (
    <Box className="category">
      <Typography noWrap variant="body1">{props.title}</Typography>
      <Box>
        <Divider light className="categoryLine"/>
      </Box>
    </Box>
  );
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({});

export default Dashboard;
