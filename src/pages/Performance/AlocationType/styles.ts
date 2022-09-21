import styled from '@emotion/styled';

export const TableInfo = styled.table`
  margin-left: auto;
  padding-right: 3px;
  color: ${({ theme }) => theme.palette.text.secondary};

  thead {
    th {
      font-weight: 600;
      &:nth-of-type(2) {
        text-align: left;
      }
    }
  }

  td .format-percent {
    position: relative;
    top: -1px;
    padding-right: 8px;
    font-size: 0.86rem;
    &::before {
      content: '(';
      position: absolute;
      left: -5px;
      top: 0px;
    }
    &::after {
      content: ')';
      position: absolute;
      right: 3px;
      top: 0;
    }
  }

  td:nth-of-type(1) {
    padding-right: 5px;
  }
  td:nth-of-type(2) {
    padding-right: 14px;
  }
  td:nth-of-type(3) {
    text-align: end;
    white-space: nowrap;
  }
`;
