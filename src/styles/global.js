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
    background-color: ${props => (props.theme.colors.blue800)};
  }
`;

const ThemedApp = ({ children }) => (
  <ThemeProvider theme={Theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default ThemedApp;
