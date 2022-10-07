import { useState } from 'react';
import { Button } from '@mui/material';

import { useListRadars } from '~/hooks/resources/useListRadars';

import { Flex } from '~/components/Flex';
import { Typography } from '~/components/Typography';

import PredictiveAnalytics from '../../assets/predictive_analytics.svg';
import { RadarItem } from './RadarItem';
import { AddDialog } from './AddDialog';
import { Actions, Container, EmptyState } from './styles';

export function Radar() {
  const [showAdd, setShowAdd] = useState(false);
  const { data } = useListRadars({ suspense: true });

  return (
    <Container>
      <Flex m='8px 0 20px'>
        <Typography variant='pageTitle'>Radar de Ativos</Typography>
      </Flex>

      {data?.length ? (
        data.map((radar) => <RadarItem key={radar.id} item={radar} />)
      ) : (
        <EmptyState>
          <img src={PredictiveAnalytics} alt='EmptyState' />
          <div>
            <Typography variant='description'>Nenhum ativo encontrado.</Typography>
            <Typography variant='description'>
              Cadastre novos ativos para viasualizar análises detalhadas!
            </Typography>
          </div>
        </EmptyState>
      )}

      <Actions>
        <Button variant='contained' onClick={() => setShowAdd(true)}>
          Adicionar ativo
        </Button>
      </Actions>
      <AddDialog show={showAdd} onClose={() => setShowAdd(false)} />
    </Container>
  );
}
