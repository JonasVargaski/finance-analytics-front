import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const Result = styled.div`
  margin-top: 16px;
  display: grid;
  grid-gap: 28px;
  grid-template-columns: repeat(auto-fit, minmax(380px, 0.5fr));
  align-items: flex-start;
  align-self: flex-start;
`;

export const InfoHeader = styled.table`
  color: ${({ theme }) => theme.palette.text.secondary};
  width: fit-content;
  white-space: nowrap;

  tbody {
    font-size: 1.02rem;

    td:nth-of-type(1),
    td:nth-of-type(3) {
      font-weight: 600;
      padding-right: 3px;
      text-align: left;
    }

    td:nth-of-type(2),
    td:nth-of-type(4) {
      padding-right: 18px;
    }
  }
`;

export const AssembledTable = styled.table`
  white-space: nowrap;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  margin-top: 4px;
  border-radius: 4px;
  width: 100%;

  border-spacing: 0px;
  border-collapse: separate;
  border-spacing: 0;

  thead {
    color: ${({ theme }) => theme.palette.text.secondary};
    height: 24px;
    tr > th {
      font-weight: 600;
    }
  }

  tbody {
    color: ${({ theme }) => theme.palette.text.secondary};

    tr {
      white-space: nowrap;
      transition: background-color 85ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

      &:nth-of-type(even) {
        background-color: ${({ theme }) => theme.palette.background.striped};
      }

      &:hover {
        background-color: ${({ theme }) => theme.palette.action.hover};
      }

      td {
        padding-top: 5px;
        padding-bottom: 5px;
        text-align: center;
      }
    }

    tr:last-of-type > td {
      padding-top: 8px;
      padding-bottom: 8px;
      background-color: ${({ theme }) => theme.palette.background.paper};
      font-weight: 600;
      font-size: 1.09rem;
    }
  }
`;
