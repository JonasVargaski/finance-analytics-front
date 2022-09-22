import { useNavigate } from 'react-router-dom';
import { useWallets } from '~/hooks/resources/useWallets';
import { useDeleteWallet } from '~/hooks/resources/useDeleteWallet';

import { Flex } from '~/components/Flex';
import { Typography } from '~/components/Typography';

import { List } from './styles';
import { WalletItem } from './WalletItem';

export function Wallets() {
  const navigate = useNavigate();
  const { data: wallets } = useWallets({ suspense: true });
  const deleteWallet = useDeleteWallet();

  return (
    <>
      <Flex m='8px 0 20px'>
        <Typography variant='pageTitle'>Carteiras</Typography>
      </Flex>

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
    </>
  );
}
