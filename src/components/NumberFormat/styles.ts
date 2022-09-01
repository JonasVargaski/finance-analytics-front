import styled from '@emotion/styled';

export const Container = styled.span<{ colors: boolean; isNegative: boolean }>`
  color: ${({ theme, colors, isNegative }) => {
    if (!colors) return 'inherit';
    return isNegative ? theme.palette.danger : theme.palette.success;
  }};

  svg {
    font-size: inherit;
    margin-right: 2.5px;
    transform: scale(1.9);
    position: relative;
    top: 2px;
  }
`;
