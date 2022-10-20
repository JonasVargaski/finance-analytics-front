import { UseQueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '~/services/apiClient';

interface QueryOptions extends UseQueryOptions<IAccountInvest[], AxiosError> {
  id?: string;
}

export interface IAccountInvest {
  id: string;
  name: string;
  description: string;
}

export function useAccountsInvest(
  options: QueryOptions = {},
): UseQueryResult<IAccountInvest[], AxiosError> {
  return useQuery<IAccountInvest[], AxiosError>(
    ['accountinvest'],
    async () => {
      const { data } = await api.get<IAccountInvest[]>('/accountinvest/all');
      return data;
    },
    options,
  );
}
