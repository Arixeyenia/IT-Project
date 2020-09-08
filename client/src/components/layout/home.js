import React, { Component } from 'react';

class Home extends Component {
  state = {};

  change = (evt) => {};
  render() {
    return (
      <React.Fragment>
        <h1>{this.props.title}</h1>
      </React.Fragment>
    );
  }
}

export default Home;
