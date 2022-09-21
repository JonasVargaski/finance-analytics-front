import { UseQueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '~/services/apiClient';

export interface ISearchFunds {
  id: string;
  name: string;
  ticker: string;
  description: string;
}

export function useSearchFunds(
  text?: string,
  options: UseQueryOptions<ISearchFunds[], AxiosError> = {},
): UseQueryResult<ISearchFunds[], AxiosError> {
  return useQuery<ISearchFunds[], AxiosError>(
    ['funds-search', text],
    async () => {
      const { data } = await api.get<ISearchFunds[]>('/funds/search', { params: { text } });
      return data;
    },
    { ...options, enabled: (text?.trim()?.length as number) >= 2 },
  );
}
