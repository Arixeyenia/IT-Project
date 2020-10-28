import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 300;

export const useStyles = makeStyles((theme) => ({
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
    indented: { 
      marginLeft: theme.spacing(2),
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
    themeItem: {
      display: 'block',
    },
    select: {
      minWidth: '80%',
      marginLeft: '10px',
      marginRight: '10px'
    }
  }));