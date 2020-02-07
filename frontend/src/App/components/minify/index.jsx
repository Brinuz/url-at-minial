import React, { useState } from "react";
import styled from "styled-components";
import ApiService from "../../services/api-service";

const Minify = () => {
    const [url, setUrl] = useState("");
    const [error, setError] = useState(false);
    const [minified, setMinified] = useState();

    const displayMinified = () => {
        if (error) return <p>Couldn&apos;t minify url</p>;
        return minified && <p><a href={`http://urldo.me/${minified}`}>{`urldo.me/${minified}`}</a></p>;
    };

    const onClickHandler = () => {
        ApiService.minify(url)
            .then((resp) => setMinified(resp.data.URL))
            .catch(() => setError(true));
    };

    return (
        <MinifyStyle>
            <Input placeholder="URL" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
            &nbsp;
            <Button type="button" onClick={onClickHandler}>Minify</Button>
            {displayMinified()}
        </MinifyStyle>
    );
};

const Button = styled.button`
    background-color: #30e3f4;
    border-color: #30e3f4;
    padding: 5px 15px;
    border-radius: 2px;
    color: #FFFFFF;
    outline: none;
    cursor: pointer;
    &:hover {
        background-color: #FFFFFF;
        border-color: #FFFFFF;
        color: #30e3f4;
    }
`;

const Input = styled.input`
    width: 100%;
    background-color: transparent;
    max-width: 300px;
    padding: 5px 2px;
    border-width: 0 0 1px 0;
    border-color: #30e3f4;
    outline: none;
    color: #FFFFFF;
`;

const MinifyStyle = styled.div`
    margin: 3rem 0;
    width: 100%;
    text-align: center;
`;

export default Minify;
