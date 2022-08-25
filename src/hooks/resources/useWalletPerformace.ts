import { UseQueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '~/services/apiClient';

interface QueryOptions extends UseQueryOptions<IResultData[], AxiosError> {
  id?: string;
}

interface IResultData {
  ticker: string;
  price: number;
  quotas: number;
  date: string;
  amount: number;
  currentPrice: number;
  netProfit: number;
  netProfitPercent: number;
  provents: number;
  percentProvents: number;
  appreciation: number;
  percentAppreciation: number;
  resume: {
    provents: number;
    appreciation: number;
    percentProvents: number;
    percentAppreciation: number;
    date: string;
    proventDate: string;
    quotationDate: string;
  }[];
}

export function useWalletPerformace({ id, ...options }: QueryOptions = {}): UseQueryResult<
  IResultData[],
  AxiosError
> {
  return useQuery<IResultData[], AxiosError>(
    ['wallet-performance', id],
    async () => {
      const { data } = await api.get<IResultData[]>(`/wallet/performance/${id}`);
      return data;
    },
    options,
  );
}
