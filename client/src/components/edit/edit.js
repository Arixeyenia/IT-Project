import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Drawer, Grid, Button, CardMedia, TextField, Divider, Box, List, ListItem, ListItemText, ListItemIcon, Collapse, IconButton, Icon, FormControlLabel, CardActions, Checkbox } from '@material-ui/core';
import {getPortfolio, getPage, editItem, addItem, deleteItem, createPage, editPagename, makeMain, deletePage, isAuthenticated, error, getPortfolioAsGuest, addSocialMedia} from '../../actions/eportfolio';
import { loadUser } from '../../actions/auth';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import store from '../../store'
import { useThemeStyle } from '../../styles/themes';


import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import card from './card';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import {Instagram, Facebook, LinkedIn, Twitter} from '@material-ui/icons';

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
    justifyContent: 'space-between',
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
  unflex: {
    flex: '0 1 7em',
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
  },
  addRow:{
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  addCol:{
    position: 'absolute',
    top: '-50%',
    right: '-5em',
  },
  wrapper:{
    position: 'relative',
    height: '100%', 
    width: '100%'
  },
  addIcon:{
    fontSize: '3.5rem'  
  },
  inline:{
    display:'inline-flex'
  },
  inlineTextInput:{
    margin: theme.spacing(1)
  },
  socialLinks:{      
    display: 'flex',
    alignItems: 'center'
  },
  socialMedia:{
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    fontSize: '20px',
    color: 'white',
    padding: theme.spacing(2),
  },
  currentPage:{
    fontWeight: 'bold'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Edit = ({getPortfolio, portfolio, getPage, page, editItem, addItem, deleteItem, createPage, editPagename, makeMain, deletePage, loadUser, isAuthenticated, error, getPortfolioAsGuest, addSocialMedia}) => {
  const classes = useStyles();
  const theme = useTheme();
  const themeStyle = useThemeStyle();
  const history = useHistory();
  const { handleSubmit, register, reset } = useForm();
  const { handleSubmit:handleCreatePage, register:registerCreatePage, reset:resetCreatePage} = useForm();
  const { handleSubmit:handleEditPage, register:registerEditPage, reset:resetEditPage} = useForm();
  const { handleSubmit:handleSocialMedia, register:registerSocialMedia, reset:resetSocialMedia} = useForm();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [currPageOpen, setCurrPageOpen] = React.useState(true);
  const [editID, setEditID] = React.useState('');
  const [deleteID, setDeleteID] = React.useState('');
  const [toDelete, setToDelete] = React.useState('');


  const openCurrPage = () => {
    setCurrPageOpen(!currPageOpen);
  };

  const editItemWrapper = (values) => {
    values.item = editID;
    editItem(values);
    handleDrawerClose(); 
  }

  const addItemWrapper = (row, column) => {
    addItem({
      'portfolio': portfolio._id,
      'pagename': page.name,
      'row': row,
      'column': column,
      'title': 'Empty Item'
    });
  }

  const createPageWrapper = (values) =>{
    values.portfolio = portfolio._id;
    createPage(values);
    resetCreatePage();
  }

  const editPageWrapper = (values) =>{
    values.portfolio = portfolio._id;
    editPagename(values);
    resetEditPage();
    history.push('/edit/' + portfolio._id + '/' + encodeURI(values.newname));
    history.go(0);
  }

  const socialMediaWrapper = (values) => {
    values.portfolio = portfolio._id;
    addSocialMedia(values);
  }

  const handleDialogOpen = (target, id) => {
    setToDelete(target);
    setDeleteID(id);
    setDialogOpen(true);
  };

  const handleDialogClose = (accepted) => {

    if (accepted) {
      if (toDelete === 'ITEM') deleteItem(deleteID);
      if (toDelete === 'PAGE') deletePage(portfolio._id, deleteID);
    }
    setToDelete('');
    setDeleteID('');
    setDialogOpen(false);
    if (toDelete === 'PAGE'){
      history.push('/edit/' + portfolio._id);
      history.go(0);
    }
  };

  const handleDrawerOpen = (id) => {
    setEditID(id);
    setDrawerOpen(true);
    reset(getItem(id));
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const getField = (index) => {
    return ['title', 'subtitle', 'paragraph', 'mediaLink', 'mediaType', 'linkText', 'linkAddress', 'private', 'row', 'column'][index];
  }

  const getItem = (id) => {
    const curr = items.filter(item => item._id === id);
    let item = {};
    ['title', 'subtitle', 'paragraph', 'mediaLink', 'mediaType', 'linkText', 'linkAddress', 'private', 'row', 'column'].forEach(field => {if (curr.length > 0 && Object.keys(curr[0]).includes(field)) item[field] = curr[0][field];});
    return item;
  }

  const params = useParams();
  useEffect(() => {
    if (Object.keys(portfolio).length === 0 || portfolio._id !== params.id) {
      if (store.getState().auth.isAuthenticated){
        getPortfolio(params.id);
      }
      else{
        getPortfolioAsGuest(params.id);
      }
    }
    if (Object.keys(page).length === 0 || !(page.url === params.pagename || (page.main && params.pagename===''))) {
      getPage(params.id, params.pagename);
    }
    if (Object.keys(portfolio).includes("socialmedia")){
      resetSocialMedia(portfolio.socialmedia);
    }
  }, [getPortfolio, portfolio, getPage, page, loadUser, isAuthenticated]);
  console.log(portfolio);
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
    <Box className={themeStyle.content}>
    <div className={classes.root}>
    <CssBaseline />
    <Drawer
      className={classes.drawer}
      variant='persistent'
      anchor='left'
      open={drawerOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Typography variant='h4' className={classes.drawerTitle}>{editID === '' ? 'Options' : 'Edit'}</Typography>
        <IconButton onClick={() => handleDrawerClose()}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      {editID === '' && Object.keys(portfolio).length !== 0 &&
        <div>
        <Typography variant='h5'>Pages</Typography>
        <List>
            {portfolio.pages.map(page => (<div key={page.url}><ListItem button onClick={() => {if (page.name === params.pagename){openCurrPage();} else{history.push('/edit/' + portfolio._id + '/' + page.url);history.go(0);}}} selected={page.url === params.pagename}>
            <ListItemText primary={page.name}/>
            {page.main && <ListItemIcon><HomeIcon></HomeIcon></ListItemIcon>}
            {page.name === params.pagename && (currPageOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>
          {page.name === params.pagename && <Collapse in={currPageOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem className={classes.nested}>
              <form noValidate autoComplete="off" onSubmit={handleEditPage(editPageWrapper)}>
              <span className={classes.inline}>
              <TextField style={{display:'none'}} name="oldname" value={page.name} inputRef={registerEditPage}/>
              <TextField label='New Name' variant="outlined" name="newname" inputRef={registerEditPage}/>
              <Button variant="outlined" startIcon={<EditIcon />} color="primary" type="submit">Edit</Button>
              </span>
              </form>
            </ListItem>
            {!page.main && 
            <ListItem className={classes.nested}>
            <Button
            variant="outlined"    
            color="primary"      
            startIcon={<HomeIcon />}
            onClick={() => makeMain(portfolio._id, page.name)}
            >
            Make Main
            </Button>
            </ListItem>}
            <ListItem className={classes.nested}>
            <Button
            variant="outlined"
            color="primary"
            startIcon={<DeleteIcon />}
            onClick={() => handleDialogOpen('PAGE', page.url)}
            >
            Delete
            </Button>
            </ListItem>
          </List>
        </Collapse>}
        </div>
          ))}
        <form noValidate autoComplete="off" onSubmit={handleCreatePage(createPageWrapper)}><span className={classes.inline}><TextField className={classes.inlineTextInput} label='New Page' variant="outlined" name="pagename" inputRef={registerCreatePage}/><Button variant="outlined" color="primary" className={classes.inlineTextInput} startIcon={<AddIcon />} type="submit">Add</Button></span></form>
        </List>
        <Typography variant='h5'>Social Media</Typography>
        <form noValidate autoComplete="off" onSubmit={handleSocialMedia(socialMediaWrapper)}>
          {['facebook', 'instagram', 'twitter', 'linkedin'].map(name => (<TextField className={classes.textinput} label={name} variant="outlined" name={name} key={name} inputRef={registerSocialMedia}/>))}
          <Button variant="outlined" color="primary" className={classes.textinput} type="submit">Save</Button>
        </form>
        </div>
      }
      {editID !== '' &&
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(editItemWrapper)}>
      <List>
        {['Title', 'Subtitle', 'Paragraph', 'Media Link', 'Media Type', 'Link Text', 'Link Address', 'private', 'row', 'column'].map((text, index) => (
          <TextField key={getField(index)} className={classes.textinput} id='standard-basic' label={text} variant='outlined' name={getField(index)} inputRef={register}/>
        ))}
        <Button variant='outlined' color='primary' className={classes.textinput} type='submit'>Save</Button>
      </List>      
      </form>
      }
    </Drawer>
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: drawerOpen,
      })}
    >
      <Typography variant="h1">{portfolio.name}</Typography>
      {Object.keys(error).length!==0 && <Box className={themeStyle.content}>
      <Typography variant='h3'>You are not authorised to edit this portfolio.</Typography>
      </Box>}
      {Object.keys(portfolio).length > 0 && <IconButton onClick={() => {if(drawerOpen){handleDrawerClose();}else{handleDrawerOpen('')}}}>
          <MenuIcon/>&nbsp;Options
        </IconButton>}
        <div className={classes.socialLinks}>
            {Object.keys(portfolio).includes("socialmedia") && portfolio.socialmedia.facebook !== "" && <Button className={classes.socialMedia} style={{backgroundColor:"#4267B2"}} onClick={() => window.location.href=portfolio.socialmedia.facebook}><Facebook/></Button>}
            {Object.keys(portfolio).includes("socialmedia") && portfolio.socialmedia.instagram !== "" && <Button className={classes.socialMedia} style={{backgroundColor:"#DD2A7B"}} onClick={() => window.location.href=portfolio.socialmedia.instagram}><Instagram/></Button>}
            {Object.keys(portfolio).includes("socialmedia") && portfolio.socialmedia.twitter !== "" && <Button className={classes.socialMedia} style={{backgroundColor:"#1DA1F2"}} onClick={() => window.location.href=portfolio.socialmedia.twitter}><Twitter/></Button>}
            {Object.keys(portfolio).includes("socialmedia") && portfolio.socialmedia.linkedin !== "" && <Button className={classes.socialMedia} style={{backgroundColor:"#2867B2"}} onClick={() => window.location.href=portfolio.socialmedia.linkedin}><LinkedIn/></Button>}
        </div>
      <Grid container spacing={3}>
      {items.map((object) => card(classes, rowLengths, portfolio._id, object, history, handleDrawerOpen, handleDialogOpen, addItemWrapper)
        )}

        {Object.keys(portfolio).length > 0 && <IconButton
        color='primary'   
        onClick = {() => addItemWrapper(Object.keys(rowLengths).length, 0)}
        children={<AddCircleOutlineIcon classes={{root:classes.addIcon}}/>}
        className={classes.addRow}>
        </IconButton>}
      </Grid>
    </main>
  </div>
  <Dialog
        open={dialogOpen}
        onClose={() => handleDialogClose(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id="alert-dialog-title">{(toDelete === 'ITEM') ? "Do you want to delete this item?" : "Do you want to delete this page?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {(toDelete === 'ITEM') ? "Once deleted, this item will not be able to be restored." : "Once deleted, this page will not be able to be restored."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color='primary' autoFocus>
            No
          </Button>
          <Button onClick={() =>handleDialogClose(true)} color='primary'>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


Edit.propTypes = {
  getPage: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  getPortfolio: PropTypes.func.isRequired,
  portfolio: PropTypes.object.isRequired,
  editItem: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  createPage: PropTypes.func.isRequired,
  editPagename: PropTypes.func.isRequired,
  makeMain: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object,
  getPortfolioAsGuest: PropTypes.func.isRequired,
  addSocialMedia: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  page: state.eportfolio.page,
  portfolio: state.eportfolio.portfolio,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.eportfolio.error
});

export default connect(mapStateToProps, {getPage, getPortfolio, editItem, addItem, deleteItem, createPage, editPagename, makeMain, deletePage, loadUser, getPortfolioAsGuest, addSocialMedia})(Edit);
