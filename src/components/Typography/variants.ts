import styled from '@emotion/styled';

export const description = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.text};
`;

export const cardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.title};
`;
