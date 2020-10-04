import React from 'react';
import { Box, Typography } from '@material-ui/core';
import logo from '../../images/Quaranteam.png';
import { makeStyles } from '@material-ui/core/styles';
import { useThemeStyle } from '../../styles/themes';

const useStyles = makeStyles((theme) => ({
  logo: {
    margin: 0,
    width: '25%',
    padding: '10px'
  }
}));
function Footer() {
  const classes = useStyles();
  const theme = useThemeStyle();
  return (
    <Box className={`${theme.content} ${theme.gray2} ${theme.fontg6}`}>
      <Box><img src={logo} className={classes.logo} alt='Quaranteam'></img></Box>
      <Box className={theme.half}>
        <Box className={theme.leftright}>
          <Typography variant='body1'>Proudly made by Quaranteam</Typography>
          <Typography variant='body1'>
            COMP30022 IT Project 2020 Semester 2
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
        <Box className={theme.leftright}>
          <Typography variant='body1'>Our Contacts</Typography>
          <br />
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
    </Box>
  );
}

export default Footer;
