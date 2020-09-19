import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Divider, Box, List, ListItem, Card, CardContent, CardHeader, IconButton, Icon, CardActionArea } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add'
import {getPortfolio, getPage} from '../../actions/eportfolio';
import { Link, useParams } from 'react-router-dom';
import store from '../../store'

const View = ({getPortfolio, portfolio, getPage, page}) => {
  const id = useParams().id;
  const pageName = useParams().pagename;
  useEffect(() => {
    if (Object.keys(portfolio).length === 0){
      getPortfolio(id);
    }
    if (Object.keys(page).length === 0){
      getPage(id, pageName);
    }
  }, [getPortfolio, portfolio, getPage, page]);
  const items = (Object.keys(page).length !== 0) ? page.items : [];
  console.log(portfolio);
  console.log(page);
    
  return (
    <Fragment>
      <Typography variant="h1">{portfolio.name}</Typography>
      <List className="portfolioList">
      {items.map((object) =>{
          return (
            <ListItem className="portfolioListItem" key={object._id}>
              <Card raised={true} className="portfolioCard">
                
                <CardContent className="overlayPortfolioItem">
                  <Typography variant="body1" className="fontg6">{object.title}</Typography>
                  <Typography variant="body5" className="fontg6">{object.paragraph}</Typography>
                </CardContent>
              </Card>
            </ListItem>
          );
        })}        
      </List>
    </Fragment>
  );
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
