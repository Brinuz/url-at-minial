import Axios from 'axios';

class ApiService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    minify(url, expiration = 60) {
        return Axios.post(`${this.apiUrl}/minify`, { url, expiration });
    }
}

export default ApiService;
