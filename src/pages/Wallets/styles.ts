import styled from '@emotion/styled';

export const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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
  height: 36px;

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
