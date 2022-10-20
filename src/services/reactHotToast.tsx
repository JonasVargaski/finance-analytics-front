import { Toaster } from 'react-hot-toast';
import { useTheme } from '@mui/material';

interface IReactHotToasterProviderProps {
  children?: React.ReactNode;
}

export function ReactHotToasterProvider({ children }: IReactHotToasterProviderProps) {
  const theme = useTheme();

  return (
    <>
      <Toaster
        position='bottom-left'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 3500,
          style: {
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
          error: {
            duration: 6000,
            style: {
              color: theme.palette.error.main,
              padding: 8,
              marginTop: 7,
            },
          },
        }}
      />
      {children}
    </>
  );
}
