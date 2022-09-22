import { Pagination } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import { Flex } from '~/components/Flex';
import { NumberFormat } from '~/components/NumberFormat';
import { Container } from './styles';

interface ITransactionsProps {
  data: Array<{
    id: string;
    ticker: string;
    price: number;
    quotas: number;
    date: string;
    currentPrice: number;
    netProfit: number;
    netProfitPercent: number;
    provents: number;
    percentProvents: number;
    appreciation: number;
    percentAppreciation: number;
  }>;
}

const perPage = 10;

export function Transactions({ data }: ITransactionsProps) {
  const [page, setPage] = useState(Math.round(data.length / perPage));
  const count = (page - 1) * perPage;

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Data compra</th>
            <th>Cotas</th>
            <th>Valor compra</th>
            <th>Valor atual</th>
            <th>Proventos</th>
            <th>Valorização</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(count, count + perPage).map((t) => (
            <tr key={t.id}>
              <td>
                <span>{t.ticker}</span>
              </td>
              <td>
                <span>{format(parseISO(t.date), 'dd/MM/yyyy')}</span>
              </td>
              <td>
                <span>{t.quotas}</span>
              </td>
              <td>
                <NumberFormat format='currency' value={t.price} />
              </td>
              <td>
                <NumberFormat format='currency' value={t.currentPrice} />
              </td>
              <td style={{ textAlign: t.provents ? 'right' : 'center' }}>
                {t.provents ? (
                  <>
                    <NumberFormat format='percent' value={t.percentProvents} />
                    <NumberFormat format='currency' value={t.provents} />
                  </>
                ) : (
                  '--'
                )}
              </td>
              <td>
                <NumberFormat showIndicator colors format='percent' value={t.percentAppreciation} />
                <NumberFormat colors format='currency' value={t.appreciation} />
              </td>
              <td>
                <NumberFormat showIndicator colors format='percent' value={t.netProfitPercent} />
                <NumberFormat colors format='currency' value={t.netProfit} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Flex m='12px 0 0' css={{ justifyContent: 'flex-end' }}>
        <Pagination
          count={Math.round(data.length / perPage)}
          siblingCount={0}
          page={page}
          onChange={(_, next) => setPage(next)}
        />
      </Flex>
    </Container>
  );
}
