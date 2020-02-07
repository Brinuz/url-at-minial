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
    padding: 0.125rem 0.85rem;
    border-radius: 0.125rem;
    color: #FFFFFF;
    outline: none;
    cursor: pointer;
    &:hover {
        background-color: #FFFFFF;
        border-color: #FFFFFF;
        color: #30e3f4;
    }
    @media only screen and (min-width: 768px) {
        padding: 0.3125rem 1rem;
    }
`;

const Input = styled.input`
    width: 100%;
    background-color: transparent;
    max-width: 18.75rem;
    padding: 0.125rem 0.125rem;
    border-width: 0 0 0.0625rem 0;
    border-color: #30e3f4;
    outline: none;
    color: #FFFFFF;
    @media only screen and (min-width: 768px) {
        padding: 0.3125rem 0.125rem;
    }
`;

const MinifyStyle = styled.div`
    margin: 3rem 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

export default Minify;
