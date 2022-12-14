import { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { ColorBadge } from '~/components/ColorBadge';
import { Flex } from '~/components/Flex';
import { Column } from '~/components/Grid';
import { NumberFormat } from '~/components/NumberFormat';
import { percent } from '~/utils/numberFormat';

import { TableInfo } from './styles';
import { useColors } from '~/hooks/useColors';

ChartJS.register(ArcElement, Tooltip);

interface IAlocationActivesProps {
  data: Array<{
    ticker: string;
    amount: number;
    amountPercent: number;
    quotas: number;
  }>;
}

export function AlocationActives({ data }: IAlocationActivesProps) {
  const getColor = useColors('pallete1');

  const charData = useMemo<ChartData<'doughnut'>>(() => {
    return {
      labels: data.map((x) => x.ticker),
      datasets: [
        {
          data: data.map((x) => x.amountPercent),
          backgroundColor: data.map((_, i) => {
            const c = getColor(i);
            return c;
          }),
          borderWidth: 0,
          hoverOffset: 12,
          borderRadius: 4,
        },
      ],
    };
  }, [data, getColor]);

  return (
    <Flex>
      <Column sm='5' style={{ padding: '12px 30px' }}>
        <Doughnut
          data={charData}
          options={{
            spacing: 0.2,
            responsive: true,
            layout: { padding: 10 },
            plugins: {
              datalabels: { display: false },
              legend: { display: false },
              tooltip: {
                callbacks: { label: (item) => `${item.label}: ${percent.format(item.parsed)}` },
              },
            },
          }}
        />
      </Column>

      <Column xs='7' style={{ margin: 'auto 0 0 auto' }}>
        <TableInfo>
          <thead>
            <tr>
              <th></th>
              <th>Ticker</th>
              <th>Cotas</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={item.ticker}>
                <td>
                  <ColorBadge color={getColor(i)} />
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
