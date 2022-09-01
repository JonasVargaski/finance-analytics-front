import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-areas: 'alocation-graph alocation-graph totals' 'alocation-type-graph alocation-type-graph totals' 'provents-graph provents-graph provents-graph';
  grid-template-rows: auto 1fr;
  grid-template-columns: 0.5fr 0.5fr minmax(280px, auto);
  grid-gap: 12px;
`;

export const Totals = styled.div`
  grid-area: totals;
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-auto-rows: auto;
  align-items: flex-start;
  align-self: flex-start;
`;
