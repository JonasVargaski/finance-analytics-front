import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Fallback } from '../Fallback';

export function AppLayout() {
  return (
    <>
      <h2>Análise de carteiras</h2>
      <main>
        <Suspense fallback={<Fallback />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
