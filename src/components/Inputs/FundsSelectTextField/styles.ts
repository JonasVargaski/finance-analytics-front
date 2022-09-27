import styled from '@emotion/styled';

export const Option = styled.li`
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  cursor: pointer;
  margin: 3px 0;

  &:hover {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.palette.action.hover};
  }

  b {
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.primary};
  }
  p {
    font-size: 11px;
    line-height: 12px;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;
