import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Divider, Box, List, ListItem, Card, CardContent, CardHeader, IconButton, Icon, Button, CardActionArea } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add'
import {getUserEPortfolios, getEPortfolioThumbnail} from '../../actions/eportoflio';

const Dashboard = ({getUserEPortfolios, userEPortfolios, getEPortfolioThumbnail, eportfolioThumbnails}) => {
  useEffect(() => {
    if (userEPortfolios.length == 0){
      getUserEPortfolios();
    }
    ePortfolioIDs.forEach(id => {
      getEPortfolioThumbnail(id);
    });
  }, [getUserEPortfolios, getEPortfolioThumbnail, userEPortfolios]);
  console.log(userEPortfolios);
  console.log(eportfolioThumbnails);
  
  var ePortfolioIDs = [];
  userEPortfolios.forEach(portfolio => {
    ePortfolioIDs.push(portfolio._id);
  });

  var arrayOfPortfolioObjects = [];
  for (let i = 0; i < userEPortfolios.length; i++) {
    arrayOfPortfolioObjects.push({
      portfolio: userEPortfolios[i],
      thumbnail: eportfolioThumbnails[i]
    })
  }

  return (
    <Fragment>
      <Typography variant="h1">Welcome to your dashboard</Typography>
      <Category title="Your existing ePortfolios"></Category>
      <List className="portfolioList">
        {arrayOfPortfolioObjects.map((object) =>{
          return (
            <ListItem className="portfolioListItem" key={object.portfolio._id}>
              <Card raised={true} className="portfolioCard">
                <CardHeader action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }>
                </CardHeader>
                <img src={object.thumbnail} alt="Portfolio Thumbnail" className="cardThumbnail"></img>
                <CardContent className="overlayPortfolioItem">
                  <Typography variant="body1" className="fontg6">{object.portfolio.name}</Typography>
                </CardContent>
              </Card>
            </ListItem>
          );
        })}
        <ListItem className="portfolioListItem" key="last">
            <Card raised={true} className="portfolioCard MuiButton-root">
              <CardActionArea>
                <Box className="addPortfolio">
                  <Icon aria-label="settings" className="addPortfolioIcon">
                    <AddIcon fontSize="large"/>
                  </Icon>
                </Box>
              </CardActionArea>
            </Card>
          </ListItem>
      </List>
      <Category title="Your favourited ePortfolios"></Category>
      <List ></List>
    </Fragment>
  );
}

function Category(props) {
  return (
    <Box className="category">
      <Typography noWrap variant="body1">{props.title}</Typography>
      <Box>
        <Divider light className="categoryLine"/>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  getUserEPortfolios: PropTypes.func.isRequired,
  userEPortfolios: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  userEPortfolios: state.eportfolio.userEPortfolios,
  eportfolioThumbnails: state.eportfolio.eportfolioThumbnails,
});

export default connect(mapStateToProps, { getUserEPortfolios, getEPortfolioThumbnail })(Dashboard);
