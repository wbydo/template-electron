import { createTRPCProxyClient } from '@trpc/client';
import type { AppRouter } from '@~/trpc';
import * as React from 'react';
import { createContext } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ipcLink } from './ipc-link';
import { router } from './routes';

const elm = document.getElementById('root');
if (elm == null) throw new Error('root element not found');

const root = ReactDOM.createRoot(elm);

const client = createTRPCProxyClient<AppRouter>({
  links: [ipcLink()],
});

export const ClientContext = createContext<typeof client | null>(null);

root.render(
  <React.StrictMode>
    <ClientContext.Provider value={client}>
      <RouterProvider router={router} />
    </ClientContext.Provider>
  </React.StrictMode>
);
