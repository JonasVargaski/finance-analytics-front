import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ReactQueryProvider } from './services/reactQuery';

import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <ReactQueryProvider>
        <AppRoutes />
      </ReactQueryProvider>
    </BrowserRouter>
  );
}
