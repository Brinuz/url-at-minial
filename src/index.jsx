import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import App from './App/app';

const GlobalStyle = createGlobalStyle``;

ReactDOM.render(
    <>
        <GlobalStyle />
        <App />
    </>,
    document.getElementById('app'),
);
