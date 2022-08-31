import styled from '@emotion/styled';

export const Container = styled.div`
  position: fixed;
  z-index: 99;
  opacity: 0;
  transform: scale(0.75);
  min-width: 1px;
  transform-origin: center center;
  transition: opacity 211ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 85ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

export const Backdrop = styled.div`
  position: absolute;
  z-index: 98;
  background-color: transparent;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
