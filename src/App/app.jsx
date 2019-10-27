import * as React from 'react';
import styled from 'styled-components';
import Minify from './components/minify';
import ApiService from './services/api-service';

const App = () => (
    <BodyContainerStyle>
        <Minify api={new ApiService('')} />
    </BodyContainerStyle>
);

const BodyContainerStyle = styled.div``;

export default App;
