import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Theme } from './Theme';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    max-width: 1366px;
    margin: 0 auto;
    background-color: ${props => (props.theme.colors.blue800)};
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const ThemedApp = ({ children }) => (
  <ThemeProvider theme={Theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default ThemedApp;
