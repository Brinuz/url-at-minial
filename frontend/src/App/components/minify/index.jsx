import React, { useState } from 'react';
import styled from 'styled-components';
import ApiService from '../../services/api-service';

const Minify = () => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState(false);
    const [minified, setMinified] = useState();

    const displayMinified = () => {
        if (error) return <p>Couldn&apos;t minify url</p>;
        return minified && <a href={"http://urldo.me/" + minified}>{"urldo.me/" + minified}</a>;
    };

    const onClickHandler = () => {
        ApiService.minify(url)
            .then((resp) => setMinified(resp.data.URL))
            .catch(() => setError(true));
    };

    return (
        <MinifyStyle>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
            <button type="button" onClick={onClickHandler}>Minify</button>
            {displayMinified()}
        </MinifyStyle>
    );
};

const MinifyStyle = styled.div`
    padding-top: 20%;
    width: 100%;
    text-align: center;
`;

export default Minify;
