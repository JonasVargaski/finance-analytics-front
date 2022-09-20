import { forwardRef, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { ISearchFunds, useSearchFunds } from '~/hooks/resources/useSearchFunds';
import useDebounce from '~/hooks/useDebounce';

import { Option } from './styles';

interface CustomProps extends Omit<TextFieldProps, 'onChange'> {
  onChange: (event: React.SyntheticEvent<Element, Event>, value: ISearchFunds | null) => void;
}

export const TickerSelectTextField = forwardRef<TextFieldProps, CustomProps>(
  function TickerSelectTextField({ onChange, ...rest }, ref) {
    const [text, setText] = useState('');
    const debounceSearch = useDebounce<string>(text, 300);
    const { data: funds, isFetching } = useSearchFunds(debounceSearch);

    return (
      <Autocomplete
        ref={ref}
        id='funds-select'
        css={{ maxWidth: 300 }}
        fullWidth
        options={funds || []}
        autoHighlight
        loading={isFetching}
        onChange={onChange}
        getOptionLabel={(option) => option.ticker}
        isOptionEqualToValue={(option, value) => option.ticker === value.ticker}
        onInputChange={(_, newInputValue, reason) => {
          if (reason === 'clear') {
            setText('');
            return;
          } else {
            setText(newInputValue);
          }
        }}
        loadingText='Pesquisando...'
        noOptionsText={text.length > 3 ? 'Nenhum ativo encontrado' : 'Digite para pesquisar'}
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
