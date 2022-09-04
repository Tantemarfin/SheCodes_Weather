let apiKey = "b129a7ea444c03743ffd270a55b06b87";

let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

function updateWeather(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let temparature = document.querySelector("#temparature");
  temparature.innerHTML = Math.round(response.data.main.temp);
  console.log(response);

  let wind = document.querySelector("#wind");
  wind.innerHTML = "Wind: " + Math.round(response.data.wind.speed) + " km/h";

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  console.log(response);
}

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return days[day] + " " + hours + ":" + minutes;
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(geo);
}
function geo(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  axios
    .get(
      apiUrl +
        "lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        apiKey +
        "&units=metric"
    )
    .then(function (response) {
      // handle success
      updateWeather(response);
    });
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", currentLocation);

function search(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");

  axios
    .get(apiUrl + "q=" + cityInput.value + "&appid=" + apiKey + "&units=metric")
    .then(function (response) {
      // handle success
      updateWeather(response);
    });
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

dateElement.innerHTML = formatDate(currentTime);
