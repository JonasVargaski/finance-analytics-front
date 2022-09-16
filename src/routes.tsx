import { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { AppLayout } from '~/components/Layout';

const Wallets = lazy(() => import('~/pages/Wallets').then(({ Wallets }) => ({ default: Wallets })));

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
        <Route path='/wallets/:id/performance' element={<Performance />} />
        <Route path='/assemble' element={<AssembleWallet />} />
      </Route>
      <Route path='*' element={<Navigate to='/wallets' />} />
    </Routes>
  );
}
