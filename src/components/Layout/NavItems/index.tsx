import { NavLink } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet';
import Visibility from '@mui/icons-material/Visibility';
import Equalizer from '@mui/icons-material/Equalizer';

import { Container } from './styles';

export function NavItems() {
  return (
    <Container>
      <NavLink to='wallets'>
        <MenuItem>
          <AccountBalanceWallet /> Carteiras
        </MenuItem>
      </NavLink>
      <NavLink to='radar'>
        <MenuItem>
          <Visibility /> Radar
        </MenuItem>
      </NavLink>
      <NavLink to='assemble'>
        <MenuItem>
          <Equalizer /> Balancear
        </MenuItem>
      </NavLink>
    </Container>
  );
}
