import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { Flex } from '~/components/Flex';
import { Typography } from '~/components/Typography';
import { TextFieldForm } from '~/components/Inputs/WithHookForm/TextField';
import { useCreateAccountInvest } from '~/hooks/resources/useCreateAccountInvest';
import { resolver } from './validator';
import { Form } from './styles';

interface IAddDialogProps {
  show: boolean;
  onClose: () => void;
}

interface IformValues {
  name: string;
  description: string;
}

export function AddDialog({ show, onClose }: IAddDialogProps) {
  const createAccount = useCreateAccountInvest();

  const { handleSubmit, control, reset } = useForm<IformValues>({
    defaultValues: { name: '', description: '' },
    resolver,
  });

  function onSubmit(formValues: IformValues) {
    createAccount
      .mutateAsync(formValues)
      .then(() => {
        reset();
        onClose();
      })
      .catch((err) => toast.error(`Erro ao salvar investimento, motivo:\n${err.message}`));
  }

  return (
    <Dialog open={show} onClose={onClose} fullWidth>
      <DialogTitle>Adicionar novo investimento</DialogTitle>
      <DialogContent>
        <Typography variant='description'>
          Preenchar os campos abaixo para identificar a conta de investimentos.
        </Typography>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextFieldForm name='name' label='Nome' fullWidth control={control} />

          <TextFieldForm
            name='description'
            label='Descrição'
            fullWidth
            multiline
            rows={3}
            control={control}
          />
        </Form>
      </DialogContent>

      <DialogActions>
        <Button
          variant='outlined'
          onClick={() => {
            onClose();
            reset();
          }}
        >
          Cancelar
        </Button>
        <Button
          disabled={createAccount.isLoading}
          variant='contained'
          onClick={handleSubmit(onSubmit)}
        >
          {createAccount.isLoading ? (
            <Flex g='5px'>
              Processando... <CircularProgress size={18} />
            </Flex>
          ) : (
            'Salvar'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
