import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Grid, Divider, Box, List, ListItem, Card, CardContent, CardHeader, CardMedia, Icon, CardActions, Button } from '@material-ui/core';
import {getPortfolio, getPage} from '../../actions/eportfolio';
import { Link, useParams, useHistory } from 'react-router-dom';
import store from '../../store'
import Comment from '../comments/Comment';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    minWidth: 275,
  },
  pos: {
    marginTop: '2em',
    marginBottom: 12,
  },
  media: {
    padding:'20vh'
  },
  titleText:{
    fontSize: '1.5rem'
  }
}));

const View = ({getPortfolio, portfolio, getPage, page}) => {
  const classes = useStyles();
  const theme = useTheme();
  const params = useParams();
  const history = useHistory();
  useEffect(() => {
    if (Object.keys(portfolio).length === 0) {
      getPortfolio(params.id);
    }
    if (Object.keys(page).length === 0) {
      getPage(params.id, params.pagename);
    }
  }, [getPortfolio, portfolio, getPage, page]);
  const items = (Object.keys(page).length !== 0) ? page.items.sort((a, b) => a.row - b.row || a.column - b.column) : [];
  const rowLengths = {};
  items.forEach(element => {
    if ([element.row] in Object.keys(rowLengths)){
      rowLengths[element.row]++; 
    }
    else{
      rowLengths[element.row] = 1;
    }
  });
    
  return (
    <Fragment>
      <Typography variant='h1'>{portfolio.name}</Typography>
      <Grid container spacing={3}>
      {items.map((object) => card(classes, rowLengths, params.id, object, history, portfolio.user))}  
      </Grid>
    </Fragment>
  );
}

const card = (classes, rowLengths, portfolioID, object, history, owner) => {
  return (
    <Grid item xs={12/rowLengths[object.row]}>
    <Card className={classes.cardRoot} variant="outlined">
      {object.mediaType === "image" && <CardMedia
          className={classes.media}
          image={object.mediaLink}
        />}
       <CardHeader
        classes={{title:classes.titleText}}
        title={object.title}
      />
      <CardContent>
        <Typography className={classes.pos} color="textSecondary">
            {object.subtitle}
        </Typography>
        <Typography variant="body2" component="p">
          {object.paragraph}
        </Typography>
      </CardContent>
      <CardActions>
           <Button size="small" onClick={()=> {if(!/^(f|ht)tps?:\/\//i.test(object.linkAddress)){ history.push('/view/' + portfolioID + '/' + object.linkAddress);}else{ window.location.href = object.linkAddress;}window.location.reload(false);}}>{object.linkText}</Button>
      </CardActions>
      <Comment itemID={object._id} owner={owner} />
    </Card>
    </Grid>
  )
}


View.propTypes = {
  getPage: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  getPortfolio: PropTypes.func.isRequired,
  portfolio: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  page: state.eportfolio.page,
  portfolio: state.eportfolio.portfolio
});

export default connect(mapStateToProps, {getPage, getPortfolio})(View);
