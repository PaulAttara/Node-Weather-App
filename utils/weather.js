const request = require('request');

const preWeatherUrl = 'https://api.darksky.net/forecast/39b6d9a0f0c679ef3d74adc37b133250/'
const postWeatherUrl = '?units=si'

const weather = (lattitude, longitude, callback) => {
    
    const url = preWeatherUrl + lattitude + ',' + longitude + postWeatherUrl;
    
    request({url, json: true}, (error, {body} ) => {

        if(error) {
            callback('Unable to connect to weather service', undefined);
        }
        else if(body.error) {
            callback(body.error, undefined)
        }
        else{
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature
            })
        } 
    })
}

module.exports = weather