import React from 'react'
import  { createRoot } from 'react-dom/client';
import App from './src/App'
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);
document.body.style.backgroundImage = 'url(/static/wood5.jpg)';
document.body.style.backgroundAttachment = 'fixed';
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);