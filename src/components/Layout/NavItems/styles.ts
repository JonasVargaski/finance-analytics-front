import styled from '@emotion/styled';

export const Container = styled.ul`
  width: 100%;

  a {
    display: inline-block;
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
    text-decoration: none;
    color: ${({ theme }) => theme.palette.text.secondary};

    &.active {
      background-color: ${({ theme }) => theme.palette.background.active};
      color: ${({ theme }) => theme.palette.text.primary};
    }

    li {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 14px;
      font-weight: 600;
      padding: 12px 14px;
    }

    svg {
      color: inherit;
      font-size: 1.6rem;
    }
  }
  a + a {
    margin-top: 5px;
  }
`;
