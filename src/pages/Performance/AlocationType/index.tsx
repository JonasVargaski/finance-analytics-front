import { Flex } from '~/components/Flex';
import { Column } from '~/components/Grid';
import { SimplePie } from '~/components/Graphs/SimplePie';
import { TableInfo } from './styles';
import { ColorBadge } from '~/components/ColorBadge';
import { currency, percent } from '~/utils/numberFormat';
import { NumberFormat } from '~/components/NumberFormat';

interface IAlocationTypeProps {
  data: Array<{
    sector: string;
    amount: number;
    amountPercent: number;
  }>;
}

export function AlocationType({ data }: IAlocationTypeProps) {
  return (
    <Flex m='12px 0 0'>
      <Column sm='5' style={{ height: 160 }}>
        <SimplePie
          colors={{ scheme: 'nivo' }}
          data={data.map((item) => ({
            id: item.sector,
            label: item.sector,
            value: item.amount,
            color: '',
            formattedValue: percent.format(item.amountPercent),
          }))}
        />
      </Column>

      <Column xs='7' style={{ margin: 'auto 0 0 auto' }}>
        <TableInfo>
          <thead>
            <tr>
              <th></th>
              <th>Setor</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.sector}>
                <td>
                  <ColorBadge color='#4baaaa' />
                </td>
                <td>
                  <b>{item.sector}</b>
                </td>
                <td>
                  <NumberFormat format='percent' value={item.amountPercent} />
                  <NumberFormat format='currency' value={item.amount} />
                </td>
              </tr>
            ))}
          </tbody>
        </TableInfo>
      </Column>
    </Flex>
  );
}
