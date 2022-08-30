import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 2 * 60 * 1000,
      retry(failureCount) {
        return failureCount < 2;
      },
    },
  },
});

interface IReactQueryProviderProps {
  children: React.ReactNode;
}

export function ReactQueryProvider({ children }: IReactQueryProviderProps) {
  const [debug, setDebug] = useState(false);

  useEffect(() => {
    window.reactQueryDebug = () => setDebug((old) => !old);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {debug && <ReactQueryDevtools />}
      {children}
    </QueryClientProvider>
  );
}
