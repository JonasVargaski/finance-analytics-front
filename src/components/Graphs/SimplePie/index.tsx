import { PieSvgProps, ResponsivePie } from '@nivo/pie';
import { ColorBadge } from '~/components/ColorBadge';
import { Typography } from '~/components/Typography';
import { CustomTip } from './styles';

interface IDatum {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  color: string;
}

interface ISimplePieProps extends Omit<PieSvgProps<IDatum>, 'width' | 'height'> {
  data: Array<IDatum>;
}

export function SimplePie({ data, ...props }: ISimplePieProps) {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 10, bottom: 6 }}
      innerRadius={0.4}
      padAngle={1.5}
      cornerRadius={1}
      borderWidth={1}
      activeOuterRadiusOffset={5}
      enableArcLinkLabels={false}
      enableArcLabels={false}
      colors={{ datum: 'data.color' }}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      tooltip={({ datum }) => (
        <CustomTip>
          <ColorBadge color={datum.color} />
          <Typography variant='text'>
            {datum.label}: {datum.data.formattedValue}
          </Typography>
        </CustomTip>
      )}
      {...props}
    />
  );
}
