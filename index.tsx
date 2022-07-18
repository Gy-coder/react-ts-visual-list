import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const data = new Array(10000).fill(0).map((item,index) => index)

root.render(
  <StrictMode>
    <App data={data} />
  </StrictMode>
);
