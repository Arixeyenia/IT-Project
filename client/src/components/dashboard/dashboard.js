import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Divider, Box, List, ListItem, Card, CardContent, CardHeader, IconButton, Icon, CardActionArea, Menu, MenuItem, GridList, GridListTile } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add'
import {getUserEPortfolios, getEPortfolioThumbnail, deletePortfolio, setDeletePortfolioID} from '../../actions/eportfolio';
import { Link } from 'react-router-dom';

const Dashboard = ({getUserEPortfolios, userEPortfolios, getEPortfolioThumbnail, eportfolioThumbnails, deletePortfolio}) => {

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
    <Fragment>
      <Typography variant="h1">Welcome to your dashboard</Typography>
      <Category title="Your existing ePortfolios"></Category>
      <GridList className="portfolioList">
        {DisplayPortfolioItem(arrayOfPortfolioObjects, deletePortfolio)}
        <GridListTile className="portfolioListItem" key="last">
            <Card raised={true} className="portfolioCard MuiButton-root">
              <CardActionArea><Link to="/create-eportfolio">
                <Box className="addPortfolio">
                  <Icon aria-label="settings" className="addPortfolioIcon">
                    <AddIcon fontSize="large"/>
                  </Icon>
                </Box>
              </Link></CardActionArea>
            </Card>
          </GridListTile>
      </GridList>
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

// Component to map each tile
function DisplayPortfolioItem(arrayOfPortfolioObjects, deletePortfolio) {
  
  return(
    arrayOfPortfolioObjects.map((object, i) => (
      <GridListTile className="portfolioListItem" key={object.portfolio._id}>
        <Card raised={true} className="portfolioCard">
          <IndividualMenu i={i} object={object} deletePortfolio={deletePortfolio}/>
          <img src={object.thumbnail} alt="Portfolio Thumbnail" className="cardThumbnail"></img>
          <CardContent className="overlayPortfolioItem">
            <Typography variant="body1" className="fontg6">{object.portfolio.name}</Typography>
          </CardContent>
        </Card>
        
      </GridListTile>
    ))
  );
}

// Currently using this component for the button and drop down menu
function IndividualMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return(
    <React.Fragment>
    <CardHeader action={
      <IconButton aria-label="settings" aria-controls={"menu-"+props.object.portfolio._id} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
    }>
    </CardHeader>
    <Menu id={"menu-"+props.i}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className="PortfolioCard-Menu">
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={() => {props.deletePortfolio(props.object.portfolio._id)}}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Get link</MenuItem>
      </Menu></React.Fragment>
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
