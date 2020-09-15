import React, {Fragment, Component } from 'react';
import { Box, Button, Typography, Grid } from '@material-ui/core';
import AuthService from '../auth/auth.service';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { Link } from 'react-router-dom';

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
          <Button style={{ marginLeft: '20px' }} variant='contained' color='primary'> OK </Button>
        </Box>
      </Fragment>
    );
  }
}

export default CreatePortfolio;
