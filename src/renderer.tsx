import * as React from 'react';
import { FC } from 'react';
import * as ReactDOM from 'react-dom';

import { Top } from './components/pages/Top';

import './renderer.css';

export interface IElectronAPI {
  doAnything: () => Promise<void>;
}

declare global {
  interface Window {
    myAPI: IElectronAPI;
  }
}

const App: FC = () => (
  <>
    <Top />
    <button
      onClick={() => {
        window.myAPI.doAnything().catch((err) => console.error(err));
      }}
    >
      ElectronAPI
    </button>
  </>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
