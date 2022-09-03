import styled from '@emotion/styled';
import { Card } from '~/components/Generic';

export const Container = styled(Card)``;

export const Head = styled.div<{ open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button svg {
    transition: transform 230ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transform: ${({ open }) => open && 'rotate(-180deg)'};
  }
`;

export const Table = styled.table`
  color: ${({ theme }) => theme.palette.text};

  tbody {
    font-size: 1.02rem;

    td:nth-of-type(1),
    td:nth-of-type(3) {
      font-weight: 600;
      padding-right: 6px;
      text-align: left;
    }

    td:nth-of-type(2) {
      text-align: right;
      padding-right: 18px;
    }

    td:nth-of-type(4) {
      text-align: left;
      padding-right: 16px;

      .format-percent {
        position: relative;
        top: -1.5px;
        right: -8px;
        font-size: 0.82rem;
        &::before {
          content: '(';
          position: absolute;
          left: -5px;
          top: 0px;
        }
        &::after {
          content: ')';
          position: absolute;
          right: -6px;
          top: 0;
        }
      }
    }
  }
`;

export const TransactionSection = styled.div`
  padding: 4px;
  margin-top: 10px;

  .info {
    font-size: 0.99rem;
    b {
      padding: 0 4px;
      font-weight: 600;
    }
  }
`;

export const TransactionTable = styled.table`
  border: 1px solid ${({ theme }) => theme.palette.divider};
  margin-top: 6px;
  border-radius: 4px;
  width: 100%;

  border-spacing: 0px;
  border-collapse: separate;
  border-spacing: 0;

  thead {
    color: ${({ theme }) => theme.palette.text};
    height: 24px;
    tr > th {
      font-weight: 600;
    }
  }

  tbody {
    color: ${({ theme }) => theme.palette.text};

    tr {
      white-space: nowrap;
      transition: background-color 85ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      &:nth-of-type(even) {
        background-color: #f4f4f4;
      }
      &:hover {
        background-color: ${({ theme }) => theme.palette.activeBg};
      }

      td {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      td .format-percent {
        position: relative;
        padding-right: 8px;
        font-size: 0.86rem;
        &::before {
          content: '(';
          position: absolute;
          left: -4px;
          top: 0px;
        }
        &::after {
          content: ')';
          position: absolute;
          right: 3px;
          top: 0;
        }
      }

      td .tip {
        padding-left: 2px;
        position: relative;
        top: 1.5px;
        svg {
          position: relative;
          font-size: 0.92rem;
        }
      }

      td:first-of-type {
        text-transform: capitalize;
        padding-left: 8px;
      }

      td:nth-of-type(2) {
        text-align: right;
      }

      td:last-of-type {
        padding-right: 8px;
        text-align: right;
      }
    }
  }
`;
