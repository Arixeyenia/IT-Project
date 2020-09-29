import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Grid, Box, Card, CardContent, CardHeader, CardMedia, CardActions, Button } from '@material-ui/core';
import {getPortfolio, getPage} from '../../actions/eportfolio';
import { useParams, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    minWidth: 275,
    boxShadow: 'none',
    borderRadius: 0,
  },
  pos: {
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
    if (Object.keys(portfolio).length === 0){
      getPortfolio(params.id);
    }
    if (Object.keys(page).length === 0){
      getPage(params.id, params.pagename);
    }
  }, [getPortfolio, portfolio, getPage, page]);

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

  return (
    <Box className="content">
      <Typography variant="h1">{portfolio.name}</Typography>
      {groupedItems.map((item)=>
      <Grid container spacing={3} className="view-grid-container">
      {item.map((object) => card(classes, rowLengths, params.id, object, history))}  
      </Grid>)}
    </Box>
  );
}

const card = (classes, rowLengths, portfolioID, object, history) => {
  return (
    <Grid item xs={12/rowLengths[object.row]} className="view-grid-item">
    <Card className={classes.cardRoot}>
      {object.mediaType === "image" && <CardMedia
          className={classes.media}
          image={object.mediaLink}
        />}
       {object.title && <CardHeader
        classes={{title:classes.titleText}}
        title={object.title}
        subheader={object.subtitle}
      />}
      {object.paragraph&& <CardContent className="view-card-content">
        {object.paragraph && <Typography variant="body2" component="p">
          {object.paragraph}
        </Typography>}
      </CardContent>}
      {object.linkAddress && <CardActions className="view-card-actions">
           <Button size="small" onClick={()=> {if(!/^(f|ht)tps?:\/\//i.test(object.linkAddress)){ history.push('/view/' + portfolioID + '/' + object.linkAddress);}else{ window.location.href = object.linkAddress;}window.location.reload(false);}}>{object.linkText}</Button>
      </CardActions>}
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
