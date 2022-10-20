import { NavLink } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet';
import Visibility from '@mui/icons-material/Visibility';
import Equalizer from '@mui/icons-material/Equalizer';
import TrendingUp from '@mui/icons-material/TrendingUp';

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
          <Visibility /> Radar de ativos
        </MenuItem>
      </NavLink>
      <NavLink to='assemble'>
        <MenuItem>
          <Equalizer /> Balancear compra
        </MenuItem>
      </NavLink>
      <NavLink to='net-profitability'>
        <MenuItem>
          <TrendingUp /> Rentabilidade líquida
        </MenuItem>
      </NavLink>
    </Container>
  );
}
