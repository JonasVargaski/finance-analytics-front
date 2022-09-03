import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '~/components/Generic';
import { Typography } from '~/components/Typography';
import { usePerformaceWallet } from '~/hooks/resources/usePerformaceWallet';
import { AlocationActives } from './AlocationActives';
import { AlocationType } from './AlocationType';
import { Detailed } from './Detailed';
import { Provents } from './Provents';
import { ResumeCard } from './ResumeCard';
import { Container, Details, Totals } from './styles';
import { Transactions } from './Transactions';

export function Performance() {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) navigate('/wallets');

  const { data } = usePerformaceWallet({ id, suspense: true, enabled: !!id });

  console.log(data);

  return (
    <Container>
      <Totals>
        <ResumeCard
          title='Valor Investido'
          tip='Valor total aplicado na carteira.'
          color='#2598d7'
          value={data?.amout || 0}
        />
        <ResumeCard
          title='Patrimônio atual'
          tip={`Valor investido levando em consideração a valorização dos ativos.\nNão inclui os proventos recebidos.`}
          color='#878588'
          value={(data?.amout || 0) + (data?.appreciation || 0)}
          percent={data?.appreciationPercent}
          indicatorPercent
        />
        <ResumeCard
          title='Valorização dos ativos'
          tip='Lucro/Prejuízo atual bruto em caso da venda total de seus ativos.'
          color='#878588'
          value={data?.appreciation || 0}
          indicatorValue
        />
        <ResumeCard
          title='Proventos'
          tip={`Total de proventos recebidos provenientes das ações/cotas da carteira.\nA porcentagem se sefere aos proventos recebidos levando em consideração o valor investido.`}
          color='#28a70f'
          value={data?.provents || 0}
          percent={data?.proventsPercent}
        />
        <ResumeCard
          title='Total'
          tip='Lucro/Prejuízo atual bruto em caso da venda total de seus ativos + proventos recebidos no período.'
          color='#f5982f'
          value={data?.netProfit || 0}
          indicatorValue
        />
      </Totals>

      <Card style={{ gridArea: 'alocation-graph' }}>
        <Typography variant='cardTitle'>Alocação por setor</Typography>
        <AlocationType data={data?.portfolioComposition ?? []} />
      </Card>

      <Card style={{ gridArea: 'alocation-type-graph' }}>
        <Typography variant='cardTitle'>Alocação por ativo</Typography>
        <AlocationActives data={data?.groupedTransactions ?? []} />
      </Card>

      <Card style={{ gridArea: 'provents-graph' }}>
        <Typography variant='cardTitle'>Proventos</Typography>
        <Provents data={data?.proventsMonth ?? []} />
      </Card>

      <Card style={{ gridArea: 'transactions' }}>
        <Typography variant='cardTitle'>Transações</Typography>
        <Transactions data={data?.transactions || []} />
      </Card>

      <Details>
        {data?.groupedTransactions.map((group) => (
          <Detailed key={group.ticker} data={group} />
        ))}
      </Details>
    </Container>
  );
}
