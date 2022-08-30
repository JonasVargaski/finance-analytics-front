import { ThemeProvider as EmotionThemeProvider, Global } from '@emotion/react';
import { globalStyles } from './global';
import { lightTheme } from './themes/light';

interface IThemeProviderProps {
  children?: React.ReactNode;
}

export function ThemeProvider({ children }: IThemeProviderProps) {
  return (
    <EmotionThemeProvider theme={lightTheme}>
      <>
        <Global styles={globalStyles} />
        {children}
      </>
    </EmotionThemeProvider>
  );
}
