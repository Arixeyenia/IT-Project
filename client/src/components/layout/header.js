import React from 'react';
import { Button, Box } from '@material-ui/core';

class Header extends React.Component{
    render(){
        return (
            <Box className="header gray4">
                Logo here
                <Button variant="contained" color="primary" onClick={this.clickLogin}>Log In</Button>
            </Box>
        );
    }

    clickLogin(){
        // Open login popup
    }
}

export default Header;