import { UseQueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '~/services/apiClient';

interface QueryOptions extends UseQueryOptions<IWallet, AxiosError> {
  id?: string;
}

export interface IWallet {
  id: string;
  name: string;
  description: string;
  transactions: {
    id: string;
    fundId: string;
    price: number;
    quotas: number;
    purchaseAt: string;
  }[];
}

export function useGetWallet({ id, ...options }: QueryOptions = {}): UseQueryResult<
  IWallet,
  AxiosError
> {
  return useQuery<IWallet, AxiosError>(
    ['wallets', id],
    async () => {
      const { data } = await api.get<IWallet>('/wallets', { params: { id } });
      return data;
    },
    options,
  );
}
