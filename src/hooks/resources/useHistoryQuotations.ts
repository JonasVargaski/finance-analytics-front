import { UseQueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '~/services/apiClient';

interface IQuotation {
  value: number;
  date: Date;
}

export function useHistoryQuotations(
  ticker: string,
  startDate: Date,
  options: UseQueryOptions<IQuotation[], AxiosError> = {},
): UseQueryResult<IQuotation[], AxiosError> {
  return useQuery<IQuotation[], AxiosError>(
    ['history-quotations', ticker],
    async () => {
      const { data } = await api.get<IQuotation[]>('/funds/quotations', {
        params: { ticker, startDate },
      });
      return data;
    },
    options,
  );
}
