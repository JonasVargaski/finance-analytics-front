import { ResponsiveBar } from '@nivo/bar';
import { format, parseISO } from 'date-fns';
import { Flex } from '~/components/Flex';

// const data = [
//   { country: 'AD', fries: 129, friesColor: 'hsl(95, 70%, 50%)' },
//   { country: 'AE', fries: 18, friesColor: 'hsl(5, 70%, 50%)' },
//   { country: 'AF', fries: 187, friesColor: 'hsl(258, 70%, 50%)' },
//   { country: 'AG', fries: 28, friesColor: 'hsl(267, 70%, 50%)' },
//   { country: 'AI', fries: 20, friesColor: 'hsl(201, 70%, 50%)' },
//   { country: 'AL', fries: 90, friesColor: 'hsl(255, 70%, 50%)' },
//   { country: 'AM', fries: 145, friesColor: 'hsl(235, 70%, 50%)' },
// ];

interface IProventsProps {
  data: Array<{
    date: string;
    value: number;
  }>;
}

export function Provents({ data }: IProventsProps) {
  return (
    <Flex m='12px 0 0' style={{ height: 230, maxWidth: '100%', width: '100vw' }}>
      <ResponsiveBar
        data={data.map((x) => ({
          ...x,
          value: x.value.toFixed(2),
        }))}
        keys={['value']}
        indexBy='date'
        padding={0.3}
        margin={{ top: 10, right: 10, bottom: 50, left: 50 }}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -50,
          legendPosition: 'middle',
          legendOffset: 36,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={13}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      />
    </Flex>
  );
}
