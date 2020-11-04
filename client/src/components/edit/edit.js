import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Drawer, Grid, Button, CardMedia, TextField, Divider, Box, List, ListItem, ListItemText, ListItemIcon, Collapse, IconButton, Icon, FormControlLabel, CardActions, Checkbox } from '@material-ui/core';
import {getPortfolio, getPage, editItem, addItem, deleteItem, createPage, editPagename, makeMain, deletePage, setPrivacy, addSocialMedia, sharePortfolio, getTheme} from '../../actions/eportfolio';
import { getFonts } from '../../actions/googleFonts';
import { loadUser } from '../../actions/auth';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import store from '../../store'
import { useThemeStyle } from '../../styles/themes';
import { useStyles } from './editStyles';
import PortfolioTheme from './portfolioTheme'
import globalTheme from '../../styles/themes';
import api from '../../utils/api';
import FormData from 'form-data';

import clsx from 'clsx';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
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
import ItemCard from './card';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import {Instagram, Facebook, LinkedIn, Twitter} from '@material-ui/icons';

const EditTheme = ({getPortfolio, portfolio, getPage, page, editItem, addItem, deleteItem, createPage, editPagename, makeMain, deletePage, loadUser, isAuthenticated, error, addSocialMedia, setPrivacy, sharePortfolio, getTheme, muiTheme, getFonts, fonts, headerTheme, itemMuiThemes}) => {
  const classes = useStyles();
  const theme = useTheme();
  const themeStyle = useThemeStyle();
  const history = useHistory();
  const params = useParams();
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
  const [image, setImage] =  React.useState([]);

  useEffect(() => {
    if (fonts.length === 0){
      getFonts();
    }
    if (Object.keys(portfolio).length === 0 || portfolio._id !== params.id) {
        getPortfolio(params.id);
    }
    if (Object.keys(page).length === 0 || !(page.url === params.pagename || (page.main && params.pagename=== undefined))) {
      getPage(params.id, params.pagename);
    }
    if (Object.keys(portfolio).includes("socialmedia")){
      resetSocialMedia(portfolio.socialmedia);
    }
    if (Object.keys(portfolio).length !== 0 && Object.keys(page).length !== 0 && fonts.length !== 0){
      getTheme(portfolio.theme, fonts, 'portfolio', '');
    }
    if (Object.keys(items).length !== 0 && fonts.length !== 0){
      items.forEach(object => {
        if (object.theme)
        getTheme(object.theme, fonts, 'item', object._id);
      });
    }
  }, [getPortfolio, portfolio, getPage, page, loadUser, isAuthenticated, getFonts, fonts, getTheme]);

  const openCurrPage = () => {
    setCurrPageOpen(!currPageOpen);
  };

  const onImageChanged = (image) => { 
    setImage(image.target.files[0]);
  } 

  const editItemWrapper = (values) => {
    values.item = editID;

    //upload image
    var filename;
    if (image.length !== 0){
      let data = new FormData();
      data.append('file', image);
      var res = api.post('/media', data, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`
        }
      });
      //save the media link and other text user typed in into item
      res.then(function(result) {
        filename = String(result.data);
        var newMediaLink = "http://localhost:5000/api/media/image/"+ String(filename);
        values.mediaLink = newMediaLink;  
        values.mediaType = 'image';
        editItem(values); 
        handleDrawerClose();  
      });
    }
    else {
      editItem(values);
      handleDrawerClose();
    }
    
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
    return ['title', 'subtitle', 'paragraph', 'linkText', 'linkAddress', 'private', 'row', 'column'][index];
  }

  const getItem = (id) => {
    const curr = items.filter(item => item._id === id);
    let item = {};
    ['title', 'subtitle', 'paragraph', 'mediaLink', 'mediaType', 'linkText', 'linkAddress', 'private', 'row', 'column'].forEach(field => {if (curr.length > 0 && Object.keys(curr[0]).includes(field)) item[field] = curr[0][field];});
    return item;
  }


  const shareWrapper = (e, portfolioID) => {
    if(e.key === 'Enter'){
      const input = e.target.value;
      const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const passes = pattern.test(input);
      if (passes){
        sharePortfolio(input, true, portfolioID);
      }
      else{
        alert('Not a valid email');
      }
    }
  }

  const [editTheme, setTheme] = React.useState(false);
  const handleEditTheme = () => {
    setTheme(!editTheme);
  }
  const rowLengths = {};
  const groupedItems = [];
  const items = (Object.keys(page).length !== 0) ? page.items : [];
  items.forEach(element => {
    if ([element.row] in Object.keys(rowLengths)){
      rowLengths[element.row]++;
      groupedItems[element.row].push(element);
    }
    else{
      rowLengths[element.row] = 1;
      groupedItems[element.row] = [element];
    }
  });
  return (
    <Box className={classes.mainContent}>
      {Object.keys(error).length!==0 ?
        <Box className={themeStyle.content}>
        <Typography variant='h3' color='textPrimary'>You are not authorised to edit this portfolio.</Typography>
        </Box> :
        <Box>
          <EditDrawer classes={classes} drawerOpen={drawerOpen} editID={editID} theme={theme} handleEditTheme={handleEditTheme} handleDrawerClose={handleDrawerClose} editTheme={editTheme} portfolio={portfolio} items={items} params={params} openCurrPage={openCurrPage} history={history} currPageOpen={currPageOpen} handleEditPage={handleEditPage} editPageWrapper={editPageWrapper} registerEditPage={registerEditPage} handleDialogOpen={handleDialogOpen} handleCreatePage={handleCreatePage} createPageWrapper={createPageWrapper} registerCreatePage={registerCreatePage} shareWrapper={shareWrapper} handleSocialMedia={handleSocialMedia} socialMediaWrapper={socialMediaWrapper} registerSocialMedia={registerSocialMedia} handleSubmit={handleSubmit} editItemWrapper={editItemWrapper} getField={getField} register={register} onImageChanged={onImageChanged}></EditDrawer>
          <ThemeProvider theme={headerTheme}>
            <CssBaseline/>
            <PortfolioHeader classes={classes} portfolio={portfolio} themeStyle={themeStyle} error={error} drawerOpen={drawerOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen}></PortfolioHeader>
          </ThemeProvider>
          <ThemeProvider theme={muiTheme}>
            <CssBaseline/>
            <Edit classes={classes} drawerOpen={drawerOpen} groupedItems={groupedItems} themeStyle={themeStyle} portfolio={portfolio} rowLengths={rowLengths} history={history} handleDrawerOpen={handleDrawerOpen} handleDialogOpen={handleDialogOpen} addItemWrapper={addItemWrapper} dialogOpen={dialogOpen} toDelete={toDelete} handleDialogClose={handleDialogClose} itemMuiThemes={itemMuiThemes} muiTheme={muiTheme} headerTheme={headerTheme}></Edit>
          </ThemeProvider>
        </Box>
      }
    </Box>
  )
}

const Edit = ({ classes, drawerOpen, groupedItems, themeStyle, portfolio, rowLengths, history, handleDrawerOpen, handleDialogOpen, addItemWrapper, dialogOpen, toDelete, handleDialogClose, itemMuiThemes, muiTheme, headerTheme}) => {
  classes = useStyles();
  const getItemTheme = (itemID) => {
    if (itemMuiThemes.length > 0){
      return itemMuiThemes.find((theme)=>{
        return theme.id === itemID
      });
    }
  }

  return (
    <Box className={classes.items}>
      
      {groupedItems.map((item, i)=> 
        <Grid container
          className={`${classes.gridPadding} ${classes.secondaryColor} ${clsx(classes.content, {
            [classes.contentShift]: drawerOpen,
          })}`}>
            <Box className={classes.row}>
              {item.map((object) => CardTheme(classes, rowLengths, portfolio._id, object, history, handleDrawerOpen, handleDialogOpen, addItemWrapper, getItemTheme(object._id), muiTheme, headerTheme))}
            </Box>
        <Box className={classes.iconButton}> 
          <IconButton
            onClick = {() => addItemWrapper(i, item.length + 1)}
            className={`${classes.textSecondary}`}        
            children={<AddCircleOutlineIcon classes={{root:classes.addIcon}}/>}
            >
          </IconButton>
        </Box>
      </Grid>)}
      
      <Box className={`${classes.gridPadding} ${classes.secondaryColor}`}>
        {Object.keys(portfolio).length > 0 && <IconButton 
          onClick = {() => addItemWrapper(Object.keys(rowLengths).length, 0)}
          children={<AddCircleOutlineIcon classes={{root:classes.addIcon}}/>}
          className={`${classes.addRow} ${classes.textSecondary}`}>
          </IconButton>}
      </Box>
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

const CardTheme = (classes, rowLengths, portfolioID, object, history, handleDrawerOpen, handleDialogOpen, addItemWrapper, customTheme, muiTheme, headerTheme ) => {

  return (
    <Grid item xs={12/rowLengths[object.row]} className={`${classes.gridItem} ${classes.cardPadding} ${classes.secondaryColor}`} key={object._id}>
      <ThemeProvider theme={customTheme ? customTheme.theme : muiTheme}>
        <CssBaseline/>
          <ItemCard classes={classes} rowLengths={rowLengths} portfolioID={portfolioID} object={object} history={history} handleDrawerOpen={handleDrawerOpen} handleDialogOpen={handleDialogOpen} addItemWrapper={addItemWrapper} headerTheme={headerTheme}></ItemCard>
      </ThemeProvider>
    </Grid>
  );
}

const PortfolioHeader = ({classes, portfolio, themeStyle, error, drawerOpen, handleDrawerClose, handleDrawerOpen}) => {
  classes = useStyles();

  return (
    <Box className={clsx(classes.content, {
      [classes.contentShift]: drawerOpen,
    })}>
      <Box className={classes.contentPadding}>
        <Typography variant='h1' color='textPrimary'>{portfolio.name}</Typography>
      </Box>
      <Box className={classes.contentPadding}>
      {Object.keys(portfolio).length > 0 && <IconButton onClick={() => {if(drawerOpen){handleDrawerClose();}else{handleDrawerOpen('')}}}>
          <MenuIcon/>&nbsp;Options
        </IconButton>}
        <div className={classes.socialLinks}>
            {Object.keys(portfolio).includes("socialmedia") && portfolio.socialmedia.facebook !== "" && <Button className={classes.socialMedia} style={{backgroundColor:"#4267B2"}} onClick={() => window.location.href=portfolio.socialmedia.facebook}><Facebook/></Button>}
            {Object.keys(portfolio).includes("socialmedia") && portfolio.socialmedia.instagram !== "" && <Button className={classes.socialMedia} style={{backgroundColor:"#DD2A7B"}} onClick={() => window.location.href=portfolio.socialmedia.instagram}><Instagram/></Button>}
            {Object.keys(portfolio).includes("socialmedia") && portfolio.socialmedia.twitter !== "" && <Button className={classes.socialMedia} style={{backgroundColor:"#1DA1F2"}} onClick={() => window.location.href=portfolio.socialmedia.twitter}><Twitter/></Button>}
            {Object.keys(portfolio).includes("socialmedia") && portfolio.socialmedia.linkedin !== "" && <Button className={classes.socialMedia} style={{backgroundColor:"#2867B2"}} onClick={() => window.location.href=portfolio.socialmedia.linkedin}><LinkedIn/></Button>}
        </div>
      </Box>
    </Box>
    
  );
}

const EditDrawer = ({classes, drawerOpen, editID, theme, handleEditTheme, handleDrawerClose, editTheme, portfolio, items, params, openCurrPage, history, currPageOpen, handleEditPage, editPageWrapper, registerEditPage, handleDialogOpen, handleCreatePage, createPageWrapper, registerCreatePage, shareWrapper, handleSocialMedia, socialMediaWrapper, registerSocialMedia, handleSubmit, editItemWrapper, getField, register, onImageChanged}) => {
  const item = items.find(item=>editID === item._id);
  
  return (
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
        <Typography variant='h4' color='textPrimary' className={classes.drawerTitle}>{editID === '' ? 'Options' : 'Edit'}</Typography>
        <Button
          variant='contained' 
          color='primary'
          classes={{
            label: theme.buttonLabel
          }}
          onClick={handleEditTheme}>
            Theme
        </Button>
        <IconButton onClick={() => handleDrawerClose()}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      {editTheme ? 
      <PortfolioTheme portfolioID={portfolio._id} itemID={editID} item={item}/>
      :
      (editID === '' && Object.keys(portfolio).length !== 0) ?
        (<div>
        <Typography variant='h5' color='textPrimary'>Pages</Typography>
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
        <Typography variant='h5' color='textPrimary'>Privacy</Typography>
        <FormControlLabel
          control={<Checkbox 
            checked={portfolio.private} 
            onChange={(e) => setPrivacy(e.target.checked, portfolio._id)}
            color='primary'/>}
          label='Portfolio is Private'
          labelPlacement = 'start'
          className={classes.checkbox}
        />
        {portfolio.private && 
        <div>
        <Typography variant='subtitle1' color='textPrimary' className={classes.indented}>Share</Typography>
        <TextField
          id='standard'          
          variant='outlined'
          label='email address'
          className={classes.textinput}
          placeholder='Press enter to add'
          onKeyDown={(e) => shareWrapper(e, portfolio._id)}
          InputLabelProps={{className: classes.portfolioNameInputLabel}}>
        </TextField>
        <List>
          {portfolio.allowedUsers.map((object)=>
          <ListItem key={object.email}>
            <ListItemText primary={object.email}></ListItemText>
            <IconButton onClick={() => sharePortfolio(object.email, false, portfolio._id)}><ClearIcon></ClearIcon></IconButton>
          </ListItem>)}
        </List>
        </div>
        }
        <Typography variant='h5' color='textPrimary'>Social Media</Typography>
        <form noValidate autoComplete="off" onSubmit={handleSocialMedia(socialMediaWrapper)}>
          {['facebook', 'instagram', 'twitter', 'linkedin'].map(name => (<TextField className={classes.textinput} label={name} variant="outlined" name={name} key={name} inputRef={registerSocialMedia}/>))}
          <Button variant="outlined" color="primary" className={classes.textinput} type="submit">Save</Button>
        </form>
        </div>)
      :
      (<form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(editItemWrapper)}>
      <List>
        {['Title', 'Subtitle', 'Paragraph',  'Link Text', 'Link Address', 'private', 'row', 'column'].map((text, index) => (
          <TextField key={getField(index)} className={classes.textinput} id='standard-basic' label={text} variant='outlined' name={getField(index)} inputRef={register}/>
        ))}
        <TextField onChange={onImageChanged} className="upload"  type="file" id='standard-basic' label='choose image' variant='outlined'/>  
        <Button variant='outlined' color='primary' className={classes.textinput} type='submit'>Save</Button>
      </List>      
      </form>
      )}
    </Drawer>
  );
}

EditTheme.propTypes = {
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
  addSocialMedia: PropTypes.func.isRequired,
  setPrivacy: PropTypes.func.isRequired,
  sharePortfolio: PropTypes.func.isRequired,
  getTheme: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
  getFonts: PropTypes.func.isRequired,
  fonts: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemMuiThemes: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerTheme: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  page: state.eportfolio.page,
  portfolio: state.eportfolio.portfolio,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.eportfolio.error,
  muiTheme: state.eportfolio.muiTheme,
  fonts: state.googleFonts.fonts,
  itemMuiThemes: state.eportfolio.itemMuiThemes,
  headerTheme: state.eportfolio.headerTheme
});

export default connect(mapStateToProps, {getPage, getPortfolio, editItem, addItem, deleteItem, createPage, editPagename, makeMain, deletePage, loadUser, addSocialMedia, setPrivacy, sharePortfolio, getFonts, getTheme})(EditTheme);
