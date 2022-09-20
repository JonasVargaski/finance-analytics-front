import { FormControlLabel, FormControlLabelProps } from '@mui/material';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { Controller, Control } from 'react-hook-form';

interface ISwitchFormProps extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  control: Control<any, any>;
  inputProps?: SwitchProps;
}

export function SwitchForm({ control, name, defaultValue, inputProps, ...rest }: ISwitchFormProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel
          {...rest}
          control={
            <Switch {...inputProps} onChange={(e) => onChange(e.target.checked)} value={value} />
          }
        />
      )}
    />
  );
}
