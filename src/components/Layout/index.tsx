import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Settings from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';

import { useLocalStorage } from '~/hooks/useLocalStorage';
import { Fallback } from '~/components/Fallback';

import { NavItems } from './NavItems';
import { Container, Main, NavSidebar } from './styles';

export function AppLayout() {
  const [theme, setTheme] = useLocalStorage<{ theme: 'light' | 'dark' }>('theme', {
    theme: 'light',
  });

  return (
    <Container>
      <NavSidebar>
        <NavItems />
        <div style={{ margin: 'auto 0 0 auto' }}>
          <IconButton
            onClick={() =>
              setTheme(theme.theme === 'light' ? { theme: 'dark' } : { theme: 'light' })
            }
          >
            <Settings />
          </IconButton>
        </div>
      </NavSidebar>

      <Main>
        <Suspense fallback={<Fallback />}>
          <Outlet />
        </Suspense>
      </Main>
    </Container>
  );
}
