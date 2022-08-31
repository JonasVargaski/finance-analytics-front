import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: 150px;
`;

export const CustomTip = styled.div`
  background-color: ${({ theme }) => theme.palette.foreground};
  box-shadow: ${({ theme }) => theme.shadows.card};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  gap: 6px;
  padding: 5px 7px;
  box-shadow: 0 0 9px -2px rgba(0, 0, 0, 0.3);
`;
