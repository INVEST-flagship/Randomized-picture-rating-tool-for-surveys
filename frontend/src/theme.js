import { createMuiTheme } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

const breakpoints = createBreakpoints({});

const theme = createMuiTheme({
  palette: {
    primary: {
      extraLight: '#9196da',
      light: '#5c62b1',
      main: '#2a3881',
      dark: '#001354',
      contrastText: '#fff',
    },
    secondary: {
      light: '#49a278',
      main: '#0d734c',
      dark: '#095639',
      contrastText: '#fff',
    },
    background: {
      paper: '#fff',
      default: '#a0b8bf',
      greener: '#caeddf',
    },
    alert: {
      light: '#f0584a',
      main: '#b82221',
      dark: '#800000',
    },
    // custom colors
    darkGray: {
      main: '#3b443b',
      contrastText: '#000',
    },
  },
  typography: {
    h1: {
      fontSize: '2.2rem',
      marginBottom: '2rem',
      fontWeight: '500',
      color: '#2a3881', // palette.primary.main
      [breakpoints.down('sm')]: {
        fontSize: '1.8rem',
        overflowWrap: 'break-word',
      },
    },
    h2: {
      fontSize: '2rem',
      marginBottom: '1rem',
      fontWeight: '500',
      [breakpoints.down('sm')]: {
        fontSize: '1.6rem',
        overflowWrap: 'break-word',
      },
    },
    h3: {
      fontSize: '1.6rem',
      marginBottom: '0.8rem',
      fontWeight: '500',
      [breakpoints.down('sm')]: {
        fontSize: '1.4rem',
        overflowWrap: 'break-word',
      },
    },
    h4: {
      fontSize: '1.5rem',
      marginBottom: '0.75rem',
      fontWeight: '500',
      [breakpoints.down('sm')]: {
        fontSize: '1.3rem',
        overflowWrap: 'break-word',
      },
    },
    h5: {
      fontSize: '1.4rem',
      marginBottom: '0.7rem',
      fontWeight: '500',
      color: '#3b443b', // palette.darkGray.main
      [breakpoints.down('sm')]: {
        fontSize: '1.2rem',
        overflowWrap: 'break-word',
      },
    },
    h6: {
      fontSize: '1.2rem',
      marginBottom: '0.6rem',
      fontWeight: '500',
      color: '#3b443b', // palette.darkGray.main
      [breakpoints.down('sm')]: {
        fontSize: '1.1rem',
        overflowWrap: 'break-word',
      },
    },
  },
  drawerWidth: 260,
  overrides: {
    // Stepper icons (idea timeline)
    MuiStepIcon: {
      root: {
        '&$active': {
          color: '#2a3881', // palette.primary.main(?)
        },
        '&$completed': {
          color: '#0e7f00', // palette.secondary.main(?)
        },
        '&$error': {
          color: '#912D40', // palette.state.terminated(?)
        },
      },
    },
    // Stepper icons end
  },
});

export default theme;
