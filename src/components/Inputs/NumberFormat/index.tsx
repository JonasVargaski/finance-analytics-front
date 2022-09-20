import { forwardRef } from 'react';
import { NumberFormatBaseProps, NumericFormat } from 'react-number-format';

interface CustomProps {
  onChange: (event: { target: { name: string; value?: number } }) => void;
  name: string;
}

export const NumberFormatCustom = forwardRef<NumberFormatBaseProps, CustomProps>(
  function NumberFormatCustom({ onChange, ...rest }, ref) {
    return (
      <NumericFormat
        getInputRef={ref}
        onValueChange={(values) =>
          onChange({ target: { name: rest.name, value: values.floatValue } })
        }
        prefix='R$ '
        allowNegative={false}
        thousandSeparator='.'
        decimalSeparator=','
        decimalScale={2}
        {...rest}
      />
    );
  },
);
