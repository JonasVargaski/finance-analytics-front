import styled from '@emotion/styled';
import { Card } from '~/components/Generic';

export const Container = styled.div`
  height: 100%;
  overflow-y: auto;
  position: relative;
  padding-bottom: 70px;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  gap: 20px;
  width: 100%;
  text-align: center;

  img {
    max-width: 22%;
  }
`;

export const Actions = styled(Card)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
