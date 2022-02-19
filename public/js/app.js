const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const weatherImg = document.getElementById('weather-icon');
const humidity = document.getElementById('humidity');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = search.value;

	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';
	humidity.textContent = '';
	weatherImg.setAttribute('src', '');

	fetch('/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error;
			} else {
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecast;
				humidity.textContent = 'Humidity : ' + data.humidity;
				weatherImg.setAttribute('src', data.weather_icons);
			}
		});
	});
});
