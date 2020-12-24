// @flow
// @jsx h

import { h } from 'preact';
import type { StatelessFunctionalComponent as SFC } from 'react';
import { css } from 'emotion';

type Props = {
  left: string,
  src: string,
  top: string
};

const EmoteImage: SFC<Props> = ({ left, src, top }: Props) => {
  const style = css`
    position: absolute;
    left: ${left};
    top: ${top};
  `;
  return <img className={style} src={src} />;
};

export default EmoteImage;
