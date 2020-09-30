import React, {Fragment, Component } from 'react';
import { Box, Button, Typography, Grid, Divider } from '@material-ui/core';
import image from '../../images/pick.png';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPortfolio } from '../../actions/eportfolio'
import store from '../../store'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  category: {
    display: 'inline-table',
  },
  categoryTypography: {
    display: 'table-cell',
  },
  categoryDiv: {
    display: 'table-cell',
    width: '100%',
  },
  categoryLine: {
    marginBottom: '5px',
  }
}));

const PickTemplate = ({createPortfolio}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Box className='content template-selection fontg1 gray6'>
        <Box className="template-button-section">
          <Button variant="contained" className="template-button">Blank</Button>
        </Box>
        <Box className={classes.category}>
          <Typography noWrap variant="body1" className={classes.categoryTypography}>Pick a template</Typography>
          <Box className={classes.categoryDiv}>
            <Divider light className={classes.categoryLine}/>
          </Box>
          <Button style={{marginBottom: '10px'}} variant='contained' color='primary' onClick={()=>{createPortfolio(store.getState().eportfolio.createPortfolioName)}}>CREATE</Button>
        </Box>
      </Box>
      <Box className='content half gray6 fontg1'>
        <Box className='left'>
          <Typography variant='h1'>Choose a template</Typography>
          <Typography variant='h6'>
            Pick one of the options above to see if it works for you.
          </Typography>
        </Box>
        <Box className='right'>
          <img src={image} alt='Illustration'></img>
        </Box>
      </Box>
    </Fragment>
  );
}

PickTemplate.propTypes = {
  createPortfolio: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { createPortfolio })(PickTemplate);
