// @flow

import styled from 'preact-emotion';

const EmoteImage = styled('img')`
  position: absolute;
  left: ${({ left }) => left};
  top: ${({ top }) => top};
`;

export default EmoteImage;
