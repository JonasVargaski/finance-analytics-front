import styled from '@emotion/styled';
import { Card } from '~/components/Generic';

export const Container = styled(Card)<{ color: string }>`
  overflow: hidden;
  position: relative;
  min-width: 250px;
  padding-top: 8px;

  hr {
    margin: 1px -3px 6px -3px;
    border: none;
    border-radius: 10px;
    height: 6px;
    background-color: red;
    background-color: ${({ color }) => color};
    box-shadow: 0 0 1.5px 0px ${({ color }) => color};
  }

  .title {
    justify-content: space-between;
    p {
      font-weight: 600;
      color: ${({ color }) => color};
    }
  }
`;

export const Results = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 6px;
  padding-left: 4px;

  .currency {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .percent {
    font-size: 1.05rem;
    padding-left: 12px;
    position: relative;
    bottom: -4px;
    opacity: 0.9;
  }
`;
