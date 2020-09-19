import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Divider, Box, List, ListItem, Card, CardContent, CardHeader, IconButton, Icon, CardActionArea, Menu, MenuItem, GridList, GridListTile } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add'
import {getUserEPortfolios, getEPortfolioThumbnail, deletePortfolio, setDeletePortfolioID} from '../../actions/eportfolio';
import { Link } from 'react-router-dom';

const Dashboard = ({getUserEPortfolios, userEPortfolios, getEPortfolioThumbnail, eportfolioThumbnails, deletePortfolio, setDeletePortfolioID, deleteThisPortfolio}) => {
  

  const DeleteThisPortfolio = (id) => {
    console.log(id);
    deletePortfolio(id);
  }

  useEffect(() => {
    if (userEPortfolios.length == 0){
      getUserEPortfolios();
    }
    ePortfolioIDs.forEach(id => {
      getEPortfolioThumbnail(id);
    });
    if (deleteThisPortfolio != null){
      deletePortfolio(deleteThisPortfolio);
    }
  }, [getUserEPortfolios, getEPortfolioThumbnail, userEPortfolios, deleteThisPortfolio]);
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
      <GridList className="portfolioList">
        {DisplayPortfolioItem(arrayOfPortfolioObjects, setDeletePortfolioID)}
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
function DisplayPortfolioItem(arrayOfPortfolioObjects, setDeletePortfolioID) {
  
  return(
    arrayOfPortfolioObjects.map((object, i) => (
      <GridListTile className="portfolioListItem" key={object.portfolio._id}>
        <Card raised={true} className="portfolioCard">
          <IndividualMenu i={i} object={object}/>
          <img src={object.thumbnail} alt="Portfolio Thumbnail" className="cardThumbnail"></img>
          <CardContent className="overlayPortfolioItem">
            <Typography variant="body1" className="fontg6">{object.portfolio.name}</Typography>
          </CardContent>
        </Card>
        
      </GridListTile>
    ))
  );
}

// Test component for the button and menu
class IndividualMenutest extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      anchorEl: null,
    }
  }
  handleClick = (event) => {
    this.setState({anchorEl: event.currentTarget});
  };
  handleClose = () => {
    this.setState({anchorEl: null});
  };
  render(){
  return(
    <React.Fragment>
    <CardHeader action={
      <IconButton aria-label="settings" aria-controls={"menu-"+this.props.object.portfolio._id} onClick={this.handleClick}>
        <MoreVertIcon />
      </IconButton>
    }>
      <Menu id={"menu-"+this.props.i}
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
            className="PortfolioCard-Menu">
        <MenuItem onClick={this.handleClose}>Edit</MenuItem>
        <MenuItem onClick={() => {searchArray(this.props.i)}}>Delete {this.props.i}</MenuItem>
        <MenuItem onClick={this.handleClose}>Get link</MenuItem>
      </Menu>
    </CardHeader></React.Fragment>
  );}
}

// Currently using this component for the button and drop down menu
// Issue: Menu is not appearing, may be because of anchorEl
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
      <Menu id={"menu-"+props.i}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className="PortfolioCard-Menu">
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={() => {searchArray(props.i)}}>Delete {props.i}</MenuItem>
        <MenuItem onClick={handleClose}>Get link</MenuItem>
      </Menu>
    </CardHeader></React.Fragment>
  );

}

function searchArray(array, index){
    console.log(index);
}

Dashboard.propTypes = {
  getUserEPortfolios: PropTypes.func.isRequired,
  userEPortfolios: PropTypes.arrayOf(PropTypes.object).isRequired,
  eportfolioThumbnails: PropTypes.arrayOf(PropTypes.string).isRequired,
  deletePortfolio: PropTypes.func.isRequired,
  deleteThisPortfolio: PropTypes.string,
  setDeletePortfolioID: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  userEPortfolios: state.eportfolio.userEPortfolios,
  eportfolioThumbnails: state.eportfolio.eportfolioThumbnails,
  deleteThisPortfolio: state.eportfolio.deleteThisPortfolio,
});

export default connect(mapStateToProps, { getUserEPortfolios, getEPortfolioThumbnail, deletePortfolio, setDeletePortfolioID })(Dashboard);
