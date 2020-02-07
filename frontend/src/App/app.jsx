import * as React from "react";
import styled from "styled-components";
import Minify from "./components/minify";
import logo from "../images/logo.png";

const App = () => (
    <BodyContainerStyle>
        <MainContainerStyle>
            <LogoStyle src={logo} alt="URL Dome" />
            <Minify />
        </MainContainerStyle>
    </BodyContainerStyle>
);

const BodyContainerStyle = styled.div`
    background-color: #041414;
    padding: 2rem;
    height: 100%;
    color: #FFFFFF;
`;

const MainContainerStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
`;

const LogoStyle = styled.img`
    max-width: 30rem;
    width: 100%;
    height: auto;
    margin: 0 auto;
`;

export default App;
