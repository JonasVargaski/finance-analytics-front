import { AppTheme } from '~/@types/emotion';

export const lightTheme: AppTheme = {
  palette: {
    title: '#06152B',
    text: '#809FB8',
    activeText: '#384455',
    divider: '#e8e8e8',
    info: '#FE6BBA',
    background: '#f1f1f1',
    foreground: '#fbfbfb',
    activeBg: '#F1F5F7',
    primary: '#217EFD',
    primaryLight: 'rgba(33, 126, 253, 0.298039)',
    success: '#02da02',
    successLight: 'rgba(26, 213, 152, 0.2)',
    warning: '#FFB536',
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
      stripBg: '#f4f4f4',
    },
  },
};
