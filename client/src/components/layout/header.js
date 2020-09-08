import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from '../auth/auth.service';

class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <React.Fragment>
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
          <Link to={'/home'} className='navbar-brand'>
            Quaranteam
          </Link>

          {currentUser ? (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/dashboard'} className='navbar-brand'>
                  dashboard
                </Link>
              </li>
              <li className='nav-item'>
                <Link to={'/profile'} className='nav-link'>
                  profile {currentUser.username}
                </Link>
              </li>
              <li className='nav-item'>
                <a href='/login' className='nav-link' onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/login'} className='nav-link'>
                  Login
                </Link>
              </li>

              <li className='nav-item'>
                <Link to={'/register'} className='nav-link'>
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
      </React.Fragment>
    );
  }
}

export default Header;