import TextField, { TextFieldProps } from '@mui/material/TextField';
import { DesktopDatePicker, DesktopDatePickerProps } from '@mui/x-date-pickers';
import { Controller, Control } from 'react-hook-form';

interface IDesktopDatePickerProps extends Omit<TextFieldProps, 'name' | 'helperText'> {
  name: string;
  label?: string;
  defaultValue?: string | number;
  helperText?: string;
  control: Control<any, any>;
  pickerProps?: Omit<
    DesktopDatePickerProps<TextFieldProps, Date>,
    'label' | 'value' | 'onChange' | 'renderInput'
  >;
  inputProps?: TextFieldProps['inputProps'];
}

export function DesktopDatePickerForm({
  control,
  name,
  helperText,
  defaultValue,
  label,
  pickerProps,
  inputProps,
  ...rest
}: IDesktopDatePickerProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DesktopDatePicker
          label={label}
          inputFormat='dd/MM/yyyy'
          minDate={new Date('2000-01-02')}
          {...pickerProps}
          value={value}
          onChange={onChange}
          renderInput={(params) => (
            <TextField
              {...rest}
              {...params}
              helperText={error?.message || helperText}
              error={!!error?.message}
              inputProps={{ ...params.inputProps, placeholder: '', ...inputProps }}
            />
          )}
        />
      )}
    />
  );
}
