import React, { Fragment } from 'react';
import './App.css';
import Header from './components/layout/header';
import Footer from './components/layout/footer';

function App() {
  return (
    <Fragment>
      <Header title='this is header' />
      <Footer title='this is footer' />
    </Fragment>
  );
}

export default App;
