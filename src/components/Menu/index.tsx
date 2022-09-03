import styled from '@emotion/styled';

export const Menu = styled.ol`
  padding: 4px 0 3px 0;
  border-radius: 4px;
  min-width: 170px;
  color: ${({ theme }) => theme.palette.activeText};
  background-color: ${({ theme }) => theme.palette.foreground};
  box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px, rgb(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(0, 0, 0, 0.1) 0px 10px 15px -3px, rgb(0, 0, 0, 0.05) 0px 4px 6px -2px;
`;

export const MenuItem = styled.li`
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  line-height: 1.5;
  padding: 7px 14px;
  margin-bottom: 1px;
  transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    background-color: ${({ theme }) => theme.palette.activeBg};
  }

  &:hover:active {
    filter: brightness(95%);
  }
`;
