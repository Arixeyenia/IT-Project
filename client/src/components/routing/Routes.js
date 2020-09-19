import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/register';
import Login from '../auth/login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/dashboard';
import View from '../view/view'
import CreateEPortfolio from '../eportfolio/createPortfolio'
import PickTemplate from '../eportfolio/PickTemplate'
import ProfileForm from '../profile/ProfileForm';
import Profile from '../profile/profile';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = (props) => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profile/:id' component={Profile} />
        <Route exact path='/:id/:pagename?' component={View} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-eportfolio' component={CreateEPortfolio} />
        <PrivateRoute exact path='/pick-template' component={PickTemplate} />
        <PrivateRoute exact path='/create-profile' component={ProfileForm} />
        <PrivateRoute exact path='/edit-profile' component={ProfileForm} />
      </Switch>
    </section>
  );
};

export default Routes;