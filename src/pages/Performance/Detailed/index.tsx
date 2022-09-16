import { IconButton, Tooltip } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '~/components/Collapse';
import { Flex } from '~/components/Flex';
import { NumberFormat } from '~/components/NumberFormat';
import { Tip } from '~/components/Tip';
import { Typography } from '~/components/Typography';
import { currency } from '~/utils/numberFormat';
import { Container, Head, Table, TransactionSection, TransactionTable } from './styles';

interface IDetailedProps {
  data: {
    ticker: string;
    currentPrice: number;
    averagePrice: number;
    averagePricePercent: number;
    amount: number;
    amountPercent: number;
    quotas: number;
    provents: number;
    proventsPercent: number;
    transactions: Array<{
      id: string;
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
      resume: Array<{
        provents: number;
        appreciation: number;
        percentProvents: number;
        percentAppreciation: number;
        received: boolean;
        date: string;
        proventDate: string;
      }>;
    }>;
  };
}

export function Detailed({ data }: IDetailedProps) {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Head open={open}>
        <Typography variant='cardTitle'>{data.ticker}</Typography>
        <Tooltip enterDelay={350} placement='top' title={open ? 'Ocultar resumo' : 'Exibir resumo'}>
          <IconButton onClick={() => setOpen((old) => !old)}>
            <ExpandMore />
          </IconButton>
        </Tooltip>
      </Head>

      <Flex m='6px 0 0'>
        <Table>
          <tbody>
            <tr>
              <td>Transações:</td>
              <td>{data.transactions.length}</td>
              <td>Total:</td>
              <td>
                <NumberFormat format='currency' value={data.amount} />
              </td>
            </tr>
            <tr>
              <td>Cotas:</td>
              <td>{data.quotas}</td>
              <td>Proventos:</td>
              <td>
                <NumberFormat format='currency' value={data.provents} />
                <NumberFormat format='percent' value={data.proventsPercent} />
              </td>
            </tr>
            <tr>
              <td>Cotação:</td>
              <td>
                <NumberFormat format='currency' value={data.currentPrice} />
              </td>
              <td>Preço médio:</td>
              <td>
                <NumberFormat format='currency' value={data.averagePrice} />
                <NumberFormat
                  colors
                  showIndicator
                  format='percent'
                  value={data.averagePricePercent}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </Flex>

      <Collapse transitionDuration='60ms' lazy open={open}>
        <Flex m='12px 0 0'>
          <Typography variant='description'>Desempenho mensal por transação:</Typography>
        </Flex>
        {data.transactions.map((transaction) => (
          <TransactionSection key={transaction.id}>
            <Typography className='info' variant='text'>
              Compra de<b>{transaction.quotas}</b>
              {transaction.quotas > 1 ? 'cotas' : 'cota'} em
              <b>
                {format(parseISO(transaction.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </b>
              à<b>{currency.format(transaction.price)}</b>
            </Typography>
            <TransactionTable>
              <thead>
                <tr>
                  <th>Data referência</th>
                  <th>Proventos</th>
                  <th>Valorização</th>
                </tr>
              </thead>
              <tbody>
                {transaction.resume.map((resume) => (
                  <tr key={resume.date}>
                    <td>{format(parseISO(resume.date), 'MMMM yyyy', { locale: ptBR })}</td>
                    {resume.provents ? (
                      <td css={(t) => ({ color: !resume.received ? t.palette.primary.main : '' })}>
                        <NumberFormat format='percent' value={resume.percentProvents} />
                        <NumberFormat format='currency' value={resume.provents} />
                        {!resume.received && (
                          <Tip>
                            Provento registrado com data de pagamento prevista para{' '}
                            <b>{format(parseISO(resume.proventDate), 'dd/MM/yyyy')}</b>
                          </Tip>
                        )}
                      </td>
                    ) : (
                      <td style={{ textAlign: 'center' }}>--</td>
                    )}
                    <td>
                      <NumberFormat
                        colors
                        showIndicator
                        format='percent'
                        value={resume.percentAppreciation}
                      />
                      <NumberFormat colors format='currency' value={resume.appreciation} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </TransactionTable>
          </TransactionSection>
        ))}
      </Collapse>
    </Container>
  );
}
