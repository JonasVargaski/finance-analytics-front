import PredictiveAnalytics from '../../assets/predictive_analytics.svg';

import { Flex } from '~/components/Flex';
import { Typography } from '~/components/Typography';
import { Actions, Container, EmptyState } from './styles';
import { Button } from '@mui/material';

export function Radar() {
  return (
    <Container>
      <Flex m='8px 0 20px'>
        <Typography variant='pageTitle'>Radar de Ativos</Typography>
      </Flex>

      <EmptyState>
        <img src={PredictiveAnalytics} alt='EmptyState' />
        <div>
          <Typography variant='description'>Nenhum ativo encontrado.</Typography>
          <Typography variant='description'>
            Cadastre novos ativos para viasualizar análises detalhadas!
          </Typography>
        </div>
      </EmptyState>

      <Actions>
        <Button variant='contained'>Adicionar ativo</Button>
      </Actions>
    </Container>
  );
}
