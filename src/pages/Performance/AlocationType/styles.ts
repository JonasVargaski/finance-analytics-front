import styled from '@emotion/styled';

export const TableInfo = styled.table`
  margin-left: auto;
  padding-right: 3px;
  color: ${({ theme }) => theme.palette.text};
  td:nth-of-type(1) {
    padding-right: 5px;
  }
  td:nth-of-type(2) {
    padding-right: 14px;
  }
  td:nth-of-type(3) {
    padding-right: 10px;
    text-align: end;
  }
  td:nth-of-type(4) {
    text-align: end;
  }
  tr.totals > td {
    padding-top: 6px;
    &:nth-of-type(2) {
      text-align: right;
    }
  }
`;
