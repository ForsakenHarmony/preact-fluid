import { keyframes } from 'styled-components';

const slideDown = keyframes`
  0% {
    transform-origin: 0 0;
    transform: translateY(0%);
  }

  100% {
    transform-origin: 0 0;
    transform: translateY(100%);
  }
`;

export default slideDown;
