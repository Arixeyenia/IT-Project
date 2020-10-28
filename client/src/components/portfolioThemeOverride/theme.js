import { createMuiTheme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const EditCustomTheme = (getFonts, fonts) => {
    const fonts = 
    customTheme = createMuiTheme({

    });
}

export const customTheme = createMuiTheme({
    
});

EditCustomTheme.propTypes = {
    getFonts: PropTypes.func.isRequired,
    fonts: PropTypes.arrayOf(PropTypes.object).isRequired
};
  
const mapStateToProps = (state) => ({
    fonts: state.googleFonts.fonts
});

export default connect(mapStateToProps, {})(EditCustomTheme);
  