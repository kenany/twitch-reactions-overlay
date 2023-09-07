// @flow

import { combineReducers, type Reducer } from 'redux';

import emotes, { type EmotesAction } from './emotes';
import type { State } from '../types';

const reducers: Reducer<State, EmotesAction> = combineReducers({
  emotes
});

export default reducers;
