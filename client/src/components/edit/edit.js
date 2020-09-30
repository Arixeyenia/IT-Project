import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Drawer, Grid, Button, CardMedia, TextField, Divider, Box, List, ListItem, ListItemText, ListItemIcon, CardHeader, IconButton, Icon, CardActionArea, CardActions } from '@material-ui/core';
import {getPortfolio, getPage, editItem, addItem, deleteItem} from '../../actions/eportfolio';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import store from '../../store'


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
  } 
}));

const Edit = ({getPortfolio, portfolio, getPage, page, editItem, addItem, deleteItem}) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { handleSubmit, register, reset } = useForm();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editID, setEditID] = React.useState('');
  const [deleteID, setDeleteID] = React.useState('');

  const onSubmit = (values) => {
    values.item = editID;
    editItem(values);
    handleDrawerClose(); 
  }

  const addItemWrapper = (row, column) => {
    addItem({
      "portfolio": portfolio._id,
      "pagename": page.name,
      "row": row,
      "column": column,
      "title": "Empty Item"
    });
  }

  const handleDialogOpen = (id) => {
    setDeleteID(id);
    setDialogOpen(true);
  };

  const handleDialogClose = (accepted) => {
    if (accepted) deleteItem(deleteID);
    setDeleteID('');
    setDialogOpen(false);
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
    return ["title", "subtitle", "paragraph", "mediaLink", "mediaType", "linkText", "linkAddress", "private", "row", "column"][index];
  }

  const getItem = (id) => {
    const curr = items.filter(item => item._id === id);
    let item = {};
    ["title", "subtitle", "paragraph", "mediaLink", "mediaType", "linkText", "linkAddress", "private", "row", "column"].forEach(field => {if (curr.length > 0 && Object.keys(curr[0]).includes(field)) item[field] = curr[0][field];});
    return item;
  }

  const params = useParams();
  useEffect(() => {
    if (Object.keys(portfolio).length === 0){
      getPortfolio(params.id);
    }
    if (Object.keys(page).length === 0){
      getPage(params.id, params.pagename);
    }
  }, [portfolio, page]);
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
    <Box className="content">
    <div className={classes.root}>
    <CssBaseline />
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
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
            {portfolio.pages.map(page => (<ListItem button onClick={() => {history.push('/edit/' + portfolio._id + '/' + page.url);history.go(0);}} key={page.url}>
            <ListItemText primary={page.name} />
            {page.main && <ListItemIcon><HomeIcon></HomeIcon></ListItemIcon>}            
          </ListItem>))}
          <span className={classes.inline}><TextField className={classes.inlineTextInput} label='New Page' variant="outlined"/><Button variant="outlined" color="primary" className={classes.inlineTextInput} type="submit">Add</Button></span>
        </List>
        <Typography variant='h5'>Social Media</Typography>
        <form>
          {['instagram', 'facebook', 'twitter', 'linkedin'].map(name => (<TextField className={classes.textinput} label={name} variant="outlined"/>))}
          <Button variant="outlined" color="primary" className={classes.textinput} type="submit">Save</Button>
        </form>
        </div>
      }
      {editID !== '' &&
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <List>
        {['Title', 'Subtitle', 'Paragraph', 'Media Link', 'Media Type', 'Link Text', 'Link Address', "private", "row", "column"].map((text, index) => (
          <TextField key={getField(index)} className={classes.textinput} id="standard-basic" label={text} variant="outlined" name={getField(index)} inputRef={register}/>
        ))}
        <Button variant="outlined" color="primary" className={classes.textinput} type="submit">Save</Button>
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
      <IconButton onClick={() => {if(drawerOpen){handleDrawerClose();}else{handleDrawerOpen('')}}}>
          <MenuIcon/>&nbsp;Options
        </IconButton>
        <div className={classes.socialLinks}>
            <Button className={classes.socialMedia} style={{backgroundColor:"#4267B2"}}><Facebook/></Button>
            <Button className={classes.socialMedia} style={{backgroundColor:"#DD2A7B"}}><Instagram/></Button>
            <Button className={classes.socialMedia} style={{backgroundColor:"#1DA1F2"}}><Twitter/></Button>
            <Button className={classes.socialMedia} style={{backgroundColor:"#2867B2"}}><LinkedIn/></Button>
        </div>
      <Grid container spacing={3}>
      {items.map((object) => card(classes, rowLengths, portfolio._id, object, history, handleDrawerOpen, handleDialogOpen, addItemWrapper)
        )}

        <IconButton
        color="primary"   
        onClick = {() => addItemWrapper(Object.keys(rowLengths).length, 0)}
        children={<AddCircleOutlineIcon classes={{root:classes.addIcon}}/>}
        className={classes.addRow}>
        </IconButton>        
      </Grid>
    </main>
  </div>
  <Dialog
        open={dialogOpen}
        onClose={() => handleDialogClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Do you want to delete this item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once deleted, this item will not be able to be restored.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary" autoFocus>
            No
          </Button>
          <Button onClick={() =>handleDialogClose(true)} color="primary">
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
  deleteItem: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  page: state.eportfolio.page,
  portfolio: state.eportfolio.portfolio
});

export default connect(mapStateToProps, {getPage, getPortfolio, editItem, addItem, deleteItem})(Edit);
