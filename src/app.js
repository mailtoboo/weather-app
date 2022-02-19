const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather app',
		name: 'Boopathy',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Boopathy',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		content: 'Help page',
		name: 'Boopathy',
	});
});

app.get('/weather', (req, res) => {
	const address = req.query.address;
	if (!address) {
		return res.send({
			error: 'You must provide an address!',
		});
	}

	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error });
			}
			forecast(latitude, longitude, (error, forecastData) => {
				if (error) {
					return res.send({ error });
				}
				res.send({
					forecast: forecastData,
					location,
					address: req.query.address,
				});
			});
		}
	);

	// res.send({
	// 	forecast: 'It is snowing',
	// 	location: 'Philadelphia',
	// 	address,
	// });
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Andrew Mead',
		errorMessage: 'Help article not found.',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Boopathy',
		errorMessage: 'Page not found.',
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});