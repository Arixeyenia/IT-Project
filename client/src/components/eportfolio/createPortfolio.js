import React, {Fragment, Component } from 'react';
import { Box, Button, Typography, Grid } from '@material-ui/core';
import AuthService from '../auth/auth.service';
import image from '../../images/pick.png';

const required = (value) => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    );
  }
};

class CreatePortfolio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }
  render() {
    return (
      <Fragment>
        <Box className='select-template fontg1' bgcolor = '#FFFFFF'>
          <button style={{ marginLeft: '150px'}} className="template-button">Professional</button>
          <button style={{ marginLeft: '20px' }} className="template-button">Template2</button>
          <button style={{ marginLeft: '20px' }} className="template-button">Template3</button>
          <button style={{ marginLeft: '20px' }} className="template-button">Blank</button>
        </Box>
        <Box className='select-template fontg1' bgcolor = '#FFFFFF'>
          <Typography style={{ marginLeft: '150px'}}>Pick a template</Typography>
          <div className="rectangle"/>
          <Button style={{marginBottom: '10px'}} variant='contained' size='sm' color='primary'> OK </Button>
        </Box>
        <Box className='content half gray6 fontg1'>
          <Box className='left'>
            <Typography style={{ marginTop: '120px'}} variant='h1'>Choose a template</Typography>
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

export default CreatePortfolio;
