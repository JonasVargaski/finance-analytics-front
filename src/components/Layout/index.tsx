import { Suspense } from 'react';
import { MdMailOutline, MdOutlineSettings } from 'react-icons/md';
import { Outlet } from 'react-router-dom';

import { Fallback } from '~/components/Fallback';
import { IconButton } from '~/components/IconButton';
import { Flex } from '~/components/Flex';
import { Typography } from '~/components/Typography';

import { NavItems } from './NavItems';
import { Container, Header, Main, NavSidebar } from './styles';
import { useLocalStorage } from '~/hooks/useLocalStorage';

export function AppLayout() {
  const [theme, setTheme] = useLocalStorage<{ theme: 'light' | 'dark' }>('theme', {
    theme: 'light',
  });

  return (
    <Container>
      <Header>
        <Typography variant='cardTitle'>Carteiras</Typography>
        <Flex g='7px'>
          <IconButton>
            <MdMailOutline />
          </IconButton>
          <IconButton
            onClick={() =>
              setTheme(theme.theme === 'light' ? { theme: 'dark' } : { theme: 'light' })
            }
          >
            <MdOutlineSettings />
          </IconButton>
        </Flex>
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
