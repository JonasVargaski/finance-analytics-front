import { ThemeProvider as EmotionThemeProvider, Global } from '@emotion/react';
import { Chart as ChartJS } from 'chart.js';
import { globalStyles } from './global';
import { lightTheme } from './themes/light';
import { darkTheme } from './themes/dark';
import { useLocalStorage } from '~/hooks/useLocalStorage';

interface IThemeProviderProps {
  children?: React.ReactNode;
}

ChartJS.defaults.font.family = 'Montserrat';
ChartJS.defaults.font.weight = '500';

export function ThemeProvider({ children }: IThemeProviderProps) {
  const [current] = useLocalStorage<{ theme: 'light' | 'dark' }>('theme', { theme: 'light' });

  return (
    <EmotionThemeProvider theme={current.theme === 'light' ? lightTheme : darkTheme}>
      <>
        <Global styles={globalStyles} />
        {children}
      </>
    </EmotionThemeProvider>
  );
}
