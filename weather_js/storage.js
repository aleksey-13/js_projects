class Storage {
  constructor() {
    this.city;
    this.defaultCity = "London";
  }

  setLocationInLS(location) {
    localStorage.setItem("location", location);
  }

  getLocationFromLS() {
    this.city = localStorage.getItem("location");

    if (this.city !== null) {
      return this.city;
    }

    return this.defaultCity;
  }
}
