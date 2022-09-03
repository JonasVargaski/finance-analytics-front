import { ResponsiveBar } from '@nivo/bar';
import { Flex } from '~/components/Flex';

interface IProventsProps {
  data: Array<{
    date: string;
    formatedDate: string;
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
        indexBy='formatedDate'
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
