import React, { Component } from 'react';
import AuthService from '../auth/auth.service';
import { Link } from 'react-router-dom';

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
