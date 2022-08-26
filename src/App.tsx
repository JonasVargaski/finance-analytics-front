import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ThemeProvider } from '~/styles';
import { ReactQueryProvider } from '~/services/reactQuery';

import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <ReactQueryProvider>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </ReactQueryProvider>
    </BrowserRouter>
  );
}
