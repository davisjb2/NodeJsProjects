const express = require('express');
const path = require('path');
const app = express()

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/help', (req, res) => {
    res.send({
        name: 'Brooke',
        age: 23
    });
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>');
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Sunny',
        location: 'Boone'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});