import { createTheme } from '@mui/material/styles';

// const app: AppTheme = {
//   palette: {
//     title: '#dbdbdb',
//     text: '#9b9b9b',
//     activeText: '#ffffff',
//     divider: '#333',
//     info: '#FE6BBA',
//     background: '#121212',
//     foreground: '#1e1e1e',
//     activeBg: '#333',
//     primary: '#217EFD',
//     primaryLight: 'rgba(33, 126, 253, 0.298039)',
//     success: '#19ad05',
//     successLight: 'rgba(26, 213, 152, 0.2)',
//     warning: '#e98e0e',
//     warningLight: 'rgba(255, 181, 54, 0.298039)',
//     danger: '#F3654A',
//     dangerLight: 'rgba(243, 101, 74, 0.298039)',
//   },
//   shadows: {
//     card: '0px 0px 9px -6px rgb(0, 0, 0, 0.3)',
//   },
//   components: {
//     tooltip: {
//       color: '#fcfcfc',
//       background: '#616161e6',
//     },
//     table: {
//       stripBg: '#242424',
//     },
//   },
// };

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
  palette: {
    primary: { main: '#217EFD' },
    secondary: { main: '#FE6BBA' },
    error: { main: '#F3654A' },
    success: { main: '#19ad05' },
    warning: { main: '#e98e0e' },
    divider: '#333',
    background: {
      active: '#333',
      default: '#121212',
      paper: '#1e1e1e',
    },
    action: {
      hover: '#292929',
    },
    text: {
      disabled: '#a3a3a3',
      secondary: '#9b9b9b',
      primary: '#dbdbdb',
      active: '#ffffff',
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: 'rgba(0,0,0,0.92)',
          padding: '7px 16px',
          fontSize: '0.78rem',
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
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#dbdbdb',
        },
      },
    },
  },
});

export default theme;
