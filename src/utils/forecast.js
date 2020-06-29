request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=768fb044191300ff63fd687a96a59e0a&query='+ latitude + ','+longitude + '&units=m';

    request({url: url, json: true}, (error, {body} = {}) => { // this line is super important and uses destruction
        if(error) {
            callback('Unable to connect to location services.', undefined); // only error is passed
        } else if (body.error) {
            callback('Unable to find the location. Try another search.', undefined); // same here
        } else {
            const temperature = body.current.temperature;
            const feelsLike = body.current.feelslike;
            const weatherDescrip = body.current.weather_descriptions;
            callback(undefined, weatherDescrip + '. It is currently ' + temperature + ' degrees Celsius out, and feels like ' + feelsLike + ".");
        }
    })
}

module.exports = forecast;