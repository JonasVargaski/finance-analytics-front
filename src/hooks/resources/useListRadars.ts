import { UseQueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '~/services/apiClient';

export interface IRadar {
  id: string;
  fundId: string;
  ticker: string;
  name: string;
  description: string;
}

export function useListRadars(
  options: UseQueryOptions<IRadar[], AxiosError> = {},
): UseQueryResult<IRadar[], AxiosError> {
  return useQuery<IRadar[], AxiosError>(
    ['radars'],
    async () => {
      const { data } = await api.get<IRadar[]>('/radar');
      return data;
    },
    options,
  );
}
