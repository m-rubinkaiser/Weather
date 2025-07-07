import { useEffect, useState } from "react";
import Chart from "./chart";

function WeatherInfo({ weather, day, setDay }) {
  const [hourData, setHourData] = useState([]);
  const [unit, setUnit] = useState("C");
  const tempC = weather?.[day]?.day.avgtemp_c;
  const tempF = weather?.[day]?.day.avgtemp_f;

  const todayWeather = weather?.[day];
  const dayInfo = todayWeather?.day;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
    }).replace(" ",", ");

  useEffect(() => {
    if (weather?.[day]?.hour) {
      const newData = weather[day].hour.map((hourItem, i) => ({
        hour: i+1, // or format as `${i}:00` if you prefer
        temp_f: hourItem?.temp_f ?? 0,
        wind: hourItem?.wind_mph ?? 0,
      }));
      setHourData(newData);
    }
  }, [day, weather]);

  return (
    <>
      <hr></hr>
      <h2>Weather Information</h2>
      <div className="weather-summary">
            <p>{formatDate(todayWeather?.date)}</p>
            <p>{dayInfo.condition?.text}</p>
          </div>
      <div className="weather-info">
        <div className="weather-stats">
          <img
            src={todayWeather?.day?.condition?.icon}
            alt="Weather"
            // style={{ width: "100px" }}
          />
          <p>
            {unit === "C" ? `${tempC}` : `${tempF}`}{" "}
            <span
              onClick={() => setUnit("C")}
              style={{
                marginLeft: "8px",
                cursor: "pointer",
                color: unit === "C" ? "red" : "#000",
                fontWeight: unit === "C" ? "bold" : "normal",
              }}
            >
              °C
            </span>{" "}
            |
            <span
              onClick={() => setUnit("F")}
              style={{
                marginLeft: "8px",
                cursor: "pointer",
                color: unit === "F" ? "red" : "#000",
                fontWeight: unit === "F" ? "bold" : "normal",
              }}
            >
              °F
            </span>
          </p>
        </div>
        <div className="weather-container">
            <p>preciption:{dayInfo.totalprecip_in}</p>
            <p>humidity:{dayInfo.avghumidity}</p>
            <p>wind:{dayInfo.maxwind_kph}</p>
          </div>
          
      </div>
      <div>
        <Chart data={hourData} />
      </div>
      <div className="day-selector">
        {weather?.map((weather, index) => {
          // console.log(index,weather);
          return (
            <div key={index} onClick={() => {
              setDay(index)
            }}>
              <img src={weather.day.condition.icon} alt="weather icon" />
              <p>
                {new Date(weather?.date).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default WeatherInfo;
