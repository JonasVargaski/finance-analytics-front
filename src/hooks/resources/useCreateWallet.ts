import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '~/services/apiClient';
import { queryClient } from '~/services/reactQuery';

export interface ICreateWalletDTO {
  name: string;
  description: string;
  transactions: {
    fundId: string;
    price: number;
    quotas: number;
    purchaseAt: string;
  }[];
}

type MutationOptions = Omit<UseMutationOptions<void, AxiosError, ICreateWalletDTO>, 'mutationFn'>;

async function perform(data: ICreateWalletDTO) {
  const result = await api.post<void>('/wallets', data);
  return result.data;
}

export function useCreateWallet(
  options: MutationOptions = {},
): UseMutationResult<void, AxiosError, ICreateWalletDTO> {
  return useMutation(perform, {
    ...options,
    onSuccess() {
      queryClient.resetQueries(['wallets']);
    },
  });
}
