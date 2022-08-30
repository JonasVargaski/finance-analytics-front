import { NavLink } from 'react-router-dom';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { Container } from './styles';

export function NavItems() {
  return (
    <Container>
      <li>
        <NavLink to='wallets'>
          <MdAccountBalanceWallet /> Carteiras
        </NavLink>
      </li>
    </Container>
  );
}
