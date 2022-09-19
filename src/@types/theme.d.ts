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
    // status: {
    //   danger: string;
    // };
  }

  interface ThemeOptions {
    // status?: {
    //   danger?: string;
    // };
  }

  export function createTheme(options: ThemeOptions): Theme;
}
