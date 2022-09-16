import { AppTheme } from '~/@types/emotion';

export const darkTheme: AppTheme = {
  palette: {
    title: '#dbdbdb',
    text: '#9b9b9b',
    activeText: '#ffffff',
    divider: '#333',
    info: '#FE6BBA',
    background: '#121212',
    foreground: '#1e1e1e',
    activeBg: '#333',
    primary: '#217EFD',
    primaryLight: 'rgba(33, 126, 253, 0.298039)',
    success: '#19ad05',
    successLight: 'rgba(26, 213, 152, 0.2)',
    warning: '#e98e0e',
    warningLight: 'rgba(255, 181, 54, 0.298039)',
    danger: '#F3654A',
    dangerLight: 'rgba(243, 101, 74, 0.298039)',
  },
  shadows: {
    card: '0px 0px 9px -6px rgb(0, 0, 0, 0.3)',
  },
  components: {
    tooltip: {
      color: '#fcfcfc',
      background: '#616161e6',
    },
    table: {
      stripBg: '#242424',
    },
  },
};
