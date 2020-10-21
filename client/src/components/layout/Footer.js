import React from 'react';
import { Box, Typography } from '@material-ui/core';
import logo from '../../images/Quaranteam.png';
import { makeStyles } from '@material-ui/core/styles';
import { useThemeStyle } from '../../styles/themes';

const useStyles = makeStyles((theme) => ({
  logo: {
    margin: 0,
    padding: '10px',
    width: '60%'
  },
  thirds: {
    width: '33.33333%'
  },
  madeby: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '20px'
  },
  content: {
    padding: '60px 10% 50px'
  }
}));
function Footer() {
  const classes = useStyles();
  const theme = useThemeStyle();
  return (
    <Box className={`${classes.content} ${theme.black} ${theme.fontg6}`}>
      <Box className={theme.half}>
        <Box className={classes.thirds}>
          <img src={logo} className={classes.logo} alt='Quaranteam'></img>
        </Box>
        <Box className={classes.thirds}>
          <Typography variant='h6'>
            Members
          </Typography>
          <Typography variant='body1'>
            Ajay Singh
            <br />
            Jerrayl Ng
            <br />
            Ju Wey Tan
            <br />
            Mehmet Koseoglu
            <br />
            Winnie Chen
          </Typography>
        </Box>
        <Box className={classes.thirds}>
          <Typography variant='h6'>Contacts</Typography>
          <Typography variant='body1'>
            ajay@daltavida.com
            <br />
            jerrayln@student.unimelb.edu.au
            <br />
            juweytan@gmail.com
            <br />
            hggm02@gmail.com
            <br />
            biyaoc@student.unimelb.edu.au
            <br />
          </Typography>
        </Box>
      </Box>
      <Box className={classes.madeby}>
        <Typography variant='body1'>This webapp was made for IT Project (COMP30022) in Semester 2, 2020 at the  University of Melbourne</Typography>
      </Box>
    </Box>
  );
}

export default Footer;
