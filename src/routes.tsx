import { Route, Routes, Navigate } from 'react-router-dom';

import { AppLayout } from '~/components/Layout';
import { Wallets } from '~/pages/Wallets';
import { WalletPerformance } from '~/pages/WalletPerformance';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/wallets' element={<Wallets />} />
        <Route path='/wallet/performace/:id' element={<WalletPerformance />} />
      </Route>
      <Route path='*' element={<Navigate to='/wallets' />} />
    </Routes>
  );
}
