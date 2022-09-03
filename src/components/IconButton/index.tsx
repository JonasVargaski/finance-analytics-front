import styled from '@emotion/styled';

export const IconButton = styled((props: React.HTMLProps<HTMLButtonElement>) => (
  <button {...props} tabIndex={0} type='button' />
))`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  user-select: none;
  flex: 0 0 auto;
  color: inherit;
  border-radius: 50%;
  padding: 6px;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  > svg {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.palette.text};
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.palette.activeBg};
  }

  &:not(:disabled):active {
    filter: brightness(90%);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
