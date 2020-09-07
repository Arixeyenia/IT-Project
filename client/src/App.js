import React, { Fragment, Component } from 'react';
import './App.css';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Home from './components/layout/home';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Dashboard from './components/dashboard/dashboard';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/home' component={Home} />
          <Route path='/dashboard' component={Dashboard} />
        </Switch>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
