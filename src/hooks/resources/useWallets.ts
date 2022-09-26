import { UseQueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '~/services/apiClient';

interface QueryOptions extends UseQueryOptions<IWallet[], AxiosError> {
  id?: string;
}

export interface IWallet {
  id: string;
  name: string;
  description: string;
}

export function useWallets(options: QueryOptions = {}): UseQueryResult<IWallet[], AxiosError> {
  return useQuery<IWallet[], AxiosError>(
    ['wallets'],
    async () => {
      const { data } = await api.get<IWallet[]>('/wallets/all');
      return data;
    },
    options,
  );
}
