import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Box, List, Card, CardContent, Icon, CardActionArea, GridList, GridListTile } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import {getUserEPortfolios, getEPortfolioThumbnail, deletePortfolio} from '../../actions/eportfolio';
import { Link } from 'react-router-dom';
import Category from './DashboardCategory';
import IndividualMenu from './DashboardMenu';
import useStyles from './DashboardStyles';
import { useThemeStyle } from '../../styles/themes';

const Dashboard = ({getUserEPortfolios, userEPortfolios, getEPortfolioThumbnail, eportfolioThumbnails, deletePortfolio}) => {
  const classes = useStyles();
  const theme = useThemeStyle();
  useEffect(() => {
    if (userEPortfolios.length == 0){
      getUserEPortfolios();
    }
    ePortfolioIDs.forEach(id => {
      getEPortfolioThumbnail(id);
    });
  }, [getUserEPortfolios, getEPortfolioThumbnail, userEPortfolios]);
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
    <Box className={theme.content}>
      <Typography variant='h2'>Welcome to your dashboard</Typography>
      <Category title='Your existing ePortfolios'></Category>
      <GridList className={classes.portfolioList}>
        {DisplayPortfolioItem(arrayOfPortfolioObjects, deletePortfolio)}
        <GridListTile className={classes.portfolioListItem} key='last'>
            <Card raised={true} className={`${classes.portfolioCard} 'MuiButton-root'`}>
              <CardActionArea><Link to='/create-eportfolio'>
                <Box className={classes.addPortfolio}>
                  <Icon aria-label='settings' className={classes.addPortfolioIcon}>
                    <AddIcon fontSize='large'/>
                  </Icon>
                </Box>
              </Link></CardActionArea>
            </Card>
          </GridListTile>
      </GridList>
      <Category title='Your favourited ePortfolios'></Category>
      <List ></List>
    </Box>
  );
}


// Component to map each tile
function DisplayPortfolioItem(arrayOfPortfolioObjects, deletePortfolio) {
  const classes = useStyles();
  const theme = useThemeStyle();
  return(
    arrayOfPortfolioObjects.map((object, i) => (
      <GridListTile className={classes.portfolioListItem} key={object.portfolio._id}>
        <Card raised={true} className={classes.portfolioCard}>
          <IndividualMenu i={i} object={object} deletePortfolio={deletePortfolio}/>
          <img src={object.thumbnail} alt='Portfolio Thumbnail' className={classes.cardThumbnail}></img>
          <CardContent className={classes.overlayPortfolioItem}>
            <Typography variant='body1' className={theme.fontg6}>{object.portfolio.name}</Typography>
          </CardContent>
        </Card>
        
      </GridListTile>
    ))
  );
}

Dashboard.propTypes = {
  getUserEPortfolios: PropTypes.func.isRequired,
  userEPortfolios: PropTypes.arrayOf(PropTypes.object).isRequired,
  eportfolioThumbnails: PropTypes.arrayOf(PropTypes.string).isRequired,
  deletePortfolio: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  userEPortfolios: state.eportfolio.userEPortfolios,
  eportfolioThumbnails: state.eportfolio.eportfolioThumbnails
});

export default connect(mapStateToProps, { getUserEPortfolios, getEPortfolioThumbnail, deletePortfolio })(Dashboard);
