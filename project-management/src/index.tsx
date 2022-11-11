import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { setupStore } from 'store/store';
import { Provider } from 'react-redux';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
