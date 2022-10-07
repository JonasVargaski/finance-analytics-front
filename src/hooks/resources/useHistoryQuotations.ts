import { UseQueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '~/services/apiClient';

interface IQuotation {
  value: number;
  date: string;
}

export type tPeriod = '1D' | '3D' | '5D' | '15D' | '1M' | '3M' | '6M';

export function useHistoryQuotations(
  ticker: string,
  period: tPeriod,
  options: UseQueryOptions<IQuotation[], AxiosError> = {},
): UseQueryResult<IQuotation[], AxiosError> {
  return useQuery<IQuotation[], AxiosError>(
    ['history-quotations', ticker, period],
    async () => {
      const { data } = await api.get<IQuotation[]>('/funds/quotations', {
        params: { ticker, period },
      });
      return data;
    },
    options,
  );
}
