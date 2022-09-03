/* eslint-disable @typescript-eslint/no-empty-interface */
import '@emotion/react';

export interface AppTheme {
  palette: {
    title: string;
    text: string;
    activeText: string;
    divider: string;
    info: string;
    background: string;
    foreground: string;
    activeBg: string;
    primary: string;
    primaryLight: string;
    success: string;
    successLight: string;
    warning: string;
    warningLight: string;
    danger: string;
    dangerLight: string;
  };
  shadows: {
    card: string;
  };
  components: {
    tooltip: {
      color: string;
      background: string;
    };
  };
}

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
