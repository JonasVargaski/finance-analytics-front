import { NavLink } from 'react-router-dom';
import { MdAccountBalanceWallet, MdEqualizer, MdVisibility } from 'react-icons/md';
import { Container } from './styles';

export function NavItems() {
  return (
    <Container>
      <li>
        <NavLink to='wallets'>
          <MdAccountBalanceWallet /> Carteiras
        </NavLink>
      </li>
      <li>
        <NavLink to='radar'>
          <MdVisibility /> Radar
        </NavLink>
      </li>
      <li>
        <NavLink to='assemble'>
          <MdEqualizer /> Balancear
        </NavLink>
      </li>
    </Container>
  );
}
