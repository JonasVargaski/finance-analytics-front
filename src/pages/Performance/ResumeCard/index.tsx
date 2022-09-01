import { Flex } from '~/components/Flex';
import { NumberFormat } from '~/components/NumberFormat';
import { Tip } from '~/components/Tip';
import { Typography } from '~/components/Typography';
import { Container, Results } from './styles';

interface IResumeCardProps {
  title: string;
  value: number;
  indicatorValue?: boolean;
  percent?: number;
  indicatorPercent?: boolean;
  color: string;
  tip?: string;
}

export function ResumeCard({
  title,
  tip,
  value,
  percent,
  indicatorPercent,
  indicatorValue,
  ...props
}: IResumeCardProps) {
  return (
    <Container {...props}>
      <hr />
      <Flex className='title'>
        <Typography variant='text'>{title}</Typography>
        {tip && <Tip>{tip}</Tip>}
      </Flex>

      <Results>
        {value && (
          <NumberFormat
            className='currency'
            colors
            showIndicator={indicatorValue}
            format='currency'
            value={value}
          />
        )}
        {percent && (
          <NumberFormat
            className='percent'
            colors
            showIndicator={indicatorPercent}
            format='percent'
            value={percent}
          />
        )}
      </Results>
    </Container>
  );
}
