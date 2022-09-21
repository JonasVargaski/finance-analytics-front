import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Flex } from '~/components/Flex';
import { TextFieldForm } from '~/components/Inputs/WithHookForm/TextField';
import { Form } from './styles';

import { resolver } from './validator';

interface IGenerateDialogProps {
  children?: React.ReactNode;
  show: boolean;
  onClose: () => void;
  onConfirm: (data: IFormValues) => Promise<void>;
}

interface IFormValues {
  name: string;
  description: string;
}

export function GenerateDialog({ show, onConfirm, onClose }: IGenerateDialogProps) {
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control, reset } = useForm<IFormValues>({
    defaultValues: { name: '', description: '' },
    resolver,
  });

  function onSubmit(formValues: IFormValues) {
    setLoading(true);
    onConfirm(formValues)
      .then(() => reset())
      .finally(() => setLoading(false));
  }

  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle>Salvar como carteira</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Gere uma nova carteria com os dados das cotações para avaliar a performace.
        </DialogContentText>
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
        <Button disabled={loading} variant='contained' onClick={handleSubmit(onSubmit)}>
          {loading ? (
            <Flex g='5px'>
              Processando... <CircularProgress size={18} />
            </Flex>
          ) : (
            'Gerar'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
