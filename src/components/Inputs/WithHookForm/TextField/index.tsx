import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Controller, Control } from 'react-hook-form';

interface ITextFieldFormProps extends Omit<TextFieldProps, 'name' | 'helperText'> {
  name: string;
  defaultValue?: string | number;
  helperText?: string;
  control: Control<any, any>;
}

export function TextFieldForm({
  control,
  name,
  helperText,
  defaultValue,
  ...rest
}: ITextFieldFormProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...rest}
          onChange={onChange}
          value={value}
          helperText={error?.message || helperText}
          error={!!error?.message}
        />
      )}
    />
  );
}
