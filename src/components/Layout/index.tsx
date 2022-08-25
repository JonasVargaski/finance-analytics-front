import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <>
      <h2>Análise de carteiras</h2>
      <main>
        <Suspense fallback={<span>loading....</span>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
