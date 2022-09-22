import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '~/services/apiClient';
import { queryClient } from '~/services/reactQuery';
import { IWallet } from './useWallets';

type MutationOptions = Omit<UseMutationOptions<void, AxiosError, string>, 'mutationFn'>;

async function perform(id: string) {
  await api.delete<void>('/wallets', { params: { id } });
}

export function useDeleteWallet(
  options?: MutationOptions,
): UseMutationResult<void, AxiosError, string> {
  return useMutation(perform, {
    onMutate(walletId) {
      queryClient.setQueryData<IWallet[]>(['wallets'], (old) =>
        old?.filter((x) => x.id !== walletId),
      );
    },
    ...options,
  });
}
