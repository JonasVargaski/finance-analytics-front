import { UseQueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '~/services/apiClient';

interface QueryOptions extends UseQueryOptions<IWalletPerformance, AxiosError> {
  id?: string;
}

interface IResumeMonth {
  date: string;
  formatedDate: string;
  value: number;
  amount: number;
  dy: number;
}

interface IWalletPerformance {
  amout: number;
  provents: number;
  proventsPercent: number;
  appreciation: number;
  appreciationPercent: number;
  netProfit: number;
  transactions: Array<{
    id: string;
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
    resume: Array<{
      provents: number;
      appreciation: number;
      percentProvents: number;
      percentAppreciation: number;
      received: boolean;
      date: string;
      proventDate: string;
      quotationDate: string;
    }>;
  }>;
  groupedTransactions: Array<{
    ticker: string;
    currentPrice: number;
    averagePrice: number;
    averagePricePercent: number;
    amount: number;
    amountPercent: number;
    quotas: number;
    provents: number;
    proventsPercent: number;
    transactions: IWalletPerformance['transactions'];
  }>;
  proventsMonth: IResumeMonth[];
  appreciationMonth: IResumeMonth[];
  portfolioComposition: Array<{
    sector: string;
    amount: number;
    amountPercent: number;
    tickers: string[];
  }>;
}

export function useWalletPerformace({ id, ...options }: QueryOptions = {}): UseQueryResult<
  IWalletPerformance,
  AxiosError
> {
  return useQuery<IWalletPerformance, AxiosError>(
    ['wallet-performance', id],
    async () => {
      const { data } = await api.get<IWalletPerformance>(`/wallets/performance?id=${id}`);
      return data;
    },
    options,
  );
}
