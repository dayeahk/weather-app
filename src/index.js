// time formating
function showTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayNumber = date.getDay();
  let day = days[dayNumber];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}

let time = document.querySelector("#current-time");
let currentTime = new Date();
time.innerHTML = showTime(currentTime);

// displaying forecast

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastDays = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  let forecastHTML = `<div class="row">`;
  forecastDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
             <div class="col-2">
              <div class="forecast-day">${day}</div>
                <img
                src="http://openweathermap.org/img/wn/09d@2x.png"
                alt=""
                width="60"
                class="forecast-icon"
                />
                <span class="forecast-temperature-high">6° </span>
                <span class="forecast-temperature-low">/ 2°</span>
             </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1a14757dd318c14f3e6b090d5f4a85f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let citySearched = document.querySelector("h2");
  citySearched.innerHTML = response.data.name;
  celciusTemp = response.data.main.temp;
  let temperature = Math.round(celciusTemp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}`;
  let description = response.data.weather[0].main;
  let currentDescription = document.querySelector("#current-description");
  currentDescription.innerHTML = description;
  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${currentHumidity}%`;
  let currentWind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${currentWind}`;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "1a14757dd318c14f3e6b090d5f4a85f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city");
  search(cityInput.value);
}

search("Copenhagen");

// Unit conversion

function convertToFarenheit(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let currentTemp = document.querySelector("#current-temp");
  let farenheitTemp = (celciusTemp * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(farenheitTemp);
}

function convertToCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

let citySearch = document.querySelector("form");
citySearch.addEventListener("click", getCity);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);

let celciusLink = document.querySelector("#celsius-link");
celciusLink.addEventListener("click", convertToCelcius);

// displaying weather by location

function showGeoWeather(response) {
  let geoTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${geoTemp}`;
  let geoDesc = response.data.weather[0].main;
  let currentDescription = document.querySelector("#current-description");
  currentDescription.innerHTML = geoDesc;
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${currentHumidity}%`;
  let currentWind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${currentWind}`;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1a14757dd318c14f3e6b090d5f4a85f7&units=metric`;
  axios.get(apiGeoUrl).then(showGeoWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector(".position");
locationButton.addEventListener("click", getCurrentPosition);

displayForecast();
