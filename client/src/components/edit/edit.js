import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Drawer, Button, TextField, Divider, Box, List, ListItem, Card, CardContent, CardHeader, IconButton, Icon, CardActionArea, CardActions } from '@material-ui/core';
import {getPortfolio, getPage} from '../../actions/eportfolio';
import { Link, useParams } from 'react-router-dom';
import store from '../../store'


import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import EditIcon from '@material-ui/icons/Edit';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  textinput: { 
    marginLeft: theme.spacing(2),
    margin: theme.spacing(1),
    width: '30ch',
  },
  cardRoot: {
    minWidth: 275,
  },
  pos: {
    marginBottom: 12,
  },
  unflex: {
    flex: 0,
  }
}));

const Edit = ({getPortfolio, portfolio, getPage, page}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [currID, setCurrID] = React.useState('');

  const handleDrawerOpen = (id) => {
    setCurrID(id);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getField = (index) => {
    return ["title", "subtitle", "paragraph", "mediaLink", "mediaType", "linkText", "linkAddress"][index];
  }
  const getItem = (index) => {
    const curr = items.filter(item => item._id === currID);
    const test = (curr.length > 0 && [getField(index)] in Object.keys(curr[0])) ? curr[0][getField(index)] : '';
    return test;
  }
  const editItem = (index, newValue) => {
    items.filter(item => item._id === currID)[0][getField(index)] = newValue;
  }

  const params = useParams();
  useEffect(() => {
    if (Object.keys(portfolio).length === 0){
      getPortfolio(params.id);
    }
    if (Object.keys(page).length === 0){
      getPage(params.id, params.pagename);
    }
  }, [getPortfolio, portfolio, getPage, page]);
  let items = (Object.keys(page).length !== 0) ? page.items : [];
  
    
  return (
    
    <Fragment>
    <div className={classes.root}>
    <CssBaseline />
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <form className={classes.root} noValidate autoComplete="off">
      <List>
        {['Title', 'Subtitle', 'Paragraph', 'Media Link', 'Media Type', 'Link Text', 'Link Address'].map((text, index) => (
          <TextField onChange={e => editItem(index, e.target.value)} className={classes.textinput} id="standard-basic" label={text}/>
        ))}
      </List>
      </form>
    </Drawer>
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <Typography variant="h1">{portfolio.name}</Typography>
      <List className="portfolioList">
      {items.map((object) => card(classes, handleDrawerOpen, object._id, object.title, object.subtitle, object.paragraph, object.linkText)
        )}        
      </List>
    </main>
  </div>
      
    </Fragment>
  );
}

const card = (classes, handleDrawerOpen, itemID, title, subtitle, paragraph, linkText) => {
  return (
    <Card className={classes.cardRoot} variant="outlined">
       <CardHeader
        classes={{action:classes.unflex}}
        action={
          <IconButton aria-label="settings" onClick={() => handleDrawerOpen(itemID)}>
            <EditIcon />
          </IconButton>
        }
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

Edit.propTypes = {
  getPage: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  getPortfolio: PropTypes.func.isRequired,
  portfolio: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  page: state.eportfolio.page,
  portfolio: state.eportfolio.portfolio
});

export default connect(mapStateToProps, {getPage, getPortfolio})(Edit);
