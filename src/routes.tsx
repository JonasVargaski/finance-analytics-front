import { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { AppLayout } from '~/components/Layout';

const Wallets = lazy(() => import('~/pages/Wallets').then(({ Wallets }) => ({ default: Wallets })));
const Radar = lazy(() => import('~/pages/Radar').then(({ Radar }) => ({ default: Radar })));

const ManageWallets = lazy(() =>
  import('~/pages/ManageWallets').then(({ ManageWallets }) => ({ default: ManageWallets })),
);

const AssembleWallet = lazy(() =>
  import('~/pages/AssembleWallet').then(({ AssembleWallet }) => ({ default: AssembleWallet })),
);

const Performance = lazy(() =>
  import('~/pages/Performance').then(({ Performance }) => ({ default: Performance })),
);

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/wallets' element={<Wallets />} />
        <Route path='/radar' element={<Radar />} />
        <Route path='/wallets/performance/:id' element={<Performance />} />
        <Route path='/wallets/manage'>
          <Route path='' element={<ManageWallets />} />
          <Route path=':id' element={<ManageWallets />} />
        </Route>
        <Route path='/assemble' element={<AssembleWallet />} />
      </Route>
      <Route path='*' element={<Navigate to='/wallets' />} />
    </Routes>
  );
}
