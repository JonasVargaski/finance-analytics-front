import { css } from '@emotion/react';

export const globalStyles = css`
  * {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    font-size: 93.75%; /* 15px */
  }

  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ol,
  ul {
    margin: 0;
    padding: 0;
  }

  ol,
  ul {
    list-style: none;
  }

  img {
    border-style: none;
    max-width: 100%;
    height: auto;
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
  }

  table {
    border-spacing: 1px;
  }

  [disabled] {
    cursor: not-allowed;
  }

  :focus:not(:focus-visible) {
    outline: none;
  }

  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  *::-webkit-scrollbar-track {
    background-color: #444;
    border-radius: 10px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.28);
    border-radius: 10px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.38);
    }
  }

  @media (min-width: 800px) {
    html {
      font-size: 87.5%;
    }
  }
`;
