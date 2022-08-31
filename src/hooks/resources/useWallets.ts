import { UseQueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '~/services/apiClient';

interface QueryOptions extends UseQueryOptions<IWallet[], AxiosError> {
  id?: string;
}

interface IWallet {
  id: string;
  name: string;
  description: string;
  amount: number;
  items: {
    id: string;
    ticker: string;
    color: string;
    quotas: number;
    price: number;
    percent: number;
    tradingDate: string;
  }[];
}

export function useWallets(options: QueryOptions = {}): UseQueryResult<IWallet[], AxiosError> {
  return useQuery<IWallet[], AxiosError>(
    ['wallets'],
    async () => {
      const { data } = await api.get<IWallet[]>('/wallet');
      return data;
    },
    options,
  );
}
