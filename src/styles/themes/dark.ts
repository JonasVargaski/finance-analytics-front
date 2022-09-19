import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
  palette: {
    primary: { main: '#217EFD' },
    secondary: { main: '#FE6BBA' },
    error: { main: '#e92a2d' },
    success: { main: '#19ad05' },
    warning: { main: '#e98e0e' },
    divider: '#333',
    background: {
      active: '#333',
      default: '#121212',
      paper: '#1e1e1e',
      striped: '#242424',
    },
    action: {
      hover: '#292929',
    },
    text: {
      active: '#ffffff',
      primary: '#dbdbdb',
      secondary: '#9b9b9b',
      disabled: '#a3a3a3',
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: 'rgba(0,0,0,0.92)',
          padding: '7px 14px',
          fontSize: '0.84rem',
          lineHeight: 1.25,
          borderRadius: 6,
          color: '#ffffff',
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&:active': {
            color: '#dbdbdb',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#333',
          },
          '.MuiSvgIcon-root': {
            color: '#9b9b9b',
          },
        },
      },
    },
  },
});

export default theme;
