import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
  palette: {
    primary: { main: '#217EFD' },
    secondary: { main: '#FE6BBA' },
    error: { main: '#F3654A' },
    success: { main: '#02da02' },
    warning: { main: '#FFB536' },
    divider: '#e8e8e8',
    background: {
      active: '#F1F5F7',
      default: '#f1f1f1',
      paper: '#fbfbfb',
      striped: '#f4f4f4',
    },
    action: {
      hover: '#F1F5F7',
    },
    text: {
      active: '#06152B',
      primary: '#384455',
      secondary: '#809FB8',
      disabled: '#a3a3a3',
    },
  },
  custom: {
    shadows: ['0px 0px 9px -6px rgb(0, 0, 0, 0.3)'],
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: 'rgba(5,5,5,0.82)',
          padding: '7px 14px',
          fontSize: '0.84rem',
          lineHeight: 1.25,
          borderRadius: 6,
          color: '#ffffff',
        },
      },
    },
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     root: {
    //       ':hover .MuiOutlinedInput-notchedOutline': {
    //         borderColor: '',
    //       },
    //     },
    //     notchedOutline: {
    //       borderColor: '',
    //     },
    //   },
    // },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&:active': {
            color: '#384455',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#F1F5F7',
          },
          '.MuiSvgIcon-root': {
            color: '#809FB8',
          },
        },
      },
    },
  },
});

export default theme;
