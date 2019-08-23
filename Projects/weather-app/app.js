const request = require('request');

const url = 'https://api.darksky.net/forecast/f657bb914aca0e2d923c948887331185/36.2168, 81.6746';

request({url: url, json: true}, (error, response) => {
    console.log(response.body.currently);
});

// console.log('Starting');

// setTimeout(() => {
//     console.log('2 second Timer')
// }, 2000);

// setTimeout(() => {
//     console.log('0 second Timer')
// }, 0)

// console.log('Stopping');