import React, { Component } from 'react';
import AuthService from '../auth/auth.service';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }
  render() {
    return (
      <React.Fragment>
<<<<<<< HEAD
        <h1>this is dashboard</h1>
        <button className='btn btn-primary btn-block'>
          create a portfolio
        </button>
=======
        <h1>this is your dashboard</h1>
>>>>>>> master
      </React.Fragment>
    );
  }
}

export default Dashboard;
