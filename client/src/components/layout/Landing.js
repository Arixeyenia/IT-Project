import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Button, Typography, Grid } from '@material-ui/core';
import image from '../../images/Vector 1.png';
import featureImg1 from '../../images/Vector 2.png';
import featureImg2 from '../../images/Vector 3.png';
import featureImg3 from '../../images/Vector 4.png';

const Landing = () => {
  return (
    <Fragment>
      <Box className='content half gray6 fontg1'>
        <Box className='left'>
          <Typography variant='h1'>Quaranteam ePortfolio Platform</Typography>
          <Typography variant='h6'>
            Create your own highly customisable ePortfolios for every purpose.
          </Typography>
          <Link to='/register'>
            <Button variant='contained' color='primary'>
              GET STARTED NOW
            </Button>
          </Link>
        </Box>
        <Box className='right'>
          <img src={image} alt='Vector Graphic'></img>
        </Box>
      </Box>
      <Box className='content features gray5 fontg1'>
        <Typography variant='h4'>Features</Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <img className='icon' src={featureImg1} alt='Feature 1 Icon'></img>
            <Typography variant='body1'>
              Create as many ePortfolios as you want with our many templates and
              widgets. Showcase your work and achievements in any style for
              anyone to see.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <img className='icon' src={featureImg2} alt='Feature 2 Icon'></img>
            <Typography variant='body1'>
              Organise your work online and share your ePortfolio using a link
              for anybody to visit.{' '}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <img className='icon' src={featureImg3} alt='Feature 3 Icon'></img>
            <Typography variant='body1'>
              Lorem Ipsum I don’t know what other feature to write here
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
