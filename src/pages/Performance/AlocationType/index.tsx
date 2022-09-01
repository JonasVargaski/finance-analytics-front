import { Flex } from '~/components/Flex';
import { Column } from '~/components/Grid';
import { SimplePie } from '~/components/Graphs/SimplePie';
import { TableInfo } from './styles';
import { ColorBadge } from '~/components/ColorBadge';
import { currency } from '~/utils/numberFormat';

interface IAlocationTypeProps {
  data: Array<{
    ticker: string;
    price: number;
    quotas: number;
    date: string;
    amount: number;
    currentPrice: number;
    netProfit: number;
    netProfitPercent: number;
    provents: number;
    percentProvents: number;
    appreciation: number;
    percentAppreciation: number;
  }>;
}

export function AlocationType({ data }: IAlocationTypeProps) {
  return (
    <Flex m='12px 0 0'>
      <Column sm='5' style={{ height: 180 }}>
        <SimplePie
          colors={{ scheme: 'nivo' }}
          data={
            data.map((item, i) => ({
              id: i.toString(),
              label: item.ticker,
              value: item.amount,
              color: '',
              formattedValue: item.amount.toString(),
            })) ?? []
          }
        />
      </Column>

      <Column xs='7'>
        <TableInfo>
          <tbody>
            {data.map((item, i) => (
              <tr key={item.ticker + i}>
                <td>
                  <ColorBadge color='#4baaaa' />
                </td>
                <td>
                  <b>{item.ticker}</b>
                </td>
                <td>
                  <span>{item.netProfit}</span>
                </td>
                <td>
                  <span>{item.quotas * item.price}</span>
                </td>
              </tr>
            ))}
            <tr className='totals'>
              <td />
              <td />
              <td>Total:</td>
              <td>{currency.format(9999)}</td>
            </tr>
          </tbody>
        </TableInfo>
      </Column>
    </Flex>
  );
}
