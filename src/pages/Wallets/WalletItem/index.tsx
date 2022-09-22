import {
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import MoreVert from '@mui/icons-material/Morevert';
import { useRef, useState } from 'react';

import { Flex } from '~/components/Flex';
import { Card } from '~/components/Generic';
import { Typography } from '~/components/Typography';
import { Header } from './styles';

interface IItemProps {
  wallet: {
    id: string;
    name: string;
    description: string;
  };
  onExclude: () => void;
  onView: () => void;
  onEdit: () => void;
}

export function WalletItem({ wallet, onExclude, onView, onEdit }: IItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showConfirmExclude, setShowConfirmExclude] = useState(false);

  return (
    <>
      <Card ref={ref}>
        <Header>
          <h6>{wallet.name}</h6>
          <Flex>
            <Tooltip placement='top' title='Opções'>
              <IconButton onClick={() => setShowOptions(true)}>
                <MoreVert />
              </IconButton>
            </Tooltip>
          </Flex>
        </Header>

        <Typography variant='description'>{wallet.description}</Typography>
      </Card>

      <Menu
        anchorEl={ref.current}
        open={showOptions}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'center' }}
        onClose={() => setShowOptions(false)}
      >
        <MenuItem
          onClick={() => {
            setShowOptions(false);
            onView();
          }}
        >
          Desempenho
        </MenuItem>
        <MenuItem onClick={onEdit}>Editar</MenuItem>
        <MenuItem
          onClick={() => {
            setShowOptions(false);
            setShowConfirmExclude(true);
          }}
        >
          Excluir
        </MenuItem>
      </Menu>

      <Dialog open={showConfirmExclude} onClose={() => setShowConfirmExclude(false)}>
        <DialogTitle>Excluir carteira</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir essa carteira? Essa ação é irreversível.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={() => setShowConfirmExclude(false)}>
            Cancelar
          </Button>
          <Button color='error' variant='outlined' onClick={onExclude}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
