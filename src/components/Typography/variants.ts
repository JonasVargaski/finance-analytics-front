import styled from '@emotion/styled';

export const description = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const text = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const cardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.secondary};
`;
