// @flow
// @jsx h

import type { Element, StatelessFunctionalComponent as SFC } from 'react';
import { css } from '@emotion/css';
import { h } from 'preact';
import { CSSTransition } from 'react-transition-group';

type Props = {
  children: Element<any>,
  in?: boolean
};

const fadeEnter = css`
  opacity: 0.01;
`;

const fadeEnterActive = css`
  opacity: 1;
  transition: opacity 1000ms ease-in;
`;

const fadeExit = css`
  opacity: 1;
`;

const fadeExitActive = css`
  opacity: 0.01;
  transition: opacity 1000ms ease-in;
`;

const fadeClassNames = {
  enter: fadeEnter,
  enterActive: fadeEnterActive,
  exit: fadeExit,
  exitActive: fadeExitActive
};

const Fade: SFC<Props> = (props: Props) => (
  <CSSTransition
    classNames={fadeClassNames}
    in={props.in}
    timeout={1000}
    unmountOnExit={true}
  >
    {props.children}
  </CSSTransition>
);

export default Fade;
