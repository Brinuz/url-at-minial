import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ApiService from '../../services/api-service';

const Minify = ({ api }) => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState(false);
    const [minified, setMinified] = useState();

    const displayMinified = () => {
        if (error) return <p>Couldn&apos;t minify url</p>;
        return minified && <p>{minified}</p>;
    };

    const onClickHandler = () => {
        api.minify(url)
            .then((resp) => setMinified(resp.data.minified))
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

Minify.propTypes = {
    api: PropTypes.instanceOf(ApiService).isRequired,
};
export default Minify;
