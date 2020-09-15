import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Divider, Box, List } from '@material-ui/core';
import {getUserEPortfolios} from '../../actions/eportoflio';

const Dashboard = ({getUserEPortfolios, userEPortfolios: {userEPortfolios}}) => {
  useEffect(() => {
    getUserEPortfolios();
  }, [getUserEPortfolios]);
  
  return (
    <Box className="content">
      <Typography variant="h1">Welcome to your dashboard</Typography>
      <Category title="Your existing ePortfolios"></Category>
      <List ></List>
      <Category title="Your favourited ePortfolios"></Category>
      <List ></List>
    </Box>
  );
}

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
  getUserEPortfolios: PropTypes.func.isRequired,
  userEPortfolios: PropTypes.object,
};

const mapStateToProps = (state) => ({
  userEPortfolios: state.userEPortfolios,
});

export default connect(mapStateToProps, { getUserEPortfolios })(Dashboard);
