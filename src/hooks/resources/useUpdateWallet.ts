import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '~/services/apiClient';
import { queryClient } from '~/services/reactQuery';
import { IWallet } from './useWallets';
import { IWallet as IGetWallet } from './useGetWallet';

export interface IUpdateWalletDTO {
  id: string;
  name: string;
  description: string;
  transactions: {
    id: string;
    fundId: string;
    price: number;
    quotas: number;
    purchaseAt: string;
  }[];
}

type MutationOptions = Omit<UseMutationOptions<void, AxiosError, IUpdateWalletDTO>, 'mutationFn'>;

async function perform(data: IUpdateWalletDTO) {
  const result = await api.put<void>('/wallets', data);
  return result.data;
}

export function useUpdateWallet(
  options: MutationOptions = {},
): UseMutationResult<void, AxiosError, IUpdateWalletDTO> {
  return useMutation(perform, {
    onSuccess(_, variables) {
      queryClient.setQueryData<IWallet[]>(['wallets'], (old) => {
        const idx = old?.findIndex((x) => x.id === variables.id);
        if (old && typeof idx === 'number' && idx !== -1) {
          old[idx].name = variables.name;
          old[idx].description = variables.description;
        }
        return old;
      });

      queryClient.setQueryData<IGetWallet>(['wallets', variables.id], (old) =>
        old ? variables : old,
      );

      queryClient.invalidateQueries(['wallets', variables.id]);
    },
    ...options,
  });
}
