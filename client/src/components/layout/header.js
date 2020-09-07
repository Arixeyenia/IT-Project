import React, { Component } from 'react';

class Header extends Component {
  state = {
    name: '',
  };

  change = (evt) => {};
  render() {
    return (
      <React.Fragment>
        <h1>{this.props.title}</h1>
      </React.Fragment>
    );
  }
}

export default Header;
