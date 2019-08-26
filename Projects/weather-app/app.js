const request = require('request');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const addr = process.argv[2]
if(!addr) {
    console.log('Please provide an address')
} else {
    geocode(addr, (error, {latitude, longitude, location}) => {
        if(error) {
            return console.log(error);
        }
        forecast(latitude, longitude, (error, {summary, temperature, precip}) => {
            if(error) {
                return console.log(error);
            }
            console.log(location);
            console.log(summary + " It is currently " + temperature + " degrees out. There is a " + precip + "% chance of rain.")
        });    
    });
}
// const url = 'https://api.darksky.net/forecast/f657bb914aca0e2d923c948887331185/36.2168,81.6746?lang=fr';
// const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZGF2aXNqYjIiLCJhIjoiY2p6c2ZpcGQ5MDAzNTNjcWpmbnk0NmttYSJ9.ZYy2f149OxANzrwkMVYn5A&limit=1';

// request({url: url2, json: true}, (error, response) => {
//     //console.log(response.body.currently);
//     if(error) {
//         console.log("Unable to connect to location services!");
//     } else if(response.body.features.length == 0) {
//         console.log("Unable to find location. Try another search.");
//     } else {
//         const lat = response.body.features[0].geometry.coordinates[1];
//         const long = response.body.features[0].geometry.coordinates[0];
//         console.log(lat, long)
//     }
// });

// request({url: url, json: true}, (error, response) => {
//     if(error) {
//         console.log("Unable to connect to weather service!");
//     } else if(response.body.error) {
//         console.log("Unable to find location");
//     } else {
//         console.log(response.body.daily.data[0].summary + " It is currently " + response.body.currently.temperature 
//             + " degrees out. There is a " + response.body.currently.precipProbability 
//             + "% chance of rain.");
//     }
// });

// console.log('Starting');

// setTimeout(() => {
//     console.log('2 second Timer')
// }, 2000);

// setTimeout(() => {
//     console.log('0 second Timer')
// }, 0)

// console.log('Stopping');