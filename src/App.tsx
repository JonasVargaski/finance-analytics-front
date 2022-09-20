import { BrowserRouter } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AppRoutes } from './routes';
import { ThemeProvider } from '~/styles';
import { ReactQueryProvider } from '~/services/reactQuery';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ReactQueryProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <AppRoutes />
          </LocalizationProvider>
        </ReactQueryProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
