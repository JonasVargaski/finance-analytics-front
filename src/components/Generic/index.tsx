import styled from '@emotion/styled';

export const Card = styled.div`
  padding: 12px;
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  background-color: ${({ theme }) => theme.palette.foreground};
`;
