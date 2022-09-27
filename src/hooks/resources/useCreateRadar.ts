import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '~/services/apiClient';
import { queryClient } from '~/services/reactQuery';
import { IRadar } from './useListRadars';

export interface ICreateRadarDTO {
  fundId: string;
}

type MutationOptions = Omit<UseMutationOptions<IRadar, AxiosError, ICreateRadarDTO>, 'mutationFn'>;

async function perform(data: ICreateRadarDTO) {
  const result = await api.post<IRadar>('/radar', data);
  return result.data;
}

export function useCreateRadar(
  options: MutationOptions = {},
): UseMutationResult<IRadar, AxiosError, ICreateRadarDTO> {
  return useMutation(perform, {
    ...options,
    onSuccess(data) {
      queryClient.setQueryData<IRadar[]>(['radars'], (old) => {
        if (Array.isArray(old)) return [...old, data];
        return old;
      });
    },
  });
}
