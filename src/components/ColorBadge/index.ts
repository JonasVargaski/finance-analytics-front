import styled from '@emotion/styled';

export const ColorBadge = styled.span<{ color: string }>`
  display: block;
  box-shadow: ${({ theme }) => theme.custom.shadows[0]};
  background-color: ${({ color }) => color};
  width: 14px;
  height: 14px;
  border-radius: 2px;
`;
