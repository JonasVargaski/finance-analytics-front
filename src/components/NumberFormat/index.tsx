import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
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
      {showIndicator && value > 0 ? <MdArrowDropUp /> : null}
      {showIndicator && value < 0 ? <MdArrowDropDown /> : null}
      {mapFormatters[format](value)}
    </Container>
  );
}
