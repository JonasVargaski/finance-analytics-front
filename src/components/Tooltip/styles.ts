import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Container = styled.div<{ unStyled: boolean }>`
  position: fixed;
  transform: scale(1);
  opacity: 0;
  min-width: 10px;
  transition-property: opacity, transform;
  transform-origin: center center;
  border-radius: 4px;
  z-index: 9999;
  box-shadow: 0 0 3px -1px rgba(0, 0, 0, 0.4);

  ${({ unStyled, theme }) =>
    !unStyled &&
    css`
      background-color: ${theme.components.tooltip.background};
      color: ${theme.components.tooltip.color};
      padding: 6px 10px;
      font-size: 0.77rem;
      line-height: 0.9rem;
      max-width: 300px;
      word-wrap: break-word;
      white-space: pre-wrap;
      text-align: left;
    `}

  &::after {
    content: '';
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    border-color: rgba(0, 0, 0, 0);
    border-width: 6px;
  }

  &._tooltip--top::after {
    top: 100%;
    left: 50%;
    margin-left: -6px;
    border-top-color: ${({ theme }) => theme.components.tooltip.background};
  }
  &._tooltip--bottom::after {
    bottom: 100%;
    left: 50%;
    margin-left: -6px;
    border-bottom-color: ${({ theme }) => theme.components.tooltip.background};
  }
  &._tooltip--left::after {
    top: 50%;
    left: 100%;
    margin-top: -6px;
    border-left-color: ${({ theme }) => theme.components.tooltip.background};
  }
  &._tooltip--right::after {
    top: 50%;
    right: 100%;
    margin-top: -6px;
    border-right-color: ${({ theme }) => theme.components.tooltip.background};
  }
  &._tooltip--top-start::after {
    top: 100%;
    left: 0%;
    margin-left: 10px;
    border-top-color: ${({ theme }) => theme.components.tooltip.background};
  }
  &._tooltip--top-end::after {
    top: 100%;
    right: 0%;
    margin-right: 10px;
    border-top-color: ${({ theme }) => theme.components.tooltip.background};
  }
  &._tooltip--bottom-start::after {
    bottom: 100%;
    left: 0%;
    margin-left: 10px;
    border-bottom-color: ${({ theme }) => theme.components.tooltip.background};
  }
  &._tooltip--bottom-end::after {
    bottom: 100%;
    right: 0%;
    margin-right: 10px;
    border-bottom-color: ${({ theme }) => theme.components.tooltip.background};
  }
  &._tooltip--left-start::after {
    top: 10px;
    left: 100%;
    border-left-color: ${({ theme }) => theme.components.tooltip.background};
  }
  &._tooltip--left-end::after {
    bottom: 10px;
    left: 100%;
    border-left-color: ${({ theme }) => theme.components.tooltip.background};
  }
  &._tooltip--right-start::after {
    top: 10px;
    right: 100%;
    border-right-color: ${({ theme }) => theme.components.tooltip.background};
  }
  &._tooltip--right-end::after {
    bottom: 10px;
    right: 100%;
    border-right-color: ${({ theme }) => theme.components.tooltip.background};
  }
`;
