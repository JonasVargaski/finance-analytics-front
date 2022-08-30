/* eslint-disable @typescript-eslint/no-empty-interface */
import 'react';
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
}

declare module 'react' {
  interface Attributes {
    css?: Interpolation<Theme>;
  }
}

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
