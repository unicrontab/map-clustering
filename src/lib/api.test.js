import api from './api';
import config from '../config';


const successJson = () => ({success: true});
const success = { status: 200, json: successJson };
const urlSuccess = { status: 200, json: () => ({ urlSuccess: true })};
const failure = { status: 500, text: () => 'error'};


const response = (url, {method, headers, body }) => new Promise((resolve, reject) => {
    if (url === 'test/success') resolve(success);
    if (url === config.api.URL + '/success') resolve(urlSuccess);
    if (url === 'test/failure') resolve(failure);
});


beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(response)
});

test('API makes valid requests', async () => {
    const response = await api({
        url: 'test',
        path: '/success',
        body: { data: 'test' },        
    })
    expect(response.success).toBeTruthy();
});

test('API makes valid requests with default URL', async () => {
    const response = await api({
        path: '/success',
        body: { data: 'test' },        
    })
    expect(response.urlSuccess).toBeTruthy();
});


test('API makes valid requests without body', async () => {
    const response = await api({
        url: 'test',
        path: '/success',        
    })
    expect(response.success).toBeTruthy();
});

test('API handles non 200 responses', async () => {
    const badResponse = api({
        url: 'test',
        path: '/failure',        
    });
    expect(badResponse).rejects.toHaveProperty('message','error');
    
});
