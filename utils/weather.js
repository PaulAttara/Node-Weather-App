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
                summary:
                body.daily.data[0].summary 
                + '\nIt is currently ' + body.currently.temperature + '°C. '
                + '\nThe high today is ' + body.daily.data[0].temperatureHigh
                + ' with a low of ' + body.daily.data[0].temperatureLow + '. '
                + '\nThere is a ' + body.currently.precipProbability + '% chance of rain.'
            }
                // {
                // summary: body.daily.data[0].summary,
                // temperature: body.currently.temperature,
                // precipitationProbability: body.currently.precipProbability,
                // windSpeed: body.currently.windSpeed
                // }
            )
        } 
    })
}

module.exports = weather