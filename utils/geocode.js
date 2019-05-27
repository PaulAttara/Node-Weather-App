const request = require('request');

const preGeocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const postGeocodeUrl = '.json?access_token=pk.eyJ1IjoicGF1bGF0dGFyYSIsImEiOiJjanZzNnM4d2gzMm4xNDNvanBjbWVtMmtuIn0.OmGL0Hllykh942wtnLHEFQ&limit=1'

const geoCode = (address, callback) => {
    
    const url = preGeocodeUrl + encodeURIComponent(address) + postGeocodeUrl;
    
    request({url, json: true}, (error, {body}) => {

        if(error) {
            callback('Unable to connect to location service', undefined)
        }
        else if(body.features.length === 0) {
            callback('Unable to find location. Try again', undefined)
        }
        else{
            callback(undefined, {
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode