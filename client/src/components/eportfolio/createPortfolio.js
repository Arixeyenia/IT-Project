import React, { Component } from 'react';
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
      <React.Fragment>
        <h1>create your portfolio here!</h1>
      </React.Fragment>
    );
  }
}

export default CreatePortfolio;
