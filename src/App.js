import "./static/App.css";
import "./static/reset.css";
import { useEffect, useState } from "react";
import LocationSearch from "./components/locationSearch";
import WeatherInfo from "./components/weatherInfo";

function App() {
  const [location, setLocation] = useState(null);
  const [geolocation, setGeolocation] = useState(null);
  const [weather, setWeather] = useState(null);
  // const [hour, setHour] = useState(new Date().getHours());
  const [day, setDay] = useState();
  const [searchedLocation, setSearchedLocation] = useState("");

  useEffect(() => {
    // setHour(new Date().getHours());
    setDay(3);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setGeolocation(coords);
      },
      (error) => {
        console.warn("User denied location or error occurred:", error.message);
      }
    );
  }, []);

  useEffect(() => {
    if (!geolocation && !searchedLocation) return;
    const today = new Date();

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 3);

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 1);

    const formatDate = (date) => date.toISOString().split("T")[0];

    const dt = formatDate(startDate);
    const end_dt = formatDate(endDate);
    console.log(dt, end_dt);

    const fetchWeatherData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const key = process.env.REACT_APP_API_KEY;
        // console.log(process.env.REACT_APP_API_URL)
        // const key = "912ce8ff47ed40b7a5171144251305";
        if (searchedLocation) {
          console.log(searchedLocation);
          const searchedUrl = `${apiUrl}?key=${key}&q=${searchedLocation}&dt=${dt}&end_dt=${end_dt}`;
          const searchedResponse = await fetch(searchedUrl);
          const searchedResult = await searchedResponse.json();
          setWeather(searchedResult.forecast.forecastday);
          setLocation(searchedResult.location);
          console.log(searchedResult);
          return;
        }
        const { lat, lon } = geolocation;
        const url = `${apiUrl}?key=${key}&q=${lat},${lon}&dt=${dt}&end_dt=${end_dt}`;
        const response = await fetch(url);
        const result = await response.json();
        setWeather(result.forecast.forecastday);
        setLocation(result.location);
        console.log(result);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [geolocation, searchedLocation]);

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="container">
        <LocationSearch
          location={location}
          setSearchedLocation={setSearchedLocation}
          setGeolocation={setGeolocation}
          geolocation={geolocation}
        />
        {weather && <WeatherInfo weather={weather} day={day} setDay={setDay} />}
      </div>
    </div>
  );
}

export default App;
