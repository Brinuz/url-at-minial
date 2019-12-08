import React, { useState } from 'react';
import ApiService from '../../services/api-service';

const Minify = () => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState(false);
    const [minified, setMinified] = useState();

    const displayMinified = () => {
        if (error) return <p>Couldn&apos;t minify url</p>;
        return minified && <a href={minified}>{minified}</a>;
    };

    const onClickHandler = () => {
        ApiService.minify(url)
            .then((resp) => setMinified(resp.data.URL))
            .catch(() => setError(true));
    };

    return (
        <div>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
            <button type="button" onClick={onClickHandler}>Minify</button>
            {displayMinified()}
        </div>
    );
};

export default Minify;
