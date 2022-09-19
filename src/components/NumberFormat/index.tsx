import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';

import { currency, percent } from '~/utils/numberFormat';
import { Container } from './styles';

export interface IFormatNumberProps {
  colors?: boolean;
  value: number;
  format: 'currency' | 'percent';
  className?: string;
  showIndicator?: boolean;
}

type Formatters = {
  [K in IFormatNumberProps['format']]: (value: number) => string;
};

const mapFormatters: Formatters = {
  currency: currency.format,
  percent: percent.format,
};

export function NumberFormat({
  value,
  showIndicator,
  format,
  colors,
  ...props
}: IFormatNumberProps) {
  return (
    <Container className={`format-${format}`} colors={!!colors} isNegative={value < 0} {...props}>
      {showIndicator && value > 0 ? <ArrowDropUp /> : null}
      {showIndicator && value < 0 ? <ArrowDropDown /> : null}
      {mapFormatters[format](value)}
    </Container>
  );
}
