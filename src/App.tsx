import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ThemeProvider } from '~/styles';
import { ReactQueryProvider } from '~/services/reactQuery';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ReactQueryProvider>
          <AppRoutes />
        </ReactQueryProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
