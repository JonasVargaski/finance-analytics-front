import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { TextFieldForm } from '~/components/Inputs/WithHookForm/TextField';

import { Flex } from '~/components/Flex';
import { Typography } from '~/components/Typography';

import { resolver } from './validator';
import { Card } from '~/components/Generic';
import { useGetWallet } from '~/hooks/resources/useGetWallet';
import { Button, CircularProgress, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextFieldNumberForm } from '~/components/Inputs/WithHookForm/TextFieldNumber';
import { TickerSelectTextField } from '~/components/Inputs/FundsSelectTextField';
import { DesktopDatePickerForm } from '~/components/Inputs/WithHookForm/DesktopDatePicker';
import { disableWeekends } from '~/utils/filterWeekends';
import { useCreateWallet } from '~/hooks/resources/useCreateWallet';
import { useUpdateWallet } from '~/hooks/resources/useUpdateWallet';

interface IFormValues {
  id?: string;
  name: string;
  description: string;
  transactions: {
    id: string;
    fundId?: string;
    price?: number | null;
    quotas?: number | null;
    purchaseAt?: string | null;
  }[];
}

export function ManageWallets() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const { data: wallet } = useGetWallet({ id, enabled: !!id, suspense: true });
  const createWallet = useCreateWallet();
  const updateWallet = useUpdateWallet();

  const { handleSubmit, control } = useForm<IFormValues>({
    defaultValues: JSON.parse(
      JSON.stringify(
        wallet ?? {
          name: '',
          description: '',
          transactions: [{ id: uuidv4() }],
        },
      ),
    ),
    resolver,
    reValidateMode: 'onBlur',
  });

  const { fields: transactions, remove, append } = useFieldArray({ control, name: 'transactions' });

  function onSubmit(formValues: any) {
    setLoading(true);
    if (id) {
      updateWallet.mutateAsync(formValues).finally(() => setLoading(false));
    } else {
      createWallet
        .mutateAsync(formValues)
        .then(() => navigate('/wallets'))
        .finally(() => setLoading(false));
    }
  }

  return (
    <>
      <Flex m='8px 0 28px'>
        <Typography variant='pageTitle'>{id ? 'Editar Carteira' : 'Criar Carteira'}</Typography>
      </Flex>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant='cardTitle'>Dados da carteira</Typography>

          <Flex m='22px 0 0'>
            <TextFieldForm label='Nome' name='name' control={control} fullWidth />
          </Flex>

          <Flex m='18px 0 0'>
            <TextFieldForm
              label='Descrição'
              name='description'
              control={control}
              fullWidth
              multiline
              rows={3}
            />
          </Flex>

          <Flex p='18px 0 8px'>
            <Typography variant='text'>Transações</Typography>
          </Flex>

          {transactions.map((transaction, index) => (
            <Flex m='18px 0' key={transaction.id} g='16px' css={{ alignItems: 'flex-start' }}>
              <>
                <Controller
                  name={`transactions.${index}.fundId`}
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TickerSelectTextField
                      css={{ maxWidth: 200 }}
                      fullWidth
                      label='Ticker'
                      value={value}
                      onChange={(_, option) => onChange(option?.id)}
                      error={!!error?.message}
                      helperText={error?.message}
                    />
                  )}
                />

                <TextFieldNumberForm
                  name={`transactions.${index}.quotas`}
                  label='Cotas'
                  control={control}
                  css={{ maxWidth: 100 }}
                  autoComplete='off'
                  inputProps={{
                    prefix: '',
                    suffix: '',
                    maxLength: 10,
                    decimalScale: 0,
                    thousandSeparator: '.',
                  }}
                />

                <TextFieldNumberForm
                  name={`transactions.${index}.price`}
                  label='Preço'
                  control={control}
                  autoComplete='off'
                />

                <DesktopDatePickerForm
                  label='Data compra'
                  name={`transactions.${index}.purchaseAt`}
                  control={control}
                  inputProps={{ readOnly: true }}
                  pickerProps={{ shouldDisableDate: disableWeekends }}
                />

                <DesktopDatePickerForm
                  label='Data venda'
                  name={`transactions.${index}.saleAt`}
                  control={control}
                  inputProps={{ readOnly: true }}
                  pickerProps={{ shouldDisableDate: disableWeekends }}
                />

                <Tooltip placement='top' title='Remover'>
                  <IconButton
                    css={{ marginTop: 8, svg: { fontSize: 20 } }}
                    onClick={() => remove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </>
            </Flex>
          ))}

          <Flex g='18px' p='8px 0 0' fw css={{ justifyContent: 'flex-end' }}>
            <Button
              endIcon={<AddIcon />}
              onClick={() =>
                append({ id: uuidv4(), fundId: '', price: null, purchaseAt: null, quotas: null })
              }
            >
              Adicionar transação
            </Button>
            <Button
              disabled={loading || transactions.length < 1}
              variant='contained'
              onClick={handleSubmit(onSubmit)}
            >
              {loading ? (
                <Flex g='5px'>
                  Salvando... <CircularProgress size={18} />
                </Flex>
              ) : (
                'Salvar'
              )}
            </Button>
          </Flex>
        </form>
      </Card>
    </>
  );
}
