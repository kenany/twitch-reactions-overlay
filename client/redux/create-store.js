// @flow
import { applyMiddleware, createStore as reduxCreateStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducer from './modules/reducer';

function createStore() {
  const store = reduxCreateStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
}

export default createStore;
