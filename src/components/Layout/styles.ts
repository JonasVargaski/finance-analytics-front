import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 20px 0 0 20px;
  margin: 0 auto;
  background: ${({ theme }) => theme.palette.background.default};
  display: grid;
  grid-template-areas: 'nav header' 'nav main';
  grid-template-columns: 260px 1fr;
  grid-template-rows: 70px 1fr;
  gap: 25px;
`;

export const Header = styled.header`
  grid-area: header;
  border-radius: 16px;
  padding: 9px 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 20px;
  box-shadow: ${({ theme }) => theme.shadows[1]};
  background-color: ${({ theme }) => theme.palette.background.paper};

  svg {
    font-size: 1.8rem;
  }
`;

export const NavSidebar = styled.nav`
  grid-area: nav;
  border-radius: 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px 12px;
  margin-bottom: 20px;
  box-shadow: ${({ theme }) => theme.shadows[1]};
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

export const Main = styled.main`
  grid-area: main;
  overflow-y: auto;
  position: relative;
  padding-right: 12px;
  padding-bottom: 20px;
  scrollbar-gutter: stable;
`;
