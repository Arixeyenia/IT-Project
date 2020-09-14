import React, { Component } from 'react';
import AuthService from '../auth/auth.service';
import { Link } from 'react-router-dom';

class Template2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }
  render() {
    return (
      <React.Fragment>
        <h1>this is Template2</h1>
        <Link to={'/createPortfolio'}>
          <button type='button' className='btn btn-primary btn-block'>
            create a portfolio
          </button>
        </Link>
      </React.Fragment>
    );
  }
}

export default Template2;