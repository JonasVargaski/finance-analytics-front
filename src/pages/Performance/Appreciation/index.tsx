import { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ChartData,
} from 'chart.js';

import { Flex } from '~/components/Flex';
import { currency, percent } from '~/utils/numberFormat';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, ChartDataLabels);

interface IAppreciationProps {
  data: Array<{
    formatedDate: string;
    amount: number;
    dy: number;
  }>;
}
ChartJS.overrides.line.spanGaps = true;

export function Appreciation({ data }: IAppreciationProps) {
  const theme = useTheme();

  const charData = useMemo<ChartData<'line'>>(() => {
    return {
      labels: data.map((x) => x.formatedDate),
      datasets: [
        {
          data: data.map((x) => x.dy),
          amount: data.map((x) => x.amount),
          label: 'Valor',
          backgroundColor: theme.palette.primary.dark,
          borderColor: theme.palette.primary.main,
          pointRadius: 2,
          borderWidth: 1.2,
        },
      ],
    };
  }, [data, theme]);

  return (
    <Flex p='6px 0 0' style={{ height: 180 }}>
      <Line
        data={charData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: -10,
              right: 0,
            },
          },
          plugins: {
            datalabels: {
              formatter: (value) => percent.format(value),
              color: theme.palette.text.secondary,
              font: { weight: 'bold' },
              anchor: 'center',
              align: 'end',
              offset: 0,
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
                label: (item) => `Yield: ${percent.format(Number(item.raw))}`,
                afterLabel: (item) => {
                  type DatasetAmount = { amount: number[] };
                  const { amount } = item.dataset as unknown as DatasetAmount;
                  return `Valor: ${currency.format(amount[item.dataIndex])}`;
                },
              },
            },
          },
          interaction: {
            mode: 'nearest',
            intersect: false,
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: theme.palette.text.secondary },
            },
            y: {
              type: 'linear',
              grace: '10%',
              beginAtZero: true,
              grid: { color: theme.palette.divider, borderDash: [3] },
              ticks: { color: theme.palette.text.secondary, padding: 12 },
            },
          },
        }}
      />
    </Flex>
  );
}
