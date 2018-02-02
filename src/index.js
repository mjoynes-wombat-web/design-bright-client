/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { Provider } from 'react-redux';
import smartlookClient from 'smartlook-client';

import registerServiceWorker from './registerServiceWorker';
import store from './store';
import App from './App';
import routeRefresh from './helpers/routeRefresh';

if (window.location.hostname === '192.168.86.200') {
  window.React = React;
  window.store = store;
}

const runSmartLook = () => {
  const random = Math.random();
  if (window.location.hostname !== '192.168.86.200') {
    if (random > 0.75) {
      smartlookClient.init('1d08f7a2a54b797ed38a726c1cd770a384a256c4');
    }
  }
};

runSmartLook();

render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <App onComponentDidMount={() => { routeRefresh(); }}/>
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'),
);
registerServiceWorker();
