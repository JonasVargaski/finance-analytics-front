import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from '@mui/material';

import { useCreateRadar } from '~/hooks/resources/useCreateRadar';
import { IFunds } from '~/hooks/resources/useListFunds';

import { Flex } from '~/components/Flex';
import { TickerSelectTextField } from '~/components/Inputs/FundsSelectTextField';
import { Typography } from '~/components/Typography';

interface IAddDialogProps {
  show: boolean;
  onClose: () => void;
}

export function AddDialog({ show, onClose }: IAddDialogProps) {
  const [selected, setSelected] = useState<IFunds | null>(null);
  const createRadar = useCreateRadar();

  function handleClose() {
    setSelected(null);
    onClose();
  }

  function handleSave() {
    createRadar.mutateAsync({ fundId: selected!.id }).then(handleClose);
  }

  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle>Adicionar novo ativo</DialogTitle>
      <DialogContent>
        <Typography variant='description'>
          Tenha acesso simplificado ao Radar de ativos, tudo o que você precisa ter para acompanhar
          seus ativos resumido e compilado para suas análises.
        </Typography>
        <Flex m='12px 0 0'>
          <Typography variant='description'>
            Selecione um ativo da lista para adiciona-lo ao radar.
          </Typography>
        </Flex>

        <Flex m='28px 0 0'>
          <TickerSelectTextField
            fullWidth
            label='Ticker'
            value={selected?.id}
            onChange={(_, option) => setSelected(option)}
          />
        </Flex>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          disabled={!selected?.id || createRadar.isLoading}
          variant='contained'
          onClick={handleSave}
        >
          {createRadar.isLoading ? (
            <Flex g='5px'>
              Salvar... <CircularProgress size={18} />
            </Flex>
          ) : (
            'Salvar'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
