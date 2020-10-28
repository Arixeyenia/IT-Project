import React, { useEffect } from 'react';
import { Typography, Box, List, ListItem, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, FormControl, Button } from '@material-ui/core';
import { useThemeStyle } from '../../styles/themes';
import { useStyles } from './editStyles';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../store';
import { getFonts } from '../../actions/googleFonts';
import { saveTheme } from '../../actions/eportfolio';

import { SketchPicker } from 'react-color';

const PortfolioTheme = ({getFonts, fonts, saveTheme, theme, portfolioID}) => {
    const classes = useStyles();
    const themeStyle = useThemeStyle();

    useEffect(() => {
        if (fonts.length === 0) getFonts();

    }, [fonts, getFonts]);
    const [custom, setCustom] = React.useState(false);
    const handleCustomChange = (event) => {
        setCustom(event.target.checked);
    }

    const [primaryFont, setPrimaryFont] = React.useState({
        family: '',
        variant: ''
    });
    const [secondaryFont, setSecondaryFont] = React.useState({
        family: '',
        variant: ''
    });
    const handlePrimaryFontFamilyChange = (event) => {
        setPrimaryFont({
            ...primaryFont,
            family: event.target.value
        });
    }
    const handlePrimaryFontVariantChange = (event) => {
        setPrimaryFont({
            ...primaryFont,
            variant: event.target.value
        });
    }
    const handleSecondaryFontFamilyChange = (event) => {
        setSecondaryFont({
            ...secondaryFont,
            family: event.target.value
        });
    }
    const handleSecondaryFontVariantChange = (event) => {
        setSecondaryFont({
            ...secondaryFont,
            variant: event.target.value
        });
    }

    const [primaryColor, setPrimaryColor] = React.useState('');
    const handlePrimaryColorChange = (color) => {
        setPrimaryColor(color.hex);
    }
    const [secondaryColor, setSecondaryColor] = React.useState('');
    const handleSecondaryColorChange = (color) => {
        setSecondaryColor(color.hex);
    }

    const checkEmpty = (obj) => {
        for (var key in obj) {
            if (obj[key] !== null && obj[key] != "")
                return false;
        }
        return true;
    }

    if (Object.keys(theme).length !== 0 && (checkEmpty(primaryFont) || checkEmpty(secondaryFont) || primaryColor === '' || secondaryColor === '')){
        setPrimaryFont({
            family: theme.primaryFontFamily,
            variant: theme.primaryFontVariant
        });
        setSecondaryFont({
            family: theme.secondaryFontFamily,
            variant: theme.secondaryFontVariant
        });
        setPrimaryColor(theme.primaryColor);
        setSecondaryColor(theme.secondaryColor);
    }

    const [error, setError] = React.useState('');

    const save = () => {
        if (checkEmpty(primaryFont) || checkEmpty(secondaryFont) || primaryColor === '' || secondaryColor === ''){
            setError('Cannot save with empty field');
            return;
        } else {
            setError('');
            const theme = {
                theme: {
                    primaryFontFamily: primaryFont.family,
                    primaryFontVariant: primaryFont.variant,
                    secondaryFontFamily: secondaryFont.family,
                    secondaryFontVariant: secondaryFont.variant,
                    primaryColor: primaryColor,
                    secondaryColor: secondaryColor,
                },
                portfolio: portfolioID
            }
            saveTheme(theme);
        }
    }

    return (
        <Box>
            <Typography variant='h5'>Theme</Typography>
            <FormControlLabel
                control={<Checkbox checked={custom} onChange={handleCustomChange}/>}
                label="Use a custom theme?"
            />
            {custom ?
            <List>
                <ListItem className={classes.themeItem}>
                    <Typography variant='body1'>Primary Colour</Typography>
                    <SketchPicker
                        color={primaryColor}
                        onChangeComplete={handlePrimaryColorChange}>
                    </SketchPicker>
                </ListItem>
                <ListItem className={classes.themeItem}>
                    <Typography variant='body1'>Secondary Color</Typography>
                    <SketchPicker
                        color={secondaryColor}
                        onChangeComplete={handleSecondaryColorChange}>
                    </SketchPicker>
                </ListItem>
                <ListItem className={classes.themeItem}>
                    <Typography variant='body1'>Headers Font</Typography>
                    <Select
                        defaultValue='Select a font'
                        value={primaryFont.family}
                        onChange={handlePrimaryFontFamilyChange}
                        className={classes.select}>
                        {fonts.map((font) => {
                            return (<MenuItem value={font.family}>{font.family}</MenuItem>);
                        })}
                    </Select>
                </ListItem>
                <ListItem className={classes.themeItem}>
                    <Typography variant='body1'>Style</Typography>
                    <Select
                        defaultValue='Select a style'
                        value={primaryFont.variant}
                        onChange={handlePrimaryFontVariantChange}
                        className={classes.select}>
                        {primaryFont.family && fonts.find(font=>font.family === primaryFont.family).variants.map((variant) => {
                            return (<MenuItem value={variant}>{VariantToStyleString(variant)}</MenuItem>);
                        })}
                    </Select>
                </ListItem>
                <ListItem className={classes.themeItem}>
                    <Typography variant='body1'>Body Font</Typography>
                    <Select
                        defaultValue='Select a font'
                        value={secondaryFont.family}
                        onChange={handleSecondaryFontFamilyChange}
                        className={classes.select}>
                        {fonts.map((font) => {
                            return (<MenuItem value={font.family}>{font.family}</MenuItem>);
                        })}
                    </Select>
                </ListItem>
                <ListItem className={classes.themeItem}>
                    <Typography variant='body1'>Style</Typography>
                    <Select
                    defaultValue='Select a style'
                        value={secondaryFont.variant}
                        onChange={handleSecondaryFontVariantChange}
                        className={classes.select}>
                        {secondaryFont.family && fonts.find(font=>font.family === secondaryFont.family).variants.map((variant) => {
                            return (<MenuItem value={variant}>{VariantToStyleString(variant)}</MenuItem>);
                        })}
                    </Select>
                </ListItem>
            </List> :
            <List>
                <ListItem>
                    {/** Drop down of colour themes we have */}
                </ListItem>
            </List>}
            
            {error.length !== 0 && <Typography variant='body1'></Typography>}
            <Button
                variant='contained' 
                color='primary'
                classes={{
                    label: theme.buttonLabel
                }}
                onClick={save}>
                SAVE
            </Button>
        </Box>
    );
}

const VariantToStyleString = (variant) => {
    switch (variant) {
        case 'regular':
            return 'Regular';
        case '100':
            return 'Thin';
        case '100italic':
            return 'Thin Itallic';
        case '300':
            return 'Light';
        case '300italic':
            return 'Light Itallic';
        case 'itallic':
            return 'Regular Itallic';
        case '500':
            return 'Medium';
        case '500itallic':
            return 'Medium Itallic';
        case '700':
            return 'Bold';
        case '700itallic':
            return 'Bold Itallic';
        case '900':
            return 'Black';
        case '900itallic':
            return 'Black Itallic';
        default: return 'Regular';
    }
}

PortfolioTheme.propTypes = {
    getFonts: PropTypes.func.isRequired,
    fonts: PropTypes.arrayOf(PropTypes.object).isRequired,
    saveTheme: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
};
  
const mapStateToProps = (state) => ({
    fonts: state.googleFonts.fonts,
    theme: state.eportfolio.theme
});
  
export default connect(mapStateToProps, {getFonts, saveTheme})(PortfolioTheme);