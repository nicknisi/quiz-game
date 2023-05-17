// import { inspect } from '@xstate/inspect';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GameProvider } from './GameProvider';
import './index.css';

// inspect({
//   iframe: () => document.querySelector<HTMLIFrameElement>('[data-xstate]'),
// });
//
const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <GameProvider>
        <App />
      </GameProvider>
    </Suspense>
  </StrictMode>,
);
