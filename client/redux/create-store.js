// @flow

import {
  applyMiddleware,
  createStore as reduxCreateStore,
  type Store
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducer from './modules/reducer';
import type { Action, Dispatch, State } from './types';

function createStore(): Store<State, Action, Dispatch> {
  const store = reduxCreateStore<State, Action, Dispatch>(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
}

export default createStore;
