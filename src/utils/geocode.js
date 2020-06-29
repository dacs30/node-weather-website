const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGFjczMwIiwiYSI6ImNrYnR4MTJndzAxeW4ydGxkNm9tODMwc2oifQ.iAe1BrbHRHFeMk0xK-Zp0A&limit=1';
    
    request({url: url, json: true}, (error, {body}={}) => { // using destruction again
        if(error) {
            callback('Unable to connect to location services.', undefined); // only error is passed
        } else if (body.features.length === 0) {
            callback('Location not found. Try another search.', undefined); 
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;