
const submit = document.getElementById("submit");
const cityInput = document.getElementById("city");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind_speed");
const city_name = document.getElementById("city_name");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.getElementById("weather"); 

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '7349c9443emshe2bc2a487e44494p1b6cbajsnbd692fb7b54f', 
		'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
	}
};

const getWeather = (city) => {
	const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;

	fetch(url, options)
		.then(response => response.json())
		.then(data => {
			console.log(data);

			const condition = data.current.condition;

			temperature.innerHTML = `${data.current.temp_c}°C`;
			humidity.innerHTML = `${data.current.humidity}%`;
			wind_speed.innerHTML = `${data.current.wind_kph} km/h`;
			city_name.innerHTML = data.location.name;
			weather.innerHTML = condition.text;

			const weatherText = condition.text.toLowerCase();
			if (weatherText.includes("cloud")) {
				weatherIcon.src = "images/clouds.png";
			} else if (weatherText.includes("sun") || weatherText.includes("clear")) {
				weatherIcon.src = "images/clear.png";
			} else if (weatherText.includes("rain")) {
				weatherIcon.src = "images/rain.png";
			} else if (weatherText.includes("snow")) {
				weatherIcon.src = "images/snow.png";
			} else {
				weatherIcon.src = "images/mist.png";
			}
		})
		.catch(err => {
			console.error("Error:", err);
			alert("Failed to get weather. Check your city name");
		});
};

// Event listener
submit.addEventListener("click", (e) => {
	e.preventDefault();
	getWeather(cityInput.value);
});

// Default load
cityInput.value = "Kolkata";
getWeather("Kolkata");

