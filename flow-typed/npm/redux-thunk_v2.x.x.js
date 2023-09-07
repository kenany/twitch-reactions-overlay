// flow-typed signature: d6daf4f8afc2aaf522648af2b9b46ade
// flow-typed version: 9a968c602c/redux-thunk_v2.x.x/flow_>=v0.201.x

// Copied types from redux so that
// redux-thunk can be used with redux and redux-mock-store.
//
// This should be replaced with imports in the not too distant future once we
// figure out cross dependency imports in flow-typed
declare module '@@redux' {
  declare export type DispatchAPI<A> = (action: A) => A;

  declare export type Dispatch<A: { type: any, ... }> = DispatchAPI<A>;

  declare export type MiddlewareAPI<S, A, D = Dispatch<A>> = {
    dispatch: D,
    getState(): S,
    ...
  };

  declare export type Middleware<S, A, D = Dispatch<A>> = (
    api: MiddlewareAPI<S, A, D>
  ) => (next: D) => D;
}

declare module 'redux-thunk' {
  import type { Middleware } from '@@redux';

  declare export type Thunk = Middleware<any, any> & {|
    withExtraArgument(arg: $NonMaybeType<mixed>): Middleware<any, any>,
  |};

  declare module.exports: Thunk;
}
