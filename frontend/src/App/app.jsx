import * as React from 'react';
import styled from 'styled-components';
import Minify from './components/minify';
import ApiService from './services/api-service';

const App = () => (
    <BodyContainerStyle>
        <Minify />
    </BodyContainerStyle>
);

const BodyContainerStyle = styled.div`
    background-color: #e8e8e8;
    height: 100%;
`;

export default App;
