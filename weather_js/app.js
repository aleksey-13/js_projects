// Init storage
const storage = new Storage();
// Get stored location data
const weatherLocation = storage.getLocationFromLS();

const ui = new UI();

const weather = new Weather(weatherLocation);

document.addEventListener("DOMContentLoaded", getWeather);

document
  .getElementById("w-change-btn")
  .addEventListener("click", changeLocation);

function getWeather() {
  weather
    .getWeather()
    .then((result) => {
      ui.paint(result);
    })
    .catch((err) => console.log(err));
}

function changeLocation(e) {
  const city = document.getElementById("city").value;

  storage.setLocationInLS(city);

  weather.changeLocation(city);

  getWeather();

  document.getElementById("city").value = "";

  $("#locModal").modal("hide");
}
