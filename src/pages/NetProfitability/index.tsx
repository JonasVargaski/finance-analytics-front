import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import { Typography } from '~/components/Typography';
import PredictiveAnalytics from '../../assets/predictive_analytics.svg';
import { AddDialog } from './AddDialog';
import { Actions, EmptyState } from './styles';

export function NetProfitability() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Stack m='8px 0 28px'>
        <Typography variant='pageTitle'>Rentabilidade líquida</Typography>
        <Typography variant='description'>
          Calcule a rentabilidade líquida mensal de seus seus investimentos de forma transparente.
        </Typography>
      </Stack>

      <EmptyState>
        <img src={PredictiveAnalytics} alt='EmptyState' />
        <div>
          <Typography variant='description'>Nenhum conta encontrada.</Typography>
          <Typography variant='description'>
            Cadastre novas contas para viasualizar a rentabilidade líquida!
          </Typography>
        </div>
      </EmptyState>

      <AddDialog show={show} onClose={() => setShow(false)} />

      <Actions>
        <Button variant='contained' onClick={() => setShow(true)}>
          Adicionar investimento
        </Button>
      </Actions>
    </>
  );
}
