import React, { Fragment } from 'react';
import { useThemeStyle } from '../../styles/themes';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    paddingLeft: '10px'
  },
  content: {
    paddingTop: '10px'
  },
  leftright: {
    marginTop: '100px'
  },
  image1: {
    position: 'relative',
    top: '-50px',
    maxHeight: '850px'
  },
  image2: {
    paddingLeft: '100px'
  },
  last: {
    textAlign: 'center'
  }
}));

const Contact = () => {
  const theme = useThemeStyle();
  const classes = useStyles();
  
  return (
    <Fragment>

    </Fragment>
  );
};

export default Contact;
