import { useMemo } from 'react';
import { useTheme } from '@emotion/react';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  ChartData,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';

import { Flex } from '~/components/Flex';
import { currency } from '~/utils/numberFormat';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, ChartDataLabels);

interface IProventsProps {
  data: Array<{
    date: string;
    formatedDate: string;
    value: number;
  }>;
}

export function Provents({ data }: IProventsProps) {
  const theme = useTheme();

  const charData = useMemo<ChartData<'bar'>>(() => {
    return {
      labels: data.map((x) => x.formatedDate),
      datasets: [
        {
          data: data.map((x) => x.value),
          label: 'Valor',
          backgroundColor: theme.palette.warning,
          borderWidth: 0,
          borderRadius: 3,
        },
      ],
    };
  }, [data, theme]);

  return (
    <Flex p='12px 0 0' style={{ height: 300 }}>
      <Bar
        data={charData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: 0 },
          plugins: {
            datalabels: {
              formatter: (value) => currency.format(value),
              color: theme.palette.text,
              font: { weight: 'bold' },
              anchor: 'end',
              align: 'end',
              offset: -1,
              rotation: (ctx) => ctx.chart.scales.x.labelRotation * -1.2,
            },
            legend: { display: false },
            tooltip: {
              displayColors: false,
              callbacks: {
                title: ([item]) => {
                  const formated = `${format(
                    parse(item.label, 'MM/yyyy', new Date()),
                    "MMMM 'de' yyyy",
                    {
                      locale: ptBR,
                    },
                  )}`;
                  return formated.charAt(0).toUpperCase() + formated.slice(1);
                },
                label: (item) => `Valor recebido: ${currency.format(Number(item.raw))}`,
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: theme.palette.text },
            },
            y: {
              grid: { color: theme.palette.divider },
              ticks: { color: theme.palette.text },
            },
          },
        }}
      />
    </Flex>
  );
}
