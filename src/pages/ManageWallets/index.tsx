import { useNavigate, useParams } from 'react-router-dom';

import { Flex } from '~/components/Flex';
import { Typography } from '~/components/Typography';

export function ManageWallets() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <Flex m='8px 0 20px'>
        <Typography variant='pageTitle'>{id ? 'Editar Carteira' : 'Criar Carteira'}</Typography>
      </Flex>
    </>
  );
}
