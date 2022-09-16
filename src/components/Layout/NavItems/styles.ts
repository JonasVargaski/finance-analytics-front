import styled from '@emotion/styled';

export const Container = styled.ul`
  width: 100%;
  li + li {
    margin-top: 8px;
  }

  li,
  a {
    color: ${({ theme }) => theme.palette.text};
  }

  li {
    position: relative;
    a {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 14px;
      font-weight: 600;
      text-decoration: none;
      border-radius: 6px;
      padding: 12px 14px;
      transition: background-color 100ms ease-in-out;

      &.active {
        background-color: ${({ theme }) => theme.palette.activeBg};
        color: ${({ theme }) => theme.palette.activeText};
      }

      &:hover {
        background-color: ${({ theme }) => theme.palette.activeBg};
      }

      svg {
        font-size: 1.6rem;
      }
    }
  }
`;
