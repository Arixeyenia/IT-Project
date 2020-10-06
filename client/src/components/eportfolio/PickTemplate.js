import React, { Fragment, useEffect } from 'react';
import { Box, Button, Typography, Divider } from '@material-ui/core';
import image from '../../images/pick.png';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPortfolio } from '../../actions/eportfolio'
import store from '../../store'
import { makeStyles } from '@material-ui/core/styles';
import { useThemeStyle } from '../../styles/themes';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  category: {
    display: 'inline-table',
  },
  categoryTypography: {
    display: 'table-cell',
  },
  categoryDiv: {
    display: 'table-cell',
    width: '100%',
  },
  categoryLine: {
    marginBottom: '5px',
  },
  templateSelection: {
    boxShadow: '0px 20px 50px 0px #00000019',
    position: 'relative'
  },
  templateButton: {
    backgroundColor: '#E0E0E0',
    padding: '18px 38px',
    textAlign: 'center',
    display: 'inline-block',
    fontSize: '14px',
    borderRadius: '8px',
    marginTop: '25px',
    '&:hover, &:focus': {
      backgroundColor: '#4F4F4F',
      color: '#F2F2F2'
    }
  }
}));

const PickTemplate = ({createPortfolio, portfolio}) => {
  const classes = useStyles();
  const theme = useThemeStyle();
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(portfolio).length !== 0){
      history.push('/edit/' + portfolio._id + '/' + encodeURI('Home'));
      history.go(0);
    }
  }, [portfolio]);

  const test = () =>{console.log(store.getState().eportfolio);}
  return (
    <Fragment>
      <Box className={`${theme.content} ${classes.templateSelection} ${theme.fontg1} ${theme.gray6}`}>
        <Box>
          <Button variant='contained' className={classes.templateButton}>Blank</Button>
        </Box>
        <Box className={classes.category}>
          <Typography noWrap variant='body1' className={classes.categoryTypography}>Pick a template</Typography>
          <Box className={classes.categoryDiv}>
            <Divider light className={classes.categoryLine}/>
          </Box>
          <Button style={{marginBottom: '10px'}} variant='contained' color='primary' onClick={()=>createPortfolio(store.getState().eportfolio.createPortfolioName)}>CREATE</Button>
        </Box>
      </Box>
      <Box className={`${theme.content} ${theme.half} ${theme.fontg1} ${theme.gray6}`}>
        <Box className={theme.leftright}>
          <Typography variant='h1'>Choose a template</Typography>
          <Typography variant='h6'>
            Pick one of the options above to see if it works for you.
          </Typography>
        </Box>
        <Box className={theme.leftright}>
          <img src={image} alt='Illustration'></img>
        </Box>
      </Box>
    </Fragment>
  );
}

PickTemplate.propTypes = {
  createPortfolio: PropTypes.func.isRequired,
  portfolio: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  portfolio: state.eportfolio.portfolio
});

export default connect(mapStateToProps, { createPortfolio })(PickTemplate);
