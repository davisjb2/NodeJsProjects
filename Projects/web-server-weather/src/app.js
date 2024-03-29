const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

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
    if(req.query.address) {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error) {
                return res.send({error});
            }
            forecast(latitude, longitude, (error, {summary, temperature, precip, high, low}) => {
                if(error) {
                    return res.send({error});
                }
                res.send({
                    summary,
                    temperature,
                    precip,
                    location,
                    high,
                    low,
                    address: req.query.address,
                    title: 'Weather',
                    name: 'Brooke Tibbett'

                });
            });    
        });
    } else {
        res.send({
            error: 'Please provide an adddress.'
        })
    }
})

// app.get('/products', (req, res) => {
//     if(!req.query.search) {
//         res.send({
//             error: 'You must provide a search term'
//         })
//     }
// })

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

app.listen(port, () => {
    console.log('Server is up on port 3000');
});