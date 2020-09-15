import { createMuiTheme } from '@material-ui/core/styles';
import RobotoMedium from './fonts/Roboto-Medium.woff2';
import RobotoBold from './fonts/Roboto-Bold.woff2';
import RobotoRegular from './fonts/Roboto-Regular.woff2';
import RobotoLight from './fonts/Roboto-Light.woff2';
import RobotoExtraLight from './fonts/Roboto-ExtraLight.woff2';
import SourceSansProRegular from './fonts/SourceSansPro-Regular.woff2';
import SourceSansProLight from './fonts/SourceSansPro-Light.woff2';
import SourceSansProExtraLight from './fonts/SourceSansPro-ExtraLight.woff2';

const robotoMedium = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `
    local('Roboto'),
    local('Roboto-Medium'),
    url(${RobotoMedium}) format('woff2')
  `,
};

const robotoBold = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 700,
  src: `
      local('Roboto'),
      local('Roboto-Bold'),
      url(${RobotoBold}) format('woff2')
    `,
};

const robotoRegular = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
      local('Roboto'),
      local('Roboto-Regular'),
      url(${RobotoRegular}) format('woff2')
    `,
};

const robotoLight = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 300,
  src: `
      local('Roboto'),
      local('Roboto-Light'),
      url(${RobotoLight}) format('woff2')
    `,
};

const robotoExtraLight = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 200,
  src: `
      local('Roboto'),
      local('Roboto-ExtraLight'),
      url(${RobotoExtraLight}) format('woff2')
    `,
};

const sourceSansProRegular = {
  fontFamily: 'SourceSansPro',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
      local('SourceSansPro'),
      local('SourceSansPro-Regular'),
      url(${SourceSansProRegular}) format('woff2')
    `,
};

const sourceSansProLight = {
  fontFamily: 'SourceSansPro',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 300,
  src: `
      local('SourceSansPro'),
      local('SourceSansPro-Light'),
      url(${SourceSansProLight}) format('woff2')
    `,
};

const sourceSansProExtraLight = {
  fontFamily: 'SourceSansPro',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 200,
  src: `
      local('SourceSansPro'),
      local('SourceSansPro-ExtraLight'),
      url(${SourceSansProExtraLight}) format('woff2')
    `,
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#A0C9DB',
      dark: '#7A99A6',
      light: '#C0E7F8',
    },
    secondary: {
      main: '#E9B277',
      dark: '#C0813E',
      light: '#F8D1A8',
    },
  },
  typography: {
    fontFamily: 'Roboto, SourceSansPro, Helvetica, Arial',
    h1: {
      fontFamily: 'Roboto',
      fontWeight: 700,
      fontSize: '3rem',
    },
    h2: {
      fontFamily: 'Roboto',
      fontWeight: 500,
      fontSize: '2.3rem',
    },
    h3: {
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: '2rem',
    },
    h4: {
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: '1.56rem',
    },
    h5: {
      fontFamily: 'Roboto',
      fontWeight: 300,
      fontSize: '1.25rem',
    },
    h6: {
      fontFamily: 'Roboto',
      fontWeight: 200,
      fontSize: '1.125rem',
    },
    subtitle1: {
      fontFamily: 'SourceSansPro',
      fontWeight: 300,
    },
    button: {
      fontFamily: 'SourceSansPro',
      fontWeight: 300,
    },
    body1: {
      fontFamily: 'SourceSansPro',
      fontWeight: 200,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [
          robotoBold,
          robotoMedium,
          sourceSansProRegular,
          sourceSansProLight,
          sourceSansProExtraLight,
        ],
      },
    },
  },
});

export default theme;
