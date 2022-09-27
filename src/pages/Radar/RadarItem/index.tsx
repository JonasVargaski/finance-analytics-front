import { Flex } from '~/components/Flex';
import { Card } from '~/components/Generic';
import { useDeleteRadar } from '~/hooks/resources/useDeleteRadar';

interface IRadarItemProps {
  data: {
    id: string;
    fundId: string;
    ticker: string;
    name: string;
    description: string;
  };
}

export function RadarItem({ data }: IRadarItemProps) {
  const deleteRadar = useDeleteRadar();

  return (
    <Card>
      <Flex m='18px 0'>{JSON.stringify(data, null, 2)}</Flex>
      <button type='button' onClick={() => deleteRadar.mutate(data.id)}>
        Remove
      </button>
    </Card>
  );
}
