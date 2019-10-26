import * as React from 'react';
import styled from 'styled-components';
import Minify from './components/minify';

const App = () => (
    <BodyContainerStyle>
        <Minify />
    </BodyContainerStyle>
);

const BodyContainerStyle = styled.div``;

export default App;
