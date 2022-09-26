import { forwardRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { Option } from './styles';
import { useListFunds, IFunds } from '~/hooks/resources/useListFunds';

interface CustomProps extends Omit<TextFieldProps, 'onChange'> {
  onChange: (event: React.SyntheticEvent<Element, Event>, value: IFunds | null) => void;
  getValue?: (value: unknown, options?: IFunds[]) => IFunds | null;
}

function DefaultGetValue(value: unknown, options?: IFunds[]) {
  return options?.find((x) => x.id === value) ?? null;
}

export const TickerSelectTextField = forwardRef<TextFieldProps, CustomProps>(
  function TickerSelectTextField(
    { onChange, className, fullWidth, getValue = DefaultGetValue, ...rest },
    ref,
  ) {
    const { data: funds, isFetching } = useListFunds();

    return (
      <Autocomplete
        ref={ref}
        value={getValue(rest.value, funds)}
        id='funds-select'
        className={className}
        fullWidth={fullWidth}
        options={funds || []}
        autoHighlight
        disabled={isFetching}
        loading={isFetching}
        onChange={onChange}
        filterOptions={(options, { inputValue }) =>
          options.filter(
            (item) =>
              item.ticker.toLowerCase().includes(inputValue.toLowerCase()) ||
              item.name.toLowerCase().includes(inputValue.toLowerCase()),
          )
        }
        getOptionLabel={(option) => option.ticker}
        isOptionEqualToValue={(option, value) => option.ticker === value.ticker}
        loadingText='Pesquisando...'
        noOptionsText={'Nenhum ativo encontrado'}
        renderOption={({ className, ...props }, option) => (
          <Option {...props}>
            <b>{option.ticker}</b>
            <p>{option.name}</p>
          </Option>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            {...rest}
            InputProps={{
              ...params.InputProps,
              autoComplete: 'off',
              endAdornment: (
                <>
                  {isFetching ? <CircularProgress color='inherit' size={18} /> : null}
                  {params.InputProps.endAdornment}
                  {rest?.InputProps?.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    );
  },
);
