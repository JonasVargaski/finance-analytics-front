import styled from '@emotion/styled';

function getWidthGrid(value: string | number) {
  if (!value) return null;
  let cols = Number(value);
  if (cols > 12) cols = 12;
  return `width: ${(cols / 12) * 100}%`;
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
  ${({ xs }) => (xs ? getWidthGrid(xs) : 'width:100%')};

  @media (min-width: 768px) {
    ${({ sm }) => sm && getWidthGrid(sm)};
  }

  @media (min-width: 992px) {
    ${({ md }) => md && getWidthGrid(md)};
  }

  @media (min-width: 1200px) {
    ${({ lg }) => lg && getWidthGrid(lg)};
  }
`;
