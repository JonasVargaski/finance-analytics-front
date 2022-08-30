import styled from '@emotion/styled';

export const Container = styled.div`
  margin: 10px 0 0;
  width: 100%;
  height: 200px;
`;

export const CustomTip = styled.div`
  color: ${({ theme }) => theme.palette.activeText};
  font-size: 14px;
  background-color: ${({ theme }) => theme.palette.foreground};
  box-shadow: ${({ theme }) => theme.shadows.card};
  gap: 6px;
  padding: 5px 7px;
  display: flex;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 9px -2px rgba(0, 0, 0, 0.3);
`;

export const Indicator = styled.span<{ color: string }>`
  box-shadow: ${({ theme }) => theme.shadows.card};
  background-color: ${({ color }) => color};
  width: 13px;
  height: 13px;
  display: block;
`;
