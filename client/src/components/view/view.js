import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Divider, Box, List, ListItem, Card, CardContent, CardHeader, IconButton, Icon, CardActions, Button } from '@material-ui/core';
import {getPortfolio, getPage} from '../../actions/eportfolio';
import { Link, useParams } from 'react-router-dom';
import store from '../../store'

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    minWidth: 275,
  },
  pos: {
    marginBottom: 12,
  }
}));

const View = ({getPortfolio, portfolio, getPage, page}) => {
  const classes = useStyles();
  const theme = useTheme();
  const params = useParams();
  useEffect(() => {
    if (Object.keys(portfolio).length === 0){
      getPortfolio(params.id);
    }
    if (Object.keys(page).length === 0){
      getPage(params.id, params.pagename);
    }
  }, [getPortfolio, portfolio, getPage, page]);
  const items = (Object.keys(page).length !== 0) ? page.items : [];
  console.log(portfolio);
  console.log(page);
    
  return (
    <Fragment>
      <Typography variant="h1">{portfolio.name}</Typography>
      <List className="portfolioList">
           {items.map((object) => card(classes, object._id, object.title, object.subtitle, object.paragraph, object.linkText))}  
      </List>
    </Fragment>
  );
}

const card = (classes, itemID, title, subtitle, paragraph, linkText) => {
  return (
    <Card className={classes.cardRoot} variant="outlined">
       <CardHeader
        title={title}
      />
      <CardContent>
        <Typography className={classes.pos} color="textSecondary">
            {subtitle}
        </Typography>
        <Typography variant="body2" component="p">
          {paragraph}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{linkText}</Button>
      </CardActions>
    </Card>
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
