import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdMoreVert } from 'react-icons/md';

import { useWallets } from '~/hooks/resources/useWallets';
import { currency, percent } from '~/utils/numberFormat';

import { Flex } from '~/components/Flex';
import { IconButton } from '~/components/IconButton';
import { Typography } from '~/components/Typography';
import { Card } from '~/components/Generic';
import { Column, Row } from '~/components/Grid';
import { ColorBadge } from '~/components/ColorBadge';
import { Tooltip } from '~/components/Tooltip';
import { Popover } from '~/components/Popover';
import { Menu, MenuItem } from '~/components/Menu';

import { AlocationTable, Container, Header } from './styles';
import { SimplePie } from '~/components/Graphs/SimplePie';

export function Wallets() {
  const navigate = useNavigate();
  const { data: wallets } = useWallets({ suspense: true });

  const [selected, setSelected] = useState<{
    id: string;
    anchor: HTMLElement | null;
  }>({ id: '', anchor: null });

  return (
    <Container>
      {wallets?.map((x) => (
        <Card key={x.id}>
          <Header>
            <h6>{x.name}</h6>
            <Flex>
              <Tooltip placement='top' content='Opções'>
                <IconButton onClick={(e) => setSelected({ id: x.id, anchor: e.currentTarget })}>
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
            <Column xs='5' style={{ height: 135 }}>
              <SimplePie
                data={x.items.map((item) => ({
                  id: item.id,
                  label: item.ticker,
                  value: item.percent,
                  color: item.color,
                  formattedValue: percent.format(item.percent),
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

      <Popover
        anchorEl={selected.anchor}
        open={!!selected.anchor}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right' }}
        onRequestClose={() => setSelected({ id: '', anchor: null })}
      >
        <Menu>
          <MenuItem
            onClick={() => {
              setSelected({ id: '', anchor: null });
              navigate(`/wallets/${selected.id}/performance`);
            }}
          >
            Ver performace
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelected({ id: '', anchor: null });
              navigate(`/wallet/performace/${selected.id}`);
            }}
          >
            Editar
          </MenuItem>
          <MenuItem>Excluir</MenuItem>
        </Menu>
      </Popover>
    </Container>
  );
}
