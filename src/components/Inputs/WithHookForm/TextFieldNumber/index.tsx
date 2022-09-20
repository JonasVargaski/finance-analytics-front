import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Controller, Control } from 'react-hook-form';
import { NumberFormatCustom } from '../../NumberFormat';

interface ITextFieldNumberFormProps extends Omit<TextFieldProps, 'name' | 'helperText'> {
  name: string;
  defaultValue?: string | number;
  helperText?: string;
  control: Control<any, any>;
}

export function TextFieldNumberForm({
  control,
  name,
  helperText,
  defaultValue,
  ...rest
}: ITextFieldNumberFormProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...rest}
          name={name}
          InputProps={{ inputComponent: NumberFormatCustom as any }}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          helperText={error?.message || helperText}
          error={!!error?.message}
        />
      )}
    />
  );
}
