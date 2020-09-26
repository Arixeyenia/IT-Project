import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Drawer, Grid, Button, CardMedia, TextField, Divider, Box, List, ListItem, Card, CardContent, CardHeader, IconButton, Icon, CardActionArea, CardActions } from '@material-ui/core';
import {getPortfolio, getPage, editItem} from '../../actions/eportfolio';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
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
  unflex: {
    flex: 0,
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
  }
}));

const Edit = ({getPortfolio, portfolio, getPage, page, editItem}) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { handleSubmit, register, reset } = useForm();
  const [open, setOpen] = React.useState(false);
  const [currID, setCurrID] = React.useState('');

  const onSubmit = (values) => {
    values.item = currID;
    editItem(values);
  }

  const handleDrawerOpen = (id) => {
    setCurrID(id);
    setOpen(true);
    reset(getItem(id));
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
  const items = (Object.keys(page).length !== 0) ? page.items : [];
  const rowLengths = {};
  items.forEach(element => {
    if ([element.row] in Object.keys(rowLengths)){
      rowLengths[element.row]++; 
    }
    else{
      rowLengths[element.row] = 1;
    }
  });
  console.log(page);
  
    
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
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <List>
        {['Title', 'Subtitle', 'Paragraph', 'Media Link', 'Media Type', 'Link Text', 'Link Address', "private", "row", "column"].map((text, index) => (
          <TextField key={getField(index)} className={classes.textinput} id="standard-basic" label={text} variant="outlined" name={getField(index)} inputRef={register}/>
        ))}
        <Button variant="outlined" color="primary" className={classes.textinput} type="submit">Save</Button>
      </List>      
      </form>
    </Drawer>
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <Typography variant="h1">{portfolio.name}</Typography>
      <Grid container spacing={3}>
      {items.map((object) => card(classes, rowLengths, portfolio._id, object, history, handleDrawerOpen)
        )}        
      </Grid>
    </main>
  </div>
    </Fragment>
  );
}

const card = (classes, rowLengths, portfolioID, object, history, handleDrawerOpen) => {
  return (
    <Grid item xs={12/rowLengths[object.row]}>
    <Card className={classes.cardRoot} variant="outlined">
      {object.mediaType === "image" && <CardMedia
          className={classes.media}
          image={object.mediaLink}
        />}
       <CardHeader
        classes={{title:classes.titleText, action:classes.unflex}}
        title={object.title}
        action={
          <IconButton aria-label="settings" onClick={() => handleDrawerOpen(object._id)}>
            <EditIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography className={classes.pos} color="textSecondary">
            {object.subtitle}
        </Typography>
        <Typography variant="body2" component="p">
          {object.paragraph}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=> {if(!/^(f|ht)tps?:\/\//i.test(object.linkAddress)){ history.push('/view/' + portfolioID + '/' + object.linkAddress);}else{ window.location.href = object.linkAddress;}window.location.reload(false);}}>{object.linkText}</Button>
      </CardActions>
    </Card>
    </Grid>
  )
}


Edit.propTypes = {
  getPage: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  getPortfolio: PropTypes.func.isRequired,
  portfolio: PropTypes.object.isRequired,
  editItem: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  page: state.eportfolio.page,
  portfolio: state.eportfolio.portfolio
});

export default connect(mapStateToProps, {getPage, getPortfolio, editItem})(Edit);
