import { ColorBadge } from '~/components/ColorBadge';
import { Flex } from '~/components/Flex';
import { SimplePie } from '~/components/Graphs/SimplePie';
import { Column } from '~/components/Grid';
import { NumberFormat } from '~/components/NumberFormat';
import { Typography } from '~/components/Typography';
import { percent } from '~/utils/numberFormat';
import { TableInfo } from './styles';

interface IAlocationActivesProps {
  data: Array<{
    ticker: string;
    color: string;
    amount: number;
    amountPercent: number;
    quotas: number;
  }>;
}

export function AlocationActives({ data }: IAlocationActivesProps) {
  return (
    <Flex m='12px 0 0'>
      <Column sm='5' style={{ height: 160 }}>
        <SimplePie
          data={data.map((item) => ({
            id: item.ticker,
            label: item.ticker,
            value: item.amount,
            color: item.color,
            formattedValue: percent.format(item.amountPercent),
          }))}
        />
      </Column>

      <Column xs='7' style={{ margin: 'auto 0 0 auto' }}>
        <TableInfo>
          <thead>
            <tr>
              <th></th>
              <th>Ticker</th>
              <th>Quantidade</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.ticker}>
                <td>
                  <ColorBadge color={item.color} />
                </td>
                <td>
                  <b>{item.ticker}</b>
                </td>
                <td>
                  <b>{item.quotas}</b>
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
