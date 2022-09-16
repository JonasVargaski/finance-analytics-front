import { ThemeProvider as EmotionThemeProvider, Global } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';

import { Chart as ChartJS } from 'chart.js';
import { globalStyles } from './global';
import lightTheme from './themes/light';
import darkTheme from './themes/dark';
import { useLocalStorage } from '~/hooks/useLocalStorage';

interface IThemeProviderProps {
  children?: React.ReactNode;
}

ChartJS.defaults.font.family = 'Montserrat';
ChartJS.defaults.font.weight = '500';

export function ThemeProvider({ children }: IThemeProviderProps) {
  const [current] = useLocalStorage<{ theme: 'light' | 'dark' }>('theme', { theme: 'light' });
  const theme = current.theme === 'light' ? lightTheme : darkTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <EmotionThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        {children}
      </EmotionThemeProvider>
    </MuiThemeProvider>
  );
}
