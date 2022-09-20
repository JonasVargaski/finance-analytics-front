import { forwardRef } from 'react';
import { NumberFormatBaseProps, NumericFormat } from 'react-number-format';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const NumberFormatCustom = forwardRef<NumberFormatBaseProps, CustomProps>(
  function NumberFormatCustom({ onChange, ...rest }, ref) {
    return (
      <NumericFormat
        {...rest}
        getInputRef={ref}
        onValueChange={(values) => onChange({ target: { name: rest.name, value: values.value } })}
        prefix='R$ '
        allowNegative={false}
        thousandSeparator='.'
        decimalSeparator=','
        decimalScale={2}
      />
    );
  },
);
