// @flow
// @jsx App

import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import WebSocket from 'reconnecting-websocket';

import createStore from './redux/create-store';
import App from './containers/App';

if (process.env.NODE_ENV !== 'production') {
  require('preact/debug');
}

const store = createStore();

function initSocket() {
  const socket = new WebSocket(process.env.WS_ADDRESS);
  return socket;
}

render((
  <div className='outer'>
    <Provider store={store}>
      <App socket={initSocket()} />
    </Provider>
  </div>
), document.body);
