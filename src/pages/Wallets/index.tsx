import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import MoreVert from '@mui/icons-material/Morevert';

import { useWallets } from '~/hooks/resources/useWallets';

import { Flex } from '~/components/Flex';
import { Typography } from '~/components/Typography';
import { Card } from '~/components/Generic';

import { Container, Header } from './styles';

export function Wallets() {
  const navigate = useNavigate();
  const { data: wallets } = useWallets({ suspense: true });

  const [selected, setSelected] = useState<{
    id: string;
    anchor: HTMLElement | null;
  }>({ id: '', anchor: null });

  const navigateTo = useCallback(
    (to: string) => {
      setSelected({ id: '', anchor: null });
      setTimeout(() => navigate(to));
    },
    [navigate],
  );

  return (
    <Container>
      {wallets?.map((x) => (
        <Card key={x.id}>
          <Header>
            <h6>{x.name}</h6>
            <Flex>
              <Tooltip placement='top' title='Opções'>
                <IconButton onClick={(e) => setSelected({ id: x.id, anchor: e.currentTarget })}>
                  <MoreVert />
                </IconButton>
              </Tooltip>
            </Flex>
          </Header>

          <Typography variant='description'>{x.description}</Typography>
        </Card>
      ))}

      <Menu
        anchorEl={selected.anchor}
        open={!!selected.id}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'center' }}
        onClose={() => setSelected({ id: '', anchor: null })}
      >
        <MenuItem onClick={() => navigateTo(`/wallets/${selected.id}/performance`)}>
          Ver performace
        </MenuItem>
        <MenuItem>Editar</MenuItem>
        <MenuItem>Excluir</MenuItem>
      </Menu>
    </Container>
  );
}
