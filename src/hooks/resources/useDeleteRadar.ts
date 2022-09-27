import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '~/services/apiClient';
import { queryClient } from '~/services/reactQuery';
import { IRadar } from './useListRadars';

type MutationOptions = Omit<UseMutationOptions<void, AxiosError, string>, 'mutationFn'>;

async function perform(id: string) {
  await api.delete<void>('/radar', { params: { id } });
}

export function useDeleteRadar(
  options?: MutationOptions,
): UseMutationResult<void, AxiosError, string> {
  return useMutation(perform, {
    onMutate(radarId) {
      queryClient.setQueryData<IRadar[]>(['radars'], (old) => old?.filter((x) => x.id !== radarId));
    },
    ...options,
  });
}
