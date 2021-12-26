import React from "react";
import WeatherData from "./components/weatherData";
import WeatherSearch from "./components/weatherSearch";

import clear from "./icons/weather-icons-master/production/fill/darksky/clear-day.svg";
import drizzle from "./icons/weather-icons-master/production/fill/darksky/drizzle.svg";
import thunderstorm from "./icons/weather-icons-master/production/fill/darksky/thunderstorm.svg";
import rain from "./icons/weather-icons-master/production/fill/darksky/rain.svg";
import clouds from "./icons/weather-icons-master/production/fill/darksky/cloudy.svg";
import atmosphere from "./icons/weather-icons-master/production/fill/darksky/fog.svg";
import snow from "./icons/weather-icons-master/production/fill/darksky/snow.svg";

const api = {
  key: "a335aaf7fbc6182136ce017fe1485367",
  URL: "https://api.openweathermap.org/data/2.5/weather",
  // key5Days: "1993e779758aa3e3182404bf0380a986",
  // URL5Days: "https://api.openweathermap.org/data/2.5/forecast"
};

const current = new Date();
const monthNames = [
  "January",
  "february",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city_Country: undefined,
      country: undefined,
      tempCelsius: undefined,
      icon: undefined,
      description: undefined,
      currentDateTime: undefined,
      error: undefined,
    };

    this.weatherIcon = {
      clear: clear,
      thunderstorm: thunderstorm,
      clouds: clouds,
      drizzle: drizzle,
      rain: rain,
      snow: snow,
      atmosphere: atmosphere,
    };
  }

  calcTime(offset) {

    var utc = current.getTime() + (current.getTimezoneOffset() * 60000);
    var  nd = new Date(utc + (3600000 * offset));
  
    return nd.toLocaleTimeString();
  }
  getWeatherIcon(range) {
    switch (true) {
      case range >= 200 && range <= 232:
        this.setState({ icon: this.weatherIcon.thunderstorm });
        break;

      case range >= 300 && range <= 321:
        this.setState({ icon: this.weatherIcon.drizzle });
        break;

      case range >= 500 && range <= 531:
        this.setState({ icon: this.weatherIcon.rain });
        break;

      case range >= 600 && range <= 622:
        this.setState({ icon: this.weatherIcon.snow });
        break;

      case range >= 701 && range <= 781:
        this.setState({ icon: this.weatherIcon.atmosphere });
        break;

      case range === 800:
        this.setState({ icon: this.weatherIcon.clear });
        break;

      case range >= 801 && range <= 804:
        this.setState({ icon: this.weatherIcon.clouds });
        break;

      default:
        this.setState({ icon: this.weatherIcon.clouds });
    }
  }
  calCelsius(temp) {
    let cel = Math.floor(temp - 273.15);
    return cel;
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const apiCall = await fetch(
        `${api.URL}?q=${city},${country}&appid=${api.key}`
      );
      const response = await apiCall.json();
      console.log(response);
      // const apiCall5Days = await fetch(`${api.URL5Days}?q=Karachi,Pakistan&appid=${api.key5Days}`);
      // const res = await apiCall5Days.json();
      // console.log(res);

      this.setState({
        city_Country: `${response.name}, ${response.sys.country}`,
        tempCelsius: this.calCelsius(response.main.temp),
        description: response.weather[0].description,
        currentDateTime: `${monthNames[current.getMonth()]}, ${current.getDate()} ${current.getFullYear()} ${this.calcTime((response.timezone)/parseInt(3600))}`,
        error: undefined,
      });

      this.getWeatherIcon(response.weather[0].id);
    } else {
      this.setState({
        error: "Please fill out both fields",
      });
    }
  };

  render() {
    return (
      <div className="App">
        <header className="main-heading">
          <h1>Weather App</h1>
        </header>
        <WeatherSearch loadWeather={this.getWeather} error={this.state.error} />
        <WeatherData
          loadWeather={this.getWeather}
          currentDateTime={this.state.currentDateTime}
          city_Country={this.state.city_Country}
          country={this.state.country}
          tempCelsius={this.state.tempCelsius}
          icon={this.state.icon}
          description={this.state.description}
        />
      </div>
    );
  }
}

export default App;
