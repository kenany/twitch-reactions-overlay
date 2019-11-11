// @flow

import { combineReducers } from 'redux';

import emotes, { type EmotesAction } from './emotes';

export default combineReducers<_, EmotesAction>({
  emotes
});
