import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Column, Row } from '~/components/Grid';
import { useWalletPerformace } from '~/hooks/resources/useWalletPerformace';
import { currency, percent } from '~/utils/numberFormat';

interface IWalletPerformanceProps {
  children?: React.ReactNode;
}

export function WalletPerformance({ children }: IWalletPerformanceProps) {
  const { id } = useParams();
  const { state } = useLocation();

  const navigate = useNavigate();
  if (!id) navigate('/');

  const { data } = useWalletPerformace({ id, suspense: true, enabled: !!id });

  const totals = {
    amout: 0,
    provents: 0,
    proventsPercentAverage: 0,
    appreciation: 0,
    appreciationPercentAverage: 0,
    netProfit: 0,
  };

  if (data) {
    const resume = data.reduce(
      (acc, cur) => {
        acc.amount += cur.amount;
        acc.provents += cur.provents;
        acc.percentProvents += cur.percentProvents;
        acc.appreciation += cur.appreciation;
        return acc;
      },
      {
        amount: 0,
        provents: 0,
        percentProvents: 0,
        appreciation: 0,
      },
    );

    totals.amout = resume.amount;
    totals.provents = resume.provents;
    totals.netProfit = resume.provents + resume.appreciation;
    totals.appreciation = resume.appreciation;
    totals.appreciationPercentAverage = (resume.appreciation / resume.amount) * 100;
    totals.proventsPercentAverage =
      resume.percentProvents / data.filter((x) => x.provents).length || 0;
  }

  return (
    <div>
      <h3>Resultados da carteira &quot;{state as string}&quot;</h3>

      <Row>
        <Column style={{ background: 'red' }} lg='3'>
          1
        </Column>
        <Column style={{ background: 'blue' }} lg='3'>
          2
        </Column>
        <Column style={{ background: 'pink' }} lg='3'>
          3
        </Column>
      </Row>

      <table
        style={{
          borderSpacing: '34px 5px',
          border: '1px solid #ccc',
          width: 'fit-content',
          padding: 10,
          borderRadius: 6,
        }}
      >
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Data compra</th>
            <th>Cotas</th>
            <th>Preço compra</th>
            <th>Preço atual</th>
            <th>Proventos</th>
            <th>Valorização das cotas</th>
            <th>Lucro líquido</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((x) => (
            <tr key={x.ticker + x.price}>
              <td>{x.ticker}</td>
              <td>{format(parseISO(x.date), 'dd/MM/yyyy')}</td>
              <td>{x.quotas}</td>
              <td>{currency.format(x.price)}</td>
              <td>{currency.format(x.currentPrice)}</td>
              {x.provents ? (
                <td>
                  [{percent.format(x.percentProvents)}] {currency.format(x.provents)}
                </td>
              ) : (
                <td style={{ textAlign: 'center' }}> -</td>
              )}
              <td style={{ color: x.appreciation < 0 ? '#e93030' : '#02da02' }}>
                [{percent.format(x.percentAppreciation)}] {currency.format(x.appreciation)}
              </td>
              <td style={{ color: x.netProfit < 0 ? '#e93030' : '#02da02' }}>
                [{percent.format(x.netProfitPercent)}] {currency.format(x.netProfit)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Acumulado</h3>
      <table
        style={{
          borderSpacing: '122px 5px',
          margin: '10px 0',
          border: '1px solid #ccc',
          width: 'fit-content',
          padding: 10,
          borderRadius: 6,
        }}
      >
        <thead>
          <tr>
            <th>Total Investido</th>
            <th>Proventos</th>
            <th>Valorização das cotas</th>
            <th>Lucro líquido</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{currency.format(totals.amout)}</td>
            {totals.provents ? (
              <td>
                [{percent.format(totals.proventsPercentAverage)}] {currency.format(totals.provents)}
              </td>
            ) : (
              <td style={{ textAlign: 'center' }}>-</td>
            )}
            <td style={{ color: totals.appreciation < 0 ? '#e93030' : '#02da02' }}>
              [{percent.format(totals.appreciationPercentAverage)}]{' '}
              {currency.format(totals.appreciation)}
            </td>
            <td style={{ color: totals.netProfit < 0 ? '#e93030' : '#02da02' }}>
              {currency.format(totals.netProfit)}
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Resumo mensal</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {data?.map((x) => (
          <div
            key={x.ticker + x.price}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid #ccc',
              padding: 10,
              borderRadius: 6,
            }}
          >
            <p>
              <b>{x.ticker} </b>
              <span style={{ color: '#888' }}>({format(parseISO(x.date), 'dd/MM/yyyy')})</span>
            </p>
            <table style={{ borderSpacing: '30px 3px' }}>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Proventos</th>
                  <th>Valorização das cotas</th>
                </tr>
              </thead>
              <tbody>
                {x.resume.map((r, i) => (
                  <tr key={i}>
                    <td style={{ textTransform: 'capitalize' }}>
                      {format(parseISO(r.date), 'MMMM yyyy', { locale: ptBR })}
                    </td>
                    {r.provents ? (
                      <td>
                        {' '}
                        [{percent.format(r.percentProvents)}] {currency.format(r.provents)}{' '}
                      </td>
                    ) : (
                      <td style={{ textAlign: 'center' }}>-</td>
                    )}
                    <td style={{ color: r.appreciation < 0 ? '#e93030' : '#02da02' }}>
                      [{percent.format(r.percentAppreciation)}] {currency.format(r.appreciation)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}
