import React from 'react';
import { Button as MuiButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    textTransform: 'none',
  },
}));

export default function Button(props) {
  const { variant, onClick, ...other } = props;
  const classes = useStyles();

  return <MuiButton onClick={onClick} {...other} />;
}
