import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button, CircularProgress, FormHelperText, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller, useForm } from 'react-hook-form';
import { api } from '~/services/apiClient';

import { Flex } from '~/components/Flex';
import { Card } from '~/components/Generic';
import { Typography } from '~/components/Typography';

import { DesktopDatePickerForm } from '~/components/Inputs/WithHookForm/DesktopDatePicker';
import { TextFieldNumberForm } from '~/components/Inputs/WithHookForm/TextFieldNumber';
import { SwitchForm } from '~/components/Inputs/WithHookForm/Switch';
import { AssembledTable, Container, InfoHeader, Result } from './styles';
import { resolver } from './validator';
import { TickerSelectTextField } from '~/components/Inputs/FundsSelectTextField';
import { format, parseISO } from 'date-fns';
import { NumberFormat } from '~/components/NumberFormat';
import { GenerateDialog } from './GenerateDialog';
import { ICreateWalletDTO, useCreateWallet } from '~/hooks/resources/useCreateWallet';
import { queryClient } from '~/services/reactQuery';
import { disableWeekends } from '~/utils/filterWeekends';

interface FormValues {
  value: number;
  enablePeriod: boolean;
  startDate?: Date;
  endDate: Date;
  actives: {
    id: string;
    fundId: string;
    ticker: string;
    weight?: number;
  }[];
}

interface IAssembleWallet {
  total: number;
  rest: number;
  quotas: number;
  date: string;
  itens: {
    fundId: string;
    ticker: string;
    quotas: number;
    price: number;
    amount: number;
    quotedAt: string;
  }[];
}

export function AssembleWallet() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [assembled, setAssembled] = useState<IAssembleWallet[]>();

  const createWallet = useCreateWallet({
    onSuccess: () => queryClient.resetQueries(['wallets']),
  });

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    reValidateMode: 'onBlur',
    defaultValues: { actives: [{ id: uuidv4(), ticker: '' }] },
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
    } catch ({ message }) {
      toast.error(`Erro no processamento, motivo:\n${message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateWallet({ name, description }: { name: string; description: string }) {
    const transactions: ICreateWalletDTO['transactions'] = assembled!
      .map((x) => x.itens)
      .flat(2)
      .map((x) => ({
        fundId: x.fundId,
        quotas: x.quotas,
        price: x.price,
        purchaseAt: x.quotedAt,
      }));
    try {
      await createWallet.mutateAsync({ name, description, transactions });
      setShow(false);
    } catch ({ message }) {
      toast.error(`Erro no processamento, motivo:\n${message}`);
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
          <Typography variant='cardTitle'>Simula????o de compra</Typography>

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
                label='Data in??cio'
                name='startDate'
                control={control}
                inputProps={{ readOnly: true }}
                pickerProps={{ shouldDisableDate: disableWeekends }}
              />
            )}

            <DesktopDatePickerForm
              label={enablePeriod ? 'Data cota????o (t??rmino)' : 'Data cota????o'}
              name='endDate'
              control={control}
              defaultValue={new Date()}
              inputProps={{ readOnly: true }}
              pickerProps={{ shouldDisableDate: disableWeekends }}
            />
          </Flex>

          <Flex p='0 0 0 6px'>
            <SwitchForm name='enablePeriod' label='Repetir per??odo' control={control} />
          </Flex>

          <Flex m='24px 0'>
            <Typography variant='text'>Lista de ativos</Typography>
          </Flex>

          {errors.actives?.message && (
            <Flex>
              <FormHelperText error>{errors.actives.message}</FormHelperText>
            </Flex>
          )}

          {actives.map((active, i) => (
            <Flex m='18px 0' key={active.id} g='16px' css={{ alignItems: 'flex-start' }}>
              <Controller
                name={`actives.${i}.fundId`}
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TickerSelectTextField
                    fullWidth
                    css={{ maxWidth: 380 }}
                    label='Ticker'
                    value={value}
                    onChange={(_, option) => {
                      onChange(option?.id);
                      setValue(`actives.${i}.ticker`, option?.ticker || '');
                    }}
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                )}
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

              <Tooltip placement='top' title='Remover'>
                <IconButton
                  css={{ marginTop: 8, svg: { fontSize: 20 } }}
                  onClick={() =>
                    setValue(
                      'actives',
                      actives.filter((x) => x.id !== active.id),
                    )
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Flex>
          ))}

          <Flex g='18px' fw css={{ justifyContent: 'flex-end' }}>
            <Button
              endIcon={<AddIcon />}
              onClick={() =>
                setValue('actives', [...actives, { id: uuidv4(), ticker: '', fundId: '' }])
              }
            >
              Adicionar ativo
            </Button>
            <Button
              disabled={loading || actives.length < 1}
              variant='contained'
              onClick={handleSubmit(onSubmit)}
            >
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

      {!!assembled?.length && (
        <Card>
          <Typography variant='cardTitle'>Resultado</Typography>

          <Result>
            {assembled?.map((item) => (
              <Flex key={item.date} dir='col'>
                <InfoHeader>
                  <tbody>
                    <tr>
                      <td>Data cota????o:</td>
                      <td>{format(parseISO(item.date), 'dd/MM/yyyy')}</td>
                      <td>Valor restante:</td>
                      <td>
                        <NumberFormat format='currency' value={item.rest} />
                      </td>
                    </tr>
                  </tbody>
                </InfoHeader>
                <AssembledTable>
                  <thead>
                    <tr>
                      <th>Ativo</th>
                      <th>Cota????o</th>
                      <th>Quantidade</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.itens.map((assembledItem) => (
                      <tr key={assembledItem.ticker}>
                        <td>{assembledItem.ticker}</td>
                        <td>
                          <NumberFormat format='currency' value={assembledItem.price} />
                        </td>
                        <td>{assembledItem.quotas}</td>
                        <td>
                          <NumberFormat format='currency' value={assembledItem.amount} />
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td>Total:</td>
                      <td></td>
                      <td>{item.quotas}</td>
                      <td>
                        <NumberFormat format='currency' value={item.total} />
                      </td>
                    </tr>
                  </tbody>
                </AssembledTable>
              </Flex>
            ))}
          </Result>

          <Flex m='18px 0 0' css={{ justifyContent: 'flex-end', gap: 16 }}>
            <Button variant='contained' onClick={() => setShow(true)}>
              Salvar carteira
            </Button>
          </Flex>

          <GenerateDialog
            show={show}
            onConfirm={handleCreateWallet}
            onClose={() => setShow(false)}
          />
        </Card>
      )}
    </Container>
  );
}
