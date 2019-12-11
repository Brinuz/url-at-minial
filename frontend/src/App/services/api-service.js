import Axios from 'axios';

class ApiService {
    static minify(url, expiration = 60) {
        return Axios.post('/api/minify', { url, expiration }, {
            'Content-Type': 'application/json',
        });
    }
}

export default ApiService;
