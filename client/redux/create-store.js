// @flow

import { applyMiddleware, createStore as reduxCreateStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducer from './modules/reducer';
import type { Action, Dispatch, State } from './types';

function createStore() {
  const store = reduxCreateStore<State, Action, Dispatch>(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
}

export default createStore;
