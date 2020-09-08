import React, { Fragment } from 'react';
import './App.css';
import { ThemeProvider } from '../node_modules/@material-ui/core/styles';
import theme from './styles/themes'
import LandingPage from './components/layout/LandingPage'
import { CssBaseline } from '@material-ui/core';


function App() {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <LandingPage></LandingPage>
    </ThemeProvider>
  );
}

export default App;
