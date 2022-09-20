import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { Button, CircularProgress, FormHelperText, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import { api } from '~/services/apiClient';

import { Flex } from '~/components/Flex';
import { Card } from '~/components/Generic';
import { Typography } from '~/components/Typography';

import { DesktopDatePickerForm } from '~/components/Inputs/WithHookForm/DesktopDatePicker';
import { TextFieldNumberForm } from '~/components/Inputs/WithHookForm/TextFieldNumber';
import { SwitchForm } from '~/components/Inputs/WithHookForm/Switch';
import { TextFieldForm } from '~/components/Inputs/WithHookForm/TextField';
import { Container } from './styles';
import { resolver } from './validator';

interface FormValues {
  value: number;
  enablePeriod: boolean;
  startDate?: Date;
  endDate: Date;
  actives: {
    id: string;
    ticker: string;
    weight?: number;
  }[];
}

interface IAssembleWallet {
  total: number;
  rest: number;
  quotas: number;
  date: Date;
  itens: {
    ticker: string;
    quotas: number;
    price: number;
    amount: number;
    quotedAt: Date;
  }[];
}

export function AssembleWallet() {
  const [loading, setLoading] = useState(false);
  const [assembled, setAssembled] = useState<IAssembleWallet[]>();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { actives: [] },
    resolver,
  });

  async function onSubmit(formValues: FormValues) {
    setLoading(true);
    try {
      const { data } = await api.post<IAssembleWallet[]>('/wallets/assemble', {
        ...formValues,
        startDate: formValues?.startDate || formValues.endDate,
      });
      setAssembled(data);
    } catch (error) {
      //toast
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const [enablePeriod, actives] = watch(['enablePeriod', 'actives']);

  return (
    <Container>
      <Flex m='8px 0 0'>
        <Typography variant='pageTitle'>Balancear compra de ativos</Typography>
      </Flex>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant='cardTitle'>Simulação de compra</Typography>

          <Flex g='24px' m='24px 0 12px'>
            <TextFieldNumberForm
              fullWidth
              css={{ maxWidth: 380 }}
              name='value'
              label='Valor'
              control={control}
              autoComplete='off'
            />

            {enablePeriod && (
              <DesktopDatePickerForm
                label='Data início'
                name='startDate'
                control={control}
                inputProps={{ readOnly: true }}
              />
            )}

            <DesktopDatePickerForm
              label={enablePeriod ? 'Data cotação (término)' : 'Data cotação'}
              name='endDate'
              control={control}
              defaultValue={new Date()}
              inputProps={{ readOnly: true }}
            />
          </Flex>

          <Flex p='0 0 0 6px'>
            <SwitchForm name='enablePeriod' label='Repetir período' control={control} />
          </Flex>

          <Flex m='24px 0' css={{ justifyContent: 'space-between' }}>
            <Typography variant='text'>Lista de ativos</Typography>

            <Tooltip placement='top' title='Adicionar ativo'>
              <IconButton
                onClick={() => {
                  setError('actives', { message: undefined });
                  setValue('actives', [...actives, { id: uuidv4(), ticker: '' }]);
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Flex>

          {errors.actives?.message && (
            <Flex>
              <FormHelperText error>{errors.actives.message}</FormHelperText>
            </Flex>
          )}

          {actives.map((active, i) => (
            <Flex m='18px 0' key={active.id} g='20px'>
              <TextFieldForm
                name={`actives.${i}.ticker`}
                label='Ticker'
                control={control}
                autoComplete='off'
              />

              <TextFieldNumberForm
                name={`actives.${i}.weight`}
                label='Peso'
                control={control}
                autoComplete='off'
                inputProps={{
                  prefix: '',
                  suffix: '%',
                  maxLength: 6,
                  decimalSeparator: '.',
                  thousandSeparator: false,
                }}
              />
            </Flex>
          ))}

          <Flex fw css={{ justifyContent: 'flex-end' }}>
            <Button disabled={loading} variant='contained' onClick={handleSubmit(onSubmit)}>
              {loading ? (
                <Flex g='5px'>
                  Processando... <CircularProgress size={18} />
                </Flex>
              ) : (
                'Processar'
              )}
            </Button>
          </Flex>
        </form>
      </Card>

      <Card>
        <Typography variant='cardTitle'>Resultados</Typography>
        {JSON.stringify(assembled, null, 2)}
      </Card>
    </Container>
  );
}
