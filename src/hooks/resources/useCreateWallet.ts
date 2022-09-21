import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '~/services/apiClient';

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

interface IReturnData {
  id: string;
}

type MutationOptions = Omit<
  UseMutationOptions<IReturnData, AxiosError, ICreateWalletDTO>,
  'mutationFn'
>;

async function perform(data: ICreateWalletDTO) {
  const result = await api.post<IReturnData>('/wallets', data);
  return result.data;
}

export function useCreateWallet(
  options?: MutationOptions,
): UseMutationResult<IReturnData, AxiosError, ICreateWalletDTO> {
  return useMutation(perform, options);
}
