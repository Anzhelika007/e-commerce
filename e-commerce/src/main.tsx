import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Modal from 'react-modal';
import store from './redux/store/store';
import App from './App/App';
import './assets/sass/style.scss';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

Modal.setAppElement('#root'); // for slider card product

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter
        basename={
          process.env.NODE_ENV === 'production'
            ? '/e-commerce-deployment'
            : '/e-commerce'
        }
      >
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
