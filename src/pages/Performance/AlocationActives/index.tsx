import { useTheme } from '@emotion/react';
import { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { ColorBadge } from '~/components/ColorBadge';
import { Flex } from '~/components/Flex';
import { Column } from '~/components/Grid';
import { NumberFormat } from '~/components/NumberFormat';
import { percent } from '~/utils/numberFormat';

import { TableInfo } from './styles';

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
  const theme = useTheme();

  const charData = useMemo<ChartData<'doughnut'>>(() => {
    return {
      labels: data.map((x) => x.ticker),
      datasets: [
        {
          data: data.map((x) => x.amountPercent),
          backgroundColor: data.map((_, i) => theme.components.chartColors[i]),
          borderWidth: 0,
          hoverOffset: 12,
          borderRadius: 4,
        },
      ],
    };
  }, [data, theme]);

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
                  <ColorBadge color={theme.components.chartColors[i]} />
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
