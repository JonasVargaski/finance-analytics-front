import { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { AppLayout } from '~/components/Layout';

const Wallets = lazy(() => import('~/pages/Wallets').then(({ Wallets }) => ({ default: Wallets })));

const WalletPerformance = lazy(() =>
  import('~/pages/WalletPerformance').then(({ WalletPerformance }) => ({
    default: WalletPerformance,
  })),
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
        <Route path='/wallet/performace/:id' element={<WalletPerformance />} />
      </Route>
      <Route path='*' element={<Navigate to='/wallets' />} />
    </Routes>
  );
}
