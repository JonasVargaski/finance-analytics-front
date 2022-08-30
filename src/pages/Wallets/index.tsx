import { useNavigate } from 'react-router-dom';
import { MdMoreVert } from 'react-icons/md';
import { Flex } from '~/components/Flex';
import { IconButton } from '~/components/IconButton';
import { Typography } from '~/components/Typography';
import { useWallets } from '~/hooks/resources/useWallets';
import { AlocationPie } from './AlocationPie';
import { Card, Container, Header } from './styles';

export function Wallets() {
  const navigate = useNavigate();
  const { data: wallets } = useWallets({ suspense: true });

  return (
    <Container>
      {wallets?.map((x) => (
        <Card key={x.id}>
          <Header>
            <h6>{x.name}</h6>
            <Flex>
              <IconButton onClick={() => navigate(`/wallet/performace/${x.id}`, { state: x.name })}>
                <MdMoreVert />
              </IconButton>
            </Flex>
          </Header>

          <Flex p='0 28px 14px 0'>
            <Typography variant='description'>{x.description}</Typography>
          </Flex>

          <Typography variant='title'>Alocação:</Typography>

          <AlocationPie
            data={x.items.map((item, i) => ({
              id: item.ticker + i,
              label: item.ticker,
              value: item.percent,
              color: item.color,
            }))}
          />
        </Card>
      ))}
    </Container>
  );
}
