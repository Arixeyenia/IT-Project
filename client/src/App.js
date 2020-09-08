import React, { Fragment, Component } from 'react';
import './App.css';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Home from './components/layout/home';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Dashboard from './components/dashboard/dashboard';
import Profile from './components/profile/profile';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from '../node_modules/@material-ui/core/styles';
import theme from './styles/themes'
import { CssBaseline } from '@material-ui/core';

class App extends Component {
  render() {
    return (
      <Fragment>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Header />
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/home' component={Home} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/profile' component={Profile} />
          </Switch>
          <Footer />
        </ThemeProvider>
      </Fragment>
    );
  }
}

export default App;
