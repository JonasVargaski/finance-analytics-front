import styled from '@emotion/styled';

export const Container = styled.ul`
  display: grid;
  grid-gap: 1.3rem;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  grid-auto-rows: auto;
`;

export const Card = styled.li`
  padding: 12px;
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  background-color: ${({ theme }) => theme.palette.foreground};
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
