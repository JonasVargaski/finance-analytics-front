import styled from '@emotion/styled';

export const Container = styled.ul`
  display: grid;
  grid-gap: 1.3rem;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h6 {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.title};
    margin-right: 16px;
    max-width: 55vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
