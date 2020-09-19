import React, {Fragment, Component } from 'react';
import { Box, Button, Typography, Grid, Divider } from '@material-ui/core';
import image from '../../images/pick.png';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPortfolio } from '../../actions/eportfolio'
import store from '../../store'

class PickTemplate extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <Box className='content template-selection fontg1 gray6'>
          <Box className="template-button-section">
            <Button variant="contained" className="template-button">Blank</Button>
          </Box>
          <Box className="category">
            <Typography noWrap variant="body1">Pick a template</Typography>
            <Box>
              <Divider light className="categoryLine"/>
            </Box>
            <Button style={{marginBottom: '10px'}} variant='contained' color='primary' onClick={()=>{this.props.createPortfolio(store.getState().eportfolio.createPortfolioName)}}>CREATE</Button>
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
}

PickTemplate.propTypes = {
  createPortfolio: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { createPortfolio })(PickTemplate);
