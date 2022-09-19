import styled from '@emotion/styled';

export const TipContainer = styled.div`
  padding-left: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.text.secondary};
  svg {
    background-color: transparent;
    font-size: 17px;
  }
`;
