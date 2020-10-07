import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Grid, Box, Card, CardContent, CardHeader, CardMedia, CardActions, Button } from '@material-ui/core';
import {getPortfolio, getPage, getPortfolioAsGuest, getError } from '../../actions/eportfolio';
import { loadUser } from '../../actions/auth';
import { Link, useParams, useHistory } from 'react-router-dom';
import store from '../../store';
import Comment from '../comments/Comment';
import { useThemeStyle } from '../../styles/themes';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    minWidth: 275,
    boxShadow: 'none',
    borderRadius: 0,
    backgroundColor: 'inherit',
    paddingBottom: '20px'
  },
  pos: {
  },
  media: {
    padding:'20vh'
  },
  titleText:{
    fontSize: '1.5rem'
  },
  viewGridItem: {
    display: 'grid',
  },
  viewGridItemCardHeader: {
    paddingBottom: '0px !important',
  },
  viewCardActions: {
    paddingLeft: '20px !important',
  },
  viewCardContent: {
    paddingBottom: '0px !important',
  },
  content: {
    paddingTop: '20px !important',
    paddingBottom: '20px !important',
  }
}));

const View = ({getPortfolio, portfolio, getPage, page, loadUser, isAuthenticated, error, getPortfolioAsGuest}) => {
  const classes = useStyles();
  const theme = useTheme();
  const themeStyle = useThemeStyle();
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    if (store.getState().auth.isAuthenticated){
      if (Object.keys(portfolio).length === 0) {
        getPortfolio(params.id);
      }
      if (Object.keys(page).length === 0) {
        getPage(params.id, params.pagename);
      }
    }
    else{
      if (Object.keys(portfolio).length === 0) {
        getPortfolioAsGuest(params.id);
      }
      if (Object.keys(page).length === 0) {
        getPage(params.id, params.pagename);
      }
    }
  }, [getPortfolio, portfolio, getPage, page, loadUser, isAuthenticated]);

  const items = (Object.keys(page).length !== 0) ? page.items : [];
  const rowLengths = {};
  const groupedItems = [];

  items.forEach(element => {
    if ([element.row] in Object.keys(rowLengths)){
      rowLengths[element.row]++;
      groupedItems[element.row].push(element);
    }
    else{
      rowLengths[element.row] = 1;
      groupedItems[element.row] = [element];
    }
  });
  if (Object.keys(error).length!==0){
    return (
    <Box className={themeStyle.content}>
      <Typography variant='h3'>You are not authorised to view this portfolio.</Typography>
    </Box>);
  }
  else{
    return (
      <Fragment>
        <Box className={themeStyle.content}>
          <Typography variant='h1'>{portfolio.name}</Typography>
        </Box>
        {groupedItems.map((item, i)=>
        <Grid container spacing={3} className={`${themeStyle.content} ${classes.content}`}>
        {item.map((object) => card(classes, rowLengths, params.id, object, history))}  
        </Grid>)}
      </Fragment>
    );
  }
  
}

const card = (classes, rowLengths, portfolioID, object, history, owner) => {
  return (
    <Grid item xs={12/rowLengths[object.row]} className={classes.viewGridItem} key={object._id}>
      <Card className={classes.cardRoot}>
        {object.mediaType === 'image' && <CardMedia
            className={classes.media}
            image={object.mediaLink}
          />}
        {object.title && <CardHeader
          className={classes.viewGridItemCardHeader}
          classes={{title:classes.titleText}}
          title={object.title}
          subheader={object.subtitle}
        />}
        {object.paragraph&& <CardContent className={classes.viewCardContent}>
          {object.paragraph && <Typography variant='body2' component='p'>
            {object.paragraph}
          </Typography>}
        </CardContent>}
        {object.linkAddress && <CardActions className={classes.viewCardActions}>
            <Button size='small' onClick={()=> {if(!/^(f|ht)tps?:\/\//i.test(object.linkAddress)){ history.push('/view/' + portfolioID + '/' + object.linkAddress);}else{ window.location.href = object.linkAddress;}window.location.reload(false);}}>{object.linkText}</Button>
        </CardActions>}
        <Comment itemID={object._id} owner={owner} />
      </Card>
    </Grid>
  )
}


View.propTypes = {
  getPage: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  getPortfolio: PropTypes.func.isRequired,
  portfolio: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object,
  getPortfolioAsGuest: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  page: state.eportfolio.page,
  portfolio: state.eportfolio.portfolio,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.eportfolio.error
});

export default connect(mapStateToProps, {getPage, getPortfolio, loadUser, getPortfolioAsGuest})(View);
