import React, { useState } from 'react';
import styled from 'styled-components';
import ApiService from '../../services/api-service';

const Minify = () => {
    const [url, setUrl] = useState('');
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
    background-color: #EF8354;
    border-color: #EF8354;
    padding: 5px 15px;
    border-radius: 2px;
    color: #EAEAEA;
    outline: none;
    cursor: pointer;
    &:hover {
        background-color: #E8C547;
        border-color: #E8C547;
    }
`;

const Input = styled.input`
    width: 100%;
    background-color: transparent;
    max-width: 300px;
    padding: 5px 2px;
    border-width: 0 0 1px 0;
    border-color: #EF8354;
    outline: none;
`;

const MinifyStyle = styled.div`
    padding-top: 20%;
    width: 100%;
    text-align: center;
`;

export default Minify;
