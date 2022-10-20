import { BrowserRouter } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { ThemeProvider } from '~/styles';
import { ReactQueryProvider } from '~/services/reactQuery';

import { AppRoutes } from './routes';
import { ReactHotToasterProvider } from './services/reactHotToast';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ReactHotToasterProvider>
          <ReactQueryProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
              <AppRoutes />
            </LocalizationProvider>
          </ReactQueryProvider>
        </ReactHotToasterProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
