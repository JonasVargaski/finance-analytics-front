import styled from '@emotion/styled';

export const Card = styled.div`
  padding: 12px;
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.custom.shadows[0]};
  background-color: ${({ theme }) => theme.palette.background.paper};
`;
