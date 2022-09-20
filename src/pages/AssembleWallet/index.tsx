import { Button, TextField } from '@mui/material';
import { Flex } from '~/components/Flex';
import { Card } from '~/components/Generic';
import { Typography } from '~/components/Typography';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { NumberFormatCustom } from '~/components/Inputs/NumberFormat';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextFieldForm } from '~/components/Inputs/WithHookForm/TextField';
import { yup } from '~/services/yup';
import { DesktopDatePickerForm } from '~/components/Inputs/WithHookForm/DesktopDatePicker';

const schema = yup.object().shape({
  value: yup.number().min(0).required(),
  date: yup.date().required(),
});

export function AssembleWallet() {
  const { handleSubmit, control } = useForm({
    defaultValues: { textValue: 'sbjsbsdh' },
    resolver: yupResolver(schema),
  });

  function onSubmit(data: any) {
    console.log('formData', data);
  }

  return (
    <>
      <Flex m='8px 0 20px'>
        <Typography variant='pageTitle'>Balancear compra de ativos</Typography>
      </Flex>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex fw css={{ justifyContent: 'space-between' }}>
            <Typography variant='cardTitle'>Lista de ativos</Typography>
            <Flex>
              <Button variant='contained'>Gerar</Button>
            </Flex>
          </Flex>

          <Flex m='30px 0'>
            <TextFieldForm name='value' control={control} label='Valor' />
          </Flex>

          <Flex g='20px' m='24px 0 0'>
            <TextField
              label='Valor total'
              variant='outlined'
              InputProps={{ inputComponent: NumberFormatCustom as any }}
            />

            <DesktopDatePickerForm
              label='Data'
              name='date'
              control={control}
              inputProps={{ readOnly: true }}
            />

            <DesktopDatePicker
              label='Início'
              inputFormat='dd/MM/yyyy'
              value={''}
              onChange={() => null}
              minDate={new Date('2000-01-02')}
              maxDate={new Date()}
              renderInput={(params) => (
                <TextField {...params} inputProps={{ ...params.inputProps, placeholder: '' }} />
              )}
            />

            <DesktopDatePicker
              label='Término'
              inputFormat='dd/MM/yyyy'
              value={''}
              onChange={() => null}
              minDate={new Date('2000-01-02')}
              maxDate={new Date()}
              renderInput={(params) => (
                <TextField {...params} inputProps={{ ...params.inputProps, placeholder: '' }} />
              )}
            />

            <button onClick={handleSubmit(onSubmit)}>OK</button>
          </Flex>
        </form>
      </Card>
    </>
  );
}
