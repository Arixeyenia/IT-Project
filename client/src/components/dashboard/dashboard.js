import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Divider, Box, List, Card, CardContent, CardHeader, IconButton, Icon, CardActionArea, Menu, MenuItem, GridList, GridListTile, Popover, Button, TextField } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add'
import {getUserEPortfolios, getEPortfolioThumbnail, deletePortfolio, setDeletePortfolioID} from '../../actions/eportfolio';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { setAlert } from '../../actions/alert';

const Dashboard = ({getUserEPortfolios, userEPortfolios, getEPortfolioThumbnail, eportfolioThumbnails, deletePortfolio}) => {
  useEffect(() => {
    if (userEPortfolios.length == 0){
      getUserEPortfolios();
    }
    ePortfolioIDs.forEach(id => {
      getEPortfolioThumbnail(id);
    });
  }, [getUserEPortfolios, getEPortfolioThumbnail, userEPortfolios]);
  console.log(userEPortfolios);
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
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [popoverAnchor, setPopoverAnchor] = React.useState(null);

  const openPopover = (event, id) => {
    setPopoverAnchor(event.currentTarget);
    var index = window.location.href.lastIndexOf('/');
    setUrl(window.location.href.slice(0, index)+ '/' + 'view/' + id);
    console.log(url);
  };

  const popoverClose = () => {
    setPopoverAnchor(null);
  };

  // TODO: Copy success
  var [url, setUrl] = React.useState('');
  const copyClipboardLink = (elementId) => {
    document.getElementById(elementId).value = url;
    var textToCopy = document.getElementById(elementId);
    var range = document.createRange();
    range.selectNode(textToCopy);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
  }

  return(
    <Box className="card-action-section">
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
          <MenuItem onClick={() => history.push('/view/' + props.object.portfolio._id)}>View</MenuItem>
          <MenuItem onClick={() => history.push('/edit/' + props.object.portfolio._id)}>Edit</MenuItem>
          <MenuItem onClick={() => {props.deletePortfolio(props.object.portfolio._id)}}>Delete</MenuItem>
          <MenuItem onClick={(event)=>openPopover(event, props.object.portfolio._id)}>Get link</MenuItem>
      </Menu>
      <Popover id={"popover-"+props.i}
              anchorEl={popoverAnchor}
              onClose={popoverClose}
              open={Boolean(popoverAnchor)}
              className="copylink-popover">
        <textarea disabled id={"text-"+props.i} value={url}></textarea>
        <Button variant="contained" color="primary" onClick={() => {copyClipboardLink("text-"+props.i)}}>Copy to clipboard</Button>
      </Popover>
    </Box>
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
