import { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { format, parseISO } from 'date-fns';
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
import { currency } from '~/utils/numberFormat';
import { ptBR } from 'date-fns/locale';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, ChartDataLabels);

interface IHistoryQuotationProps {
  data: Array<{
    date: string;
    value: number;
  }>;
}
ChartJS.overrides.line.spanGaps = false;

export function HistoryQuotation({ data }: IHistoryQuotationProps) {
  const theme = useTheme();

  const charData = useMemo<ChartData<'line'>>(() => {
    return {
      labels: data.map((x) => x.date),
      datasets: [
        {
          data: data.map((x) => x.value),
          label: 'Cotação',
          backgroundColor: theme.palette.primary.dark,
          borderColor: theme.palette.primary.main,
          pointRadius: 0,
          borderWidth: 0.9,
        },
      ],
    };
  }, [data, theme]);

  return (
    <Flex m='-6px 0 0' style={{ height: 160 }}>
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
            datalabels: { display: false },
            legend: { display: false },
            tooltip: {
              displayColors: false,
              callbacks: {
                title: ([item]) => {
                  console.log(new Date().toISOString(), parseISO(item.label).toISOString());
                  return format(parseISO(item.label), 'dd/MM/yyyy HH:mm', { locale: ptBR });
                },
                label: (item) => `Cotação: ${currency.format(Number(item.raw))}`,
              },
            },
          },
          interaction: {
            mode: 'nearest',
            intersect: false,
          },
          scales: {
            x: { display: false },
            y: {
              type: 'linear',
              grid: { color: theme.palette.divider, borderDash: [3] },
              ticks: { color: theme.palette.text.secondary, padding: 12 },
            },
          },
        }}
      />
    </Flex>
  );
}
