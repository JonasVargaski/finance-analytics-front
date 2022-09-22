import styled from '@emotion/styled';

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h6 {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.disabled};
    margin-right: 16px;
    max-width: 55vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
