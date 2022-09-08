import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-areas:
    'alocation-graph alocation-graph totals'
    'alocation-type-graph alocation-type-graph totals'
    'provents-graph provents-graph provents-graph'
    'dy-graph dy-graph dy-graph'
    'transactions transactions transactions'
    'details details details';
  grid-auto-rows: auto;
  grid-template-columns: 0.5fr 0.5fr minmax(275px, auto);
  grid-gap: 12px;

  @media (min-width: 1780px) {
    grid-template-areas:
      'alocation-graph alocation-type-graph totals'
      'provents-graph provents-graph totals'
      'dy-graph dy-graph dy-graph'
      'transactions transactions transactions'
      'details details details';
    align-items: flex-start;
    align-self: flex-start;
  }
`;

export const Totals = styled.div`
  grid-area: totals;
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  grid-auto-rows: auto;
  align-items: flex-start;
  align-self: flex-start;
`;

export const Details = styled.div`
  grid-area: details;
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  align-items: flex-start;
  align-self: flex-start;
`;
