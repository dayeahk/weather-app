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

function defaultWeather(response) {
  let defaultCity = document.querySelector("h2");
  defaultCity.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}°C`;
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
}

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Copenhagen&appid=1a14757dd318c14f3e6b090d5f4a85f7&units=metric`;
axios.get(apiUrl).then(defaultWeather);

function searching(city) {
  city.preventDefault();
  let h2 = document.querySelector("h2");
  let cityInput = document.querySelector("#city");
  h2.innerHTML = `${cityInput.value}`;

  function showWeather(response) {
    console.log(response.data);
    let temperature = Math.round(response.data.main.temp);
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = `${temperature}°C`;
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
  }

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=1a14757dd318c14f3e6b090d5f4a85f7&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let citySearch = document.querySelector("form");
citySearch.addEventListener("click", searching);

function showGeoWeather(response) {
  let geoTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${geoTemp}°C`;
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
