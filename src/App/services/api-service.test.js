import Axios from 'axios';
import ApiService from './api-service';

describe('API', () => {
    it('fetchs minified url from the API', (done) => {
        Axios.post = jest.fn().mockResolvedValue({ status: 204 });

        new ApiService('http://localhost/')
            .minify('https://www.google.com')
            .then((response) => {
                expect(Axios.post).toHaveBeenCalledWith('http://localhost/api/minify', {
                    url: 'https://www.google.com',
                    expiration: 60,
                });
                expect(response.status).toBe(204);
                done();
            });
    });
});
