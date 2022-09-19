/* eslint-disable @typescript-eslint/no-empty-interface */
import '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
  interface TypeText {
    active: string;
  }

  interface TypeBackground {
    active: string;
    striped: string;
  }

  // interface Palette {
  //   brown: PaletteColor;
  // }

  // interface PaletteOptions {
  //   brown: PaletteColorOptions;
  // }
}

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      shadows: [string];
    };
  }

  interface ThemeOptions {
    custom: {
      shadows: [string];
    };
  }

  export function createTheme(options: ThemeOptions): Theme;
}
