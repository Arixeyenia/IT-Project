import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Box, Button, TextField } from '@material-ui/core';
import { creatingPortfolioName, resetCreatingPortfolioName } from '../../actions/eportfolio'
import { Link } from 'react-router-dom';

class CreateEPortfolio extends Component  {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      label: "Name of Portfolio",
      error: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.resetCreatingPortfolioName();
  }

  handleInputChange(component){
    this.setState({name: component.target.value});
    if (component.target.value != ''){
      this.state.error = false;
      this.state.label = "Name of Portfolio"
    }
    else {
      this.showError();
    }
  }

  showError(){
    this.state.label = "Please enter a name";
    this.state.error = true;
  }
  render(){
    return (
      <Box className="content">
        <Typography variant="h1">Enter your portfolio name here</Typography>
        <form className="portfolio-name">
          <TextField error={this.state.error} id="standard-required" className="portfolio-name-input" label={this.state.label} placeholder="My Portfolio" onChange={this.handleInputChange}></TextField>
          <Link onClick={() => this.state.name && this.props.creatingPortfolioName(this.state.name)} to={()=> this.state.name ? "/pick-template" : this.showError()}><Button style={{float: 'right'}} variant="contained" color="primary" >NEXT</Button></Link>
        </form>
      </Box>
    )
  }
}

CreateEPortfolio.propTypes = {
  creatingPortfolioName: PropTypes.func.isRequired,
  resetCreatingPortfolioName: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { creatingPortfolioName, resetCreatingPortfolioName })(CreateEPortfolio);