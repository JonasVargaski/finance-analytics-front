import styled from '@emotion/styled';

function getWidthGrid(span: string | number) {
  if (!span) return;
  return `width: ${(Number(span) / 12) * 100}%`;
}

export const Row = styled.div`
  &::after {
    content: '';
    clear: both;
    display: table;
  }
`;

interface ColProps {
  xs?: string | number;
  sm?: string | number;
  md?: string | number;
  lg?: string | number;
}

export const Column = styled.div<ColProps>`
  float: left;
  ${({ xs }) => (xs ? getWidthGrid(xs) : 'width: 100%')}

  @media only screen and (min-width: 768px) {
    ${({ sm }) => sm && getWidthGrid(sm)}
  }

  @media only screen and (min-width: 992px) {
    ${({ md }) => md && getWidthGrid(md)}
  }

  @media only screen and (min-width: 1200px) {
    ${({ lg }) => lg && getWidthGrid(lg)}
  }
`;
