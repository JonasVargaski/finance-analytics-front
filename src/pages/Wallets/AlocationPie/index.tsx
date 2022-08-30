import { useTheme } from '@emotion/react';
import { ResponsivePie } from '@nivo/pie';
import { percent } from '~/utils/numberFormat';
import { Container, CustomTip, Indicator } from './styles';

interface IAlocation {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface IAlocationPieProps {
  data: Array<IAlocation>;
}

export function AlocationPie({ data }: IAlocationPieProps) {
  const theme = useTheme();

  return (
    <Container>
      <ResponsivePie
        data={data}
        margin={{ top: 24, bottom: 24 }}
        innerRadius={0.5}
        padAngle={0}
        cornerRadius={1}
        borderWidth={1}
        activeOuterRadiusOffset={1}
        arcLinkLabelsThickness={2}
        arcLabelsSkipAngle={10}
        enableArcLabels={false}
        arcLinkLabelsSkipAngle={5}
        arcLinkLabelsStraightLength={12}
        colors={{ datum: 'data.color' }}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        arcLinkLabelsTextColor={theme.palette.title}
        arcLinkLabelsColor={{ from: 'color' }}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        tooltip={({ datum }) => {
          return (
            <CustomTip>
              <Indicator color={datum.color} />
              {datum.label}: {percent.format(datum.value)}
            </CustomTip>
          );
        }}
      />
    </Container>
  );
}
