import styled from '@emotion/styled';

export const ColorBadge = styled.span<{ color: string }>`
  display: block;
  box-shadow: ${({ theme }) => theme.shadows.card};
  background-color: ${({ color }) => color};
  width: 14px;
  height: 14px;
  border-radius: 2px;
`;
