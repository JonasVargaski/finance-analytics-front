import { Flex } from '~/components/Flex';
import { SimplePie } from '~/components/Graphs/SimplePie';
import { Column } from '~/components/Grid';
import { Typography } from '~/components/Typography';

interface IAlocationActivesProps {
  data: Array<{
    date: string;
    value: number;
  }>;
}

export function AlocationActives({ data }: IAlocationActivesProps) {
  return (
    <>
      <Typography variant='cardTitle'>Alocação por setor</Typography>
      <Flex m='12px 0 0'>
        <Column sm='5' style={{ height: 180 }}>
          <SimplePie
            colors={{ scheme: 'nivo' }}
            data={
              data.map((item, i) => ({
                id: i.toString(),
                label: item.date,
                value: item.value,
                color: '',
                formattedValue: item.value.toString(),
              })) ?? []
            }
          />
        </Column>
      </Flex>
    </>
  );
}
