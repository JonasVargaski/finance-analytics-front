import { ResponsivePie } from '@nivo/pie';
import { ColorBadge } from '~/components/ColorBadge';
import { Typography } from '~/components/Typography';
import { percent } from '~/utils/numberFormat';
import { Container, CustomTip } from './styles';

interface IAlocationPieProps {
  data: Array<{
    id: string;
    label: string;
    value: number;
    color: string;
  }>;
}

export function AlocationPie({ data }: IAlocationPieProps) {
  return (
    <Container>
      <ResponsivePie
        data={data}
        margin={{ top: 8, bottom: 8 }}
        innerRadius={0.4}
        padAngle={1.5}
        cornerRadius={1}
        borderWidth={1}
        activeOuterRadiusOffset={7}
        enableArcLinkLabels={false}
        arcLabel={(datum) => percent.format(datum.value)}
        colors={{ datum: 'data.color' }}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        theme={{ labels: { text: { fontSize: 9.5 } } }}
        tooltip={({ datum }) => {
          return (
            <CustomTip>
              <ColorBadge color={datum.color} />
              <Typography variant='text'>
                {datum.label}: {percent.format(datum.value)}
              </Typography>
            </CustomTip>
          );
        }}
      />
    </Container>
  );
}
