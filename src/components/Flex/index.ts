import styled from '@emotion/styled';

interface IFlexProps {
  dir?: 'row' | 'col';
  m?: string;
  p?: string;
  g?: string;
  fw?: boolean;
}

export const Flex = styled.div<IFlexProps>`
  display: flex;
  margin: ${({ m }) => m};
  padding: ${({ p }) => p};
  gap: ${({ g }) => g};
  ${({ dir }) => (dir === 'col' ? 'flex-direction: column;' : 'align-items: center;')};
  ${({ fw }) => fw && 'width: 100%'};
`;
