const express = require('express');
const path = require('path');
const app = express()
const hbs = require('hbs')

const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.use(express.static(publicDir))
hbs.registerPartials(partialsPath)
app.set('views', viewsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Brooke Tibbett'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'helpful text',
        title: 'Help',
        name: 'Brooke Tibbett'
    });
})

app.get('/about', (req, res) => {
     res.render('about', {
         title: 'About',
         name: 'Brooke Tibbett'
     });
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Sunny',
        location: 'Boone'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Brooke Tibbett',
        error: 'Help article not found.'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Brooke Tibbett',
        error: 'Page Not Found'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});