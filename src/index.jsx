import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// COMPONENTS
import App from 'App';
import store from './store/index';

// GLOBAL STYLESHEETS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
