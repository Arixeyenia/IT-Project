import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Material IU styles and theme
import { ThemeProvider } from '../node_modules/@material-ui/core/styles';
import theme from './styles/themes'
import { Box, CssBaseline } from '@material-ui/core';

import './App.css';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Navbar/>
            <Box className="main-content">
              <Switch>
                <Route exact path='/' component={Landing} />
                <Route component={Routes} />
              </Switch>
            </Box>
            <Footer />
          </ThemeProvider>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
