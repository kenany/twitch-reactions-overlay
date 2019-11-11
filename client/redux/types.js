// @flow

import type {
  EmotesAction,
  Dispatch as EmotesDispatch,
  EmotesState
} from './modules/emotes';

export type Action = EmotesAction;
export type Dispatch = EmotesDispatch;
export type State = {
  +emotes: EmotesState
};
