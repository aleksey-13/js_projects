class Weather {
  constructor(city, state = "") {
    this.key = "b539586f6a1f87c8986427a1bdf0e839";
    this.city = city;
  }

  async getWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.key}`
    );

    const weatherData = response.json();
    return weatherData;
  }

  changeLocation(city, state = "") {
    this.city = city;
  }
}
