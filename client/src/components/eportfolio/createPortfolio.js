import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Box, Button, TextField } from '@material-ui/core';
import { creatingPortfolioName, resetCreatingPortfolioName } from '../../actions/eportfolio';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useThemeStyle } from '../../styles/themes';

const useStyles = makeStyles((theme) => ({
  portfolioNameInput: {
    paddingBottom: '20px !important',
    width: '100%',
    paddingLeft: '10px !important',
  },
  portfolioNameInputLabel: {
    paddingLeft: '10px !important'
  }
}));

const CreateEPortfolio = ({creatingPortfolioName, resetCreatingPortfolioName}) => {
  const classes = useStyles();
  const theme = useThemeStyle();
  
  const [name, setName] = React.useState('');
  const [label, setLabel] = React.useState('Name of Portfolio');
  const [error, setError] = React.useState(false);

  useEffect(() => {
    resetCreatingPortfolioName();
  }, []);

  function handleInputChange(component){
    setName(component.target.value);
    if (component.target.value != ''){
      setError(false);
      setLabel('Name of Portfolio');
    }
    else {
      setLabel('Please enter a name');
      setError(true);
    }
  }
  
  return (
    <Box className={theme.content}>
      <Typography variant='h1'>Enter your portfolio name here</Typography>
      <form>
        <TextField error={error} 
          id='standard-required' 
          className={classes.portfolioNameInput} 
          label={label} 
          placeholder='My Portfolio' 
          onChange={handleInputChange}
          InputLabelProps={{className: classes.portfolioNameInputLabel}}>
        </TextField>
        <Link onClick={() => name && creatingPortfolioName(name)} to={()=> name ? '/pick-template' : true}><Button style={{float: 'right'}} variant='contained' color='primary' >NEXT</Button></Link>
      </form>
    </Box>
  )
}

CreateEPortfolio.propTypes = {
  creatingPortfolioName: PropTypes.func.isRequired,
  resetCreatingPortfolioName: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { creatingPortfolioName, resetCreatingPortfolioName })(CreateEPortfolio);