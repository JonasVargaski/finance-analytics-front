import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Fallback } from '../Fallback';
import { MdMailOutline, MdOutlineSettings } from 'react-icons/md';
import { Container, Header, Main, NavSidebar } from './styles';
import { NavItems } from './NavItems';

export function AppLayout() {
  return (
    <Container>
      <Header>
        <h3>Carteiras</h3>
        <div>
          <MdMailOutline />
          <MdOutlineSettings />
        </div>
      </Header>

      <NavSidebar>
        <NavItems />
      </NavSidebar>

      <Main>
        <Suspense fallback={<Fallback />}>
          <Outlet />
        </Suspense>
      </Main>
    </Container>
  );
}
