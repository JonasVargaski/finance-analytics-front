import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { fbTracking } from './utils/fbTracking';

fbTracking.grantConsent();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
