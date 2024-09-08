function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = response.data.wind.speed;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  console.log(response.data);
  let icon = document.querySelector("#current-temperature-icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}"  /> `;

  getForecast(response.data.city);
}
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}
function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);
  let forecast = document.querySelector("#forecast");

  let weatherForecast = "";
  response.data.daily.forEach(function (day) {
    weatherForecast =
      weatherForecast +
      `<li> 
  <div class="weather-forecast-date>
  <div class="weather-forecast-day">${day}</div>
  <img src="${day.condition.icon_url}" class="weather-forecast-icon"  />
  <div class="weather-forecast-temperature">${Math.round(
    day.temperature.minimum
  )}℃</div></div></li> `;
  });
  forecast.innerHTML = weatherForecast;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
getForecast();
