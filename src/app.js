const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express(); // path being used

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location
// Handlebars is not a static directory and can change with the user
app.set('view engine', 'hbs'); // the first arg must be this one, u can check the doc at expressjs.com
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//  ALL THE REQUESTS FOR THE WEBPAGES BELOW!

// using views as the index
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Danilo Correia'
    });
})

// views again for about.hbs
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Danilo Correia'
    });
})

// views for /help
app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'Msg from app.js!',
        title: 'Help',
        name: 'Danilo Correia'
    });
})

// this is where u get all the api
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

// app.com
// app.com/help
// app.com/about

// helps sections no listed error
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help article not found!',
        name: 'Danilo Correia'
    });
})

// error 404 must  be the last
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found',
        name: 'Danilo Correia'
    })
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000');
})