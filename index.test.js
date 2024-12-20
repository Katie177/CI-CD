const { add, startServer, stopServer } = require('./index');
const http = require('http');

test('adds 2 + 3 to equal 5', () => {
    expect(add(2, 3)).toBe(5);
});

test('server responds with Hello, World!', async () => {
    await startServer(3000);

    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/',
        method: 'GET',
    };

    const data = await new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                resolve(responseData);
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        req.end();
    });

    expect(data).toBe('Hello, World!');

    await stopServer();
});