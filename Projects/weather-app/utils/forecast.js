const request = require('request');

const forecast = (lat, lng, callback) => {
    const url = 'https://api.darksky.net/forecast/f657bb914aca0e2d923c948887331185/' + encodeURIComponent(lat) + ',' + encodeURIComponent(lng);
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather services', undefined);
        } else if(body.error) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precip: body.currently.precipProbability
            })
        }
    });
}

module.exports = forecast;