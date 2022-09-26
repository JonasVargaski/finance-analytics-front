import { UseQueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '~/services/apiClient';

export interface IFunds {
  id: string;
  name: string;
  ticker: string;
  description: string;
}

export function useListFunds(
  options: UseQueryOptions<IFunds[], AxiosError> = {},
): UseQueryResult<IFunds[], AxiosError> {
  return useQuery<IFunds[], AxiosError>(
    ['funds'],
    async () => {
      const { data } = await api.get<IFunds[]>('/funds');
      return data;
    },
    options,
  );
}
