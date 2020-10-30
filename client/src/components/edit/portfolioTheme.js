import React, { useEffect } from 'react';
import { Typography, Box, List, ListItem, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, FormControl, Button } from '@material-ui/core';
import { useThemeStyle } from '../../styles/themes';
import { useStyles } from './editStyles';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../store';
import { getFonts } from '../../actions/googleFonts';
import { saveItemTheme, saveTheme } from '../../actions/eportfolio';

import { SketchPicker } from 'react-color';

const PortfolioTheme = ({getFonts, fonts, saveTheme, theme, portfolioID, itemID, item, saveItemTheme}) => {
    const classes = useStyles();
    const themeStyle = useThemeStyle();
    const [itemTheme, setItemTheme] = React.useState({});
    if (item && 'theme' in item){
        setItemTheme(item.theme);
    }
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

    const [headerBackgroundColor, setHeaderBackgroundColor] = React.useState('');
    const handleHeaderBackgroundColorChange = (color) => {
        setHeaderBackgroundColor(color.hex);
    }

    const checkEmpty = (obj) => {
        for (var key in obj) {
            if (obj[key] !== null && obj[key] != "")
                return false;
        }
        return true;
    }

    const checkEmptyTheme = (theme) => {
        if (theme && Object.keys(theme).length > 0)
        return (checkEmpty(theme.primaryFontFamily) || checkEmpty(theme.secondaryFontFamily) || checkEmpty(theme.primaryFontVariant) || checkEmpty(theme.secondaryFontVariant) || primaryColor === '' || secondaryColor === '' || headerBackgroundColor === '');
        else {
            return true;
        }
    }

    const checkEmptyVariables = () => {
        return (checkEmpty(primaryFont) || checkEmpty(secondaryFont) || primaryColor === '' || secondaryColor === '' || headerBackgroundColor === '');
    }

    const checkThemeEqualsVariables = (theme) => {
        if (!theme || Object.keys(theme).length === 0){
            return true;
        } 
        return (
            (theme.primaryFontFamily === primaryFont.family) &&
            (theme.primaryFontVariant === primaryFont.variant) &&
            (theme.secondaryFontFamily === secondaryFont.family) &&
            (theme.secondaryFontVariant === secondaryFont.variant) &&
            (theme.primaryColor === primaryColor) &&
            (theme.secondaryColor === secondaryColor) &&
            (theme.headerBackgroundColor === headerBackgroundColor)
        )
    }

    const setVariablesFromTheme = (theme) => {
        if (theme && Object.keys(theme).length > 0){
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
            setHeaderBackgroundColor(theme.headerBackgroundColor);
        }
        else if (!theme || Object.keys(theme).length === 0){
            setPrimaryFont({
                family: '',
                variant: ''
            });
            setSecondaryFont({
                family: '',
                variant: ''
            });
            setPrimaryColor('');
            setSecondaryColor('');
            setHeaderBackgroundColor('');
        }
    }

    if (Object.keys(theme).length !== 0 && checkEmptyVariables()){
        if (itemID === ''){
            setVariablesFromTheme(theme);
        }
    }

    useEffect(() => {
        if (fonts.length === 0) getFonts();
        if (itemID !== '' && !checkEmptyVariables() && checkEmptyTheme(itemTheme)){
            console.log('pls set empty');
            setVariablesFromTheme(null);
        }
        else if (itemID !== '' && !checkThemeEqualsVariables(itemTheme)){
            setVariablesFromTheme(itemTheme);
        }
        else if (itemID === '' && !checkThemeEqualsVariables(theme)){
            setVariablesFromTheme(theme);
        }
    }, [fonts, itemID]);

    const [error, setError] = React.useState('');

    const save = () => {
        if (checkEmptyVariables()){
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
                    headerBackgroundColor: headerBackgroundColor
                },
                id: portfolioID
            }
            if (itemID === ''){
                saveTheme(theme);
                console.log(theme);
            }
            else {
                theme.id = itemID;
                saveItemTheme(theme);
            }
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
                    <Typography variant='body1'>Header Background Color</Typography>
                    <SketchPicker
                        color={headerBackgroundColor}
                        onChangeComplete={handleHeaderBackgroundColorChange}>
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
            return 'Thin Italic';
        case '200':
            return 'Extra Light';
        case '200italic':
            return 'Extra Light Italic';
        case '300':
            return 'Light';
        case '300italic':
            return 'Light Italic';
        case 'italic':
            return 'Regular Italic';
        case '500':
            return 'Medium';
        case '500italic':
            return 'Medium Italic';
        case '600':
            return 'Semi-Bold';
        case '600italic':
            return 'Semi-Bold Italic';
        case '700':
            return 'Bold';
        case '700italic':
            return 'Bold Italic';
        case '800':
            return 'Extra Bold';
        case '800italic':
            return 'Extra Bold Italic';
        case '900':
            return 'Black';
        case '900italic':
            return 'Black Italic';
        default: return 'Regular';
    }
}

PortfolioTheme.propTypes = {
    getFonts: PropTypes.func.isRequired,
    fonts: PropTypes.arrayOf(PropTypes.object).isRequired,
    saveTheme: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    saveItemTheme: PropTypes.func.isRequired
};
  
const mapStateToProps = (state) => ({
    fonts: state.googleFonts.fonts,
    theme: state.eportfolio.theme
});
  
export default connect(mapStateToProps, {getFonts, saveTheme, saveItemTheme})(PortfolioTheme);