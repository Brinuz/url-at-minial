import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle``;

ReactDOM.render(
    <React.Fragment>
        <GlobalStyle />
    </React.Fragment>,
    document.getElementById('app'),
);
