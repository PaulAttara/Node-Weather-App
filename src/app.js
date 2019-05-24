const express = require('express')
const request = require('request');

const geoCode = require('../utils/geocode')
const weather = require('../utils/weather')

const path = require('path');
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000 // heroku || local

// Define path for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars congif and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup statid directory to serve
app.use(express.static(publicDirPath))

// Setup Roots
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Paul Attara'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Paul Attara'
    })
})


app.get('/weather', (req, res) => {

    input = req.query.address

    if(!input) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(input, (error, {lattitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }    
    
        weather(lattitude, longitude, (error, weatherData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                location,
                summary: weatherData.summary,
                temperature: weatherData.temperature + '°C'
            })
        });
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Paul Attara'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found'
    })  
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found'
    })
})
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

 