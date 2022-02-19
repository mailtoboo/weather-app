const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=b787812364c1d67e192fa04da48ec30b&query=' +
		latitude +
		',' +
		longitude +
		'&units=f';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to find connect to weather service!');
		} else if (body.error) {
			callback('Unable to find the location!', undefined);
		} else {
			console.log(body.current);
			callback(
				undefined,
				body.current.weather_descriptions[0] +
					'. It is currently ' +
					body.current.temperature +
					' degrees out. It feels like ' +
					body.current.feelslike +
					' degrees out',
				body.current.weather_icons,
				body.current.humidity
			);
		}
	});
};

module.exports = forecast;
