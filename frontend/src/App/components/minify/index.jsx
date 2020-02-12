import React, { useState } from "react";
import styled from "styled-components";
import ApiService from "../../services/api-service";
import loading from "../../../images/loading.svg";

const Minify = () => {
    const [url, setUrl] = useState("");
    const [error, setError] = useState(false);
    const [minified, setMinified] = useState();
    const [loading, setLoading] = useState(false);

    const displayMinified = () => {
        if (error) return <p>Couldn&apos;t minify url</p>;
        return minified && <p><a href={`https://urldo.me/${minified}`}>{`urldo.me/${minified}`}</a></p>;
    };

    const onClickHandler = () => {
        setLoading(true);
        ApiService.minify(url)
            .then((resp) => setMinified(resp.data.URL))
            .catch(() => setError(true))
            .then(() => setLoading(false));
    };

    return (
        <>
            <MinifyStyle>
                <Input placeholder="URL" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                <Button disabled={loading} type="button" onClick={onClickHandler}>Minify</Button>
            </MinifyStyle>
            {displayMinified()}
        </>
    );
};

const Button = styled.button`
    background-color: #30e3f4;
    border: none;
    padding: 0.125rem 0.85rem;
    border-radius: 0.5rem;
    color: #FFFFFF;
    outline: none;
    cursor: pointer;
    box-sizing: padding-box;
    transition: color 0.5s, background-color 0.5s;
    &:hover {
        background-color: #FFFFFF;
        color: #30e3f4;
    }
    &:disabled {
        background: url("${loading}") center no-repeat;
        background-color: #FFFFFF;
        background-size: 40px;
        color: transparent;
    }
    @media only screen and (min-width: 768px) {
        padding: 0.3125rem 1rem;
    }
`;

const Input = styled.input`
    width: 100%;
    background-color: #FFFFFF;
    max-width: 18.75rem;
    padding: 0.125rem 0.3125rem;
    border: none;
    border-radius: 0.5rem;
    outline: none;
    color: #041414;
    margin: 0 0.3125rem;
    @media only screen and (min-width: 768px) {
        padding: 0.3125rem;
    }
`;

const MinifyStyle = styled.div`
    margin: 3rem 0 0 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

export default Minify;
