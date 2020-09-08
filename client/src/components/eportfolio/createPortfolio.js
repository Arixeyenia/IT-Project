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
        <h1>choose your portfolio template and start!</h1>
        <Link to={'/template1'}>
          <button type='button' className='btn btn-primary btn-block'>
            use template1
          </button>
        </Link>
        <Link to={'/template2'}>
          <button type='button' className='btn btn-primary btn-block'>
            use template2
          </button>
        </Link>
        <Link to={'/template3'}>
          <button type='button' className='btn btn-primary btn-block'>
            use template3
          </button>
        </Link>
        <Link to={'/templateBlank'}>
          <button type='button' className='btn btn-primary btn-block'>
            use blank template
          </button>
        </Link>
      </React.Fragment>
    );
  }
}

export default CreatePortfolio;
