import { UseQueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '~/services/apiClient';

interface QueryOptions extends UseQueryOptions<IWalletPerformance, AxiosError> {
  id?: string;
}

interface IWalletPerformance {
  amout: number;
  provents: number;
  proventsPercent: number;
  appreciation: number;
  appreciationPercent: number;
  netProfit: number;
  transactions: Array<{
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
      received: boolean;
      date: string;
      proventDate: string;
      quotationDate: string;
    }[];
  }>;
  proventsMonth: Array<{
    date: string;
    value: number;
  }>;
}

export function useWalletPerformace2({ id, ...options }: QueryOptions = {}): UseQueryResult<
  IWalletPerformance,
  AxiosError
> {
  return useQuery<IWalletPerformance, AxiosError>(
    ['wallet-performance-2', id],
    async () => {
      const { data } = await api.get<IWalletPerformance>(`/wallet/performance2?id=${id}`);
      return data;
    },
    options,
  );
}
