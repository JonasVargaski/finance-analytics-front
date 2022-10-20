import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '~/services/apiClient';
import { queryClient } from '~/services/reactQuery';
import { IAccountInvest } from './useAccountsInvest';

export interface ICreateAccountInvestDTO {
  name: string;
  description: string;
}

type MutationOptions = Omit<
  UseMutationOptions<IAccountInvest, AxiosError, ICreateAccountInvestDTO>,
  'mutationFn'
>;

async function perform(data: ICreateAccountInvestDTO) {
  const result = await api.post<IAccountInvest>('/accountinvest', data);
  return result.data;
}

export function useCreateAccountInvest(
  options: MutationOptions = {},
): UseMutationResult<IAccountInvest, AxiosError, ICreateAccountInvestDTO> {
  return useMutation(perform, {
    ...options,
    onSuccess(data) {
      queryClient.setQueryData<IAccountInvest[]>(['accountinvest'], (old) => {
        if (Array.isArray(old)) return [...old, data];
        return old;
      });
    },
  });
}
