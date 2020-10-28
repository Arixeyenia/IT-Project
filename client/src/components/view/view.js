import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, Typography, Grid, Box, Card, CardContent, CardHeader, CardMedia, CardActions, Button, IconButton } from '@material-ui/core';
import {getPortfolio, getPage, getPortfolioAsGuest, getError, getSaved, savePortfolio, getPageAsGuest, getTheme } from '../../actions/eportfolio';
import { getFonts } from '../../actions/googleFonts';
import { loadUser } from '../../actions/auth';
import { Link, useParams, useHistory } from 'react-router-dom';
import store from '../../store';
import Comment from '../comments/Comment';
import { useThemeStyle } from '../../styles/themes';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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
    paddingLeft: '10% !important',
  },
  contentEven: {
    backgroundColor: theme.palette.primary.main
  },
  contentOdd: {
    backgroundColor: theme.palette.secondary.main
  }
}));

const View = ({portfolio, page, error, savePortfolio, savedPortfolios, muiTheme }) => {
  const theme = useTheme();
  const classes = useStyles();
  const themeStyle = useThemeStyle();
  const history = useHistory();
  const params = useParams();
  const items = (Object.keys(page).length !== 0) ? page.items : [];
  const rowLengths = {};
  const groupedItems = [];
  const isSaved = savedPortfolios.some((e) => e._id === portfolio._id);
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
        <Box className={classes.content}>
          <Typography variant='h1'>{portfolio.name}
          <IconButton aria-label="save" onClick={() => savePortfolio(portfolio._id)}>
              {isSaved ? <StarIcon/> : <StarBorderIcon/>}
          </IconButton>
          </Typography>
        </Box>
        {groupedItems.map((item, i)=>
          <Grid container
            spacing={3}
            className={`${themeStyle.content} ${classes.content} ${i%2 == 0 ? classes.contentEven : classes.contentOdd}`}>
        {item.map((object) => card(classes, rowLengths, params.id, object, history, portfolio.user))}  
        </Grid>)}
      </Fragment>
    );
  }
  
}

const ViewTheme = ({getPortfolio, portfolio, getPage, page, loadUser, isAuthenticated, error, getPortfolioAsGuest, getSaved, savePortfolio, savedPortfolios, getPageAsGuest, getTheme, muiTheme, getFonts, fonts }) => {
  const params = useParams();

  useEffect(() => {
    if (fonts.length === 0){
      getFonts();
    }
    if (Object.keys(portfolio).length === 0 || portfolio._id !== params.id) {
        if (store.getState().auth.isAuthenticated){
          getPortfolio(params.id);
        }
        else{
            getPortfolioAsGuest(params.id);
        }
    }
    if (Object.keys(page).length === 0 || portfolio._id !== params.id || !(page.url === params.pagename || (page.main && params.pagename===undefined))) {
      if (store.getState().auth.isAuthenticated){
        getPage(params.id, params.pagename);
      }
      else{
        getPageAsGuest(params.id, params.pagename);
      }
    }
    if (Object.keys(portfolio).length !== 0 && Object.keys(page).length !== 0 && fonts.length !== 0){
      getTheme(portfolio.theme, fonts);
    }
  }, [getPortfolio, portfolio, getPage, page, loadUser, isAuthenticated, getFonts, fonts, getTheme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline/>
      <View portfolio={portfolio} page={page} error={error} savePortfolio={savePortfolio} savedPortfolios={savedPortfolios} muiTheme={muiTheme}></View>
    </ThemeProvider>
  )
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
          titleTypographyProps={{
            variant:'h3'
          }}
          subheaderTypographyProps={{
            variant:'subtitle1'
          }}
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


ViewTheme.propTypes = {
  getPage: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  getPortfolio: PropTypes.func.isRequired,
  portfolio: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object,
  getPortfolioAsGuest: PropTypes.func.isRequired,
  getSaved: PropTypes.func.isRequired,
  savePortfolio: PropTypes.func.isRequired,
  getPageAsGuest: PropTypes.func.isRequired,
  getTheme: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
  getFonts: PropTypes.func.isRequired,
  fonts: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = (state) => ({
  page: state.eportfolio.page,
  savedPortfolios: state.eportfolio.savedPortfolios,
  portfolio: state.eportfolio.portfolio,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.eportfolio.error,
  muiTheme: state.eportfolio.muiTheme,
  fonts: state.googleFonts.fonts
});

export default connect(mapStateToProps, {getPage, getPortfolio, loadUser, getPortfolioAsGuest, getSaved, savePortfolio, getPageAsGuest, getTheme, getFonts})(ViewTheme);
