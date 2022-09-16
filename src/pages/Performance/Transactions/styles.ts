import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 4px 0 0 0;
  overflow-x: auto;
  overflow-y: hidden;

  table {
    width: 100%;
    border-spacing: 0px;
    border-collapse: separate;
    border-spacing: 0;

    thead {
      color: ${({ theme }) => theme.palette.text.primary};
      height: 24px;
      tr > th {
        font-weight: 600;
      }
    }

    tbody {
      color: ${({ theme }) => theme.palette.text.primary};

      tr {
        white-space: nowrap;
        transition: background-color 85ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        &:nth-of-type(even) {
          background-color: ${({ theme }) => theme.palette.text.secondary};
        }
        &:hover {
          background-color: ${({ theme }) => theme.palette.text.secondary};
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
            left: -3px;
            top: 0px;
          }
          &::after {
            content: ')';
            position: absolute;
            right: 3px;
            top: 0;
          }
        }
        td:first-of-type {
          padding-left: 4px;
        }
        td:last-of-type {
          padding-right: 4px;
        }
        td:not(:nth-of-type(1)):not(:nth-of-type(2)):not(:nth-of-type(3)) {
          text-align: right;
        }
        td:nth-of-type(2),
        td:nth-of-type(3) {
          text-align: center;
        }
      }
    }
  }
`;
