import { useNavigate } from 'react-router-dom';
import { MdMoreVert } from 'react-icons/md';
import { Flex } from '~/components/Flex';
import { IconButton } from '~/components/IconButton';
import { Typography } from '~/components/Typography';
import { useWallets } from '~/hooks/resources/useWallets';
import { AlocationPie } from './AlocationPie';
import { AlocationTable, Card, Container, Header } from './styles';
import { Column, Row } from '~/components/Grid';
import { currency, percent } from '~/utils/numberFormat';
import { ColorBadge } from '~/components/ColorBadge';
import { Tooltip } from '~/components/Tooltip';

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
              <Tooltip placement='top' content='Opções'>
                <IconButton
                  onClick={() => navigate(`/wallet/performace/${x.id}`, { state: x.name })}
                >
                  <MdMoreVert />
                </IconButton>
              </Tooltip>
            </Flex>
          </Header>

          <Typography variant='description'>{x.description}</Typography>

          <Flex m='13px 0 3px'>
            <Typography variant='text'>Alocação:</Typography>
          </Flex>

          <Row>
            <Column xs='5'>
              <AlocationPie
                data={x.items.map((item) => ({
                  id: item.id,
                  label: item.ticker,
                  value: item.percent,
                  color: item.color,
                }))}
              />
            </Column>

            <Column xs='7'>
              <AlocationTable>
                <tbody>
                  {x.items.map((transaction) => (
                    <tr key={transaction.ticker + transaction.tradingDate}>
                      <td>
                        <ColorBadge color={transaction.color} />
                      </td>
                      <td>
                        <b>{transaction.ticker}</b>
                      </td>
                      <td>
                        <span>{percent.format(transaction.percent)}</span>
                      </td>
                      <td>
                        <span>{currency.format(transaction.quotas * transaction.price)}</span>{' '}
                      </td>
                    </tr>
                  ))}
                  <tr className='totals'>
                    <td />
                    <td />
                    <td>Total:</td>
                    <td>{currency.format(x.amount)}</td>
                  </tr>
                </tbody>
              </AlocationTable>
            </Column>
          </Row>
        </Card>
      ))}
    </Container>
  );
}
