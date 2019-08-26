const https = require('https');
const url = 'https://api.darksky.net/forecast/f657bb914aca0e2d923c948887331185/40,-75';

const request = https.request(url, (response) => {
    let data = ''
    response.on('data', (chunk) => {
        data = data + chunk.toString();
    })
    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    })
});

request.on('error', (error) => {
    console.log(error);
});

request.end();