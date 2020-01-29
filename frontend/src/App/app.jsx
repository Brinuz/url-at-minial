import * as React from "react";
import styled from "styled-components";
import Minify from "./components/minify";

const App = () => (
    <BodyContainerStyle>
        <Minify />
    </BodyContainerStyle>
);

const BodyContainerStyle = styled.div`
    background-color: #EAEAEA;
    height: 100%;
`;

export default App;
