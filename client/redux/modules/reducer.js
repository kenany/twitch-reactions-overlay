// @flow

import { combineReducers, type CombinedReducer } from 'redux';

import emotes, { type EmotesAction } from './emotes';
import type { State } from '../types';

const reducers: CombinedReducer<State, EmotesAction> = combineReducers({
  emotes
});

export default reducers;
