import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Settings from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';

import { useLocalStorage } from '~/hooks/useLocalStorage';
import { Fallback } from '~/components/Fallback';
import { Flex } from '~/components/Flex';
import { Typography } from '~/components/Typography';

import { NavItems } from './NavItems';
import { Container, Header, Main, NavSidebar } from './styles';

export function AppLayout() {
  const [theme, setTheme] = useLocalStorage<{ theme: 'light' | 'dark' }>('theme', {
    theme: 'light',
  });

  return (
    <Container>
      <Header>
        <Typography variant='cardTitle'>Carteiras</Typography>
        <Flex g='7px'>
          <IconButton
            onClick={() =>
              setTheme(theme.theme === 'light' ? { theme: 'dark' } : { theme: 'light' })
            }
          >
            <Settings />
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
