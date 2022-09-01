import styled from '@emotion/styled';

export const Container = styled.ul`
  display: grid;
  grid-gap: 1.3rem;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-auto-rows: auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h6 {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.title};
    margin-right: 16px;
    max-width: 55vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const AlocationTable = styled.table`
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
