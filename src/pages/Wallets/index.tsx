import { useNavigate } from 'react-router-dom';
import { useWallets } from '~/hooks/resources/useWallets';
import { useDeleteWallet } from '~/hooks/resources/useDeleteWallet';
import FinancialData from '../../assets/financial_data.svg';

import { Flex } from '~/components/Flex';
import { Typography } from '~/components/Typography';

import { Actions, Container, EmptyState, List } from './styles';
import { WalletItem } from './WalletItem';
import { Button } from '@mui/material';

export function Wallets() {
  const navigate = useNavigate();
  const { data: wallets } = useWallets({ suspense: true });
  const deleteWallet = useDeleteWallet();

  return (
    <Container>
      <Flex m='8px 0 20px'>
        <Typography variant='pageTitle'>Carteiras</Typography>
      </Flex>

      {wallets?.length ? (
        <List>
          {wallets?.map((wallet) => (
            <WalletItem
              key={wallet.id}
              wallet={wallet}
              onExclude={() => deleteWallet.mutate(wallet.id)}
              onView={() => setTimeout(() => navigate(`/wallets/performance/${wallet.id}`))}
              onEdit={() => setTimeout(() => navigate(`/wallets/manage/${wallet.id}`))}
            />
          ))}
        </List>
      ) : (
        <EmptyState>
          <img src={FinancialData} alt='EmptyState' />
          <div>
            <Typography variant='description'>Nenhuma carteira encontrada.</Typography>
            <Typography variant='description'>Cadastre e gerencie suas carteiras!</Typography>
          </div>
        </EmptyState>
      )}

      <Actions>
        <Button variant='contained' onClick={() => navigate('/wallets/manage')}>
          Criar Carteira
        </Button>
      </Actions>
    </Container>
  );
}
