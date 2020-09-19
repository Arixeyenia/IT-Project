import React from 'react';
import { Box, Typography } from '@material-ui/core';

function Footer() {
  return (
    <Box className='footer gray2 fontg6'>
      <Box><Typography variant='h3'>Quaranteam</Typography></Box>
      <Box className='content half'>
        <Box className='left'>
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
        <Box className='right'>
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
