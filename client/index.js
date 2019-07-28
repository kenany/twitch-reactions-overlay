// @flow
// @jsx h

import { h, render } from 'preact';
import { Provider } from 'react-redux';
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

render(
  <Provider store={store}>
    <App socket={initSocket()} />
  </Provider>,
  // $FlowFixMe
  document.body
);
