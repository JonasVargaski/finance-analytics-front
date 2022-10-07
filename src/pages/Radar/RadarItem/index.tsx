import { Flex } from '~/components/Flex';
import { Card } from '~/components/Generic';
import { Typography } from '~/components/Typography';
import { useDeleteRadar } from '~/hooks/resources/useDeleteRadar';
import { useHistoryQuotations } from '~/hooks/resources/useHistoryQuotations';
import { HistoryQuotation } from './HistoryQuotation';

interface IRadarItemProps {
  item: {
    id: string;
    fundId: string;
    ticker: string;
    name: string;
    description: string;
  };
}

export function RadarItem({ item }: IRadarItemProps) {
  const deleteRadar = useDeleteRadar();
  const { data: quotations } = useHistoryQuotations(item?.ticker, '1D', {
    refetchInterval: 1000 * 60 * 15,
    cacheTime: 1000 * 60 * 15,
  });

  console.log({ quotations });

  return (
    <Card>
      <Flex>
        <Typography variant='cardTitle'>{item.ticker}</Typography>
        <Typography css={{ fontSize: 11, marginLeft: 6 }} variant='description'>
          {item.name}
        </Typography>
      </Flex>

      <Flex m='18px 0' dir='col'>
        <Typography variant='text'>Histórico de cotação</Typography>
        <HistoryQuotation data={quotations ?? []} />
      </Flex>

      <Flex m='60px 0 0'>
        <pre>{JSON.stringify(item, null, 2)}</pre>
      </Flex>
      <button type='button' onClick={() => deleteRadar.mutate(item.id)}>
        Remove
      </button>
    </Card>
  );
}
