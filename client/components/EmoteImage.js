import { keyframes } from 'emotion';
import styled from 'preact-emotion';

const fade = keyframes`
  50% { opacity: 1 }
`;

const EmoteImage = styled('img')`
  position: absolute;
  left: ${({ left }) => left};
  top: ${({ top }) => top};
  opacity: 0;
  animation: ${fade} 4s linear forwards;
`;

export default EmoteImage;
