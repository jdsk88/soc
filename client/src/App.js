import React, { useState, useEffect } from "react";
import './weather.css';
import DigitalClock from "./DigitalClock"
import socketIOClient from "socket.io-client";
import { useStateWithLocalStorage, useStateWithLocalStorageArr } from "./useStateWithLocalStorage";
const ENDPOINT = "http://127.0.0.1:4001";

const App = () => {
  const [getTime, setTime] = useState([]);
  const [getCityName, setCityName] = useStateWithLocalStorage("cityName"); // korzysta z hooka u góry
  const [weatherData, setResponse] = useStateWithLocalStorageArr(
    "weatherDetails"
  );

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
      // console.log(data);
    });
    socket.on("FromTimeAPI", time => {
      setTime(time);
      // console.log(time);
    });
  }, []);

  return (
    <>
      <div className="weather_info" key={weatherData.id}>
        <div className="weather_info_main">
          <p className="weather_info_main_description">
            {weatherData.weather[0].description}
          </p>
          <div
            className="weather_info_main_img-site"
            style={{
              background: `url(${
                "http://openweathermap.org/img/wn/" +
                weatherData.weather[0].icon +
                "@2x.png"
                }) no-repeat center/contain`,
            }}
          ></div>

          <p className="weather_info_main_temp">{weatherData.main.temp}&#x2103;</p>
        </div>
        <p>{weatherData.coord.lon}</p>
        <p>{weatherData.coord.lat}</p>
        <p>{weatherData.weather[0].id}</p>
        <p>{weatherData.weather[0].main}</p>
        <p>{weatherData.weather[0].icon}</p>
        <p>{weatherData.base}</p>
        <h3>Details:</h3>
        <div className="weather_info_details">
          <div className="weather_info_details_left">
            <p>Feels like: {weatherData.main.feels_like}&#x2103;</p>
            <p>Min. temp.: {weatherData.main.temp_min}&#x2103;</p>
            <p>Max temp. : {weatherData.main.temp_max}&#x2103;</p>
            <p>Pressure: {weatherData.main.pressure}hPa</p>
          </div>
          <div className="weather_info_details_right">
            <p>
              Humidity :{weatherData.main.humidity} g/m<sup>3</sup>
            </p>
            <p>Visibility: {weatherData.visibility} m</p>
            <p>Wind speed: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
        <p>{weatherData.sys.country} </p>
        <p>{weatherData.sys.sunrise}</p>
        <p>{weatherData.sys.sunset}</p>
        <p>{weatherData.timezone}</p>
        <p>{weatherData.name}</p>
        <p>{weatherData.wind.deg}</p>
        <p>{weatherData.clouds.all}</p>
        <p>{weatherData.dt},</p>
        <p>{weatherData.sys.type}</p>
        <p>{weatherData.sys.id}</p>

        <p>{weatherData.cod}</p>
      </div>

      <DigitalClock />
      <h1>{getTime}</h1>
    </>
  );
}

export default App;















{/* <p>{data.coord.lon}</p>
<p>{data.coord.lat}</p> */}
{/* <p>{data.weather[0].id}</p>
<p>{data.weather[0].main}</p> */}

{/* <p>{data.weather[0].icon}</p>
<p>{data.base}</p> */}
{/* <p>{data.sys.sunrise},</p>
<p>{data.sys.sunset},</p> */}
{/* <p>{data.timezone},</p>
<p>{data.weather.id},</p> */}
{/* <p>{data.wind.deg}</p> */ }
{/* <p>{data.clouds.all}</p>
<p>{data.dt},</p> */}
{/* <p>{data.sys.type}</p>
<p>{data.sys.id}</p> */}

{/* <p>{data.cod}</p> */ }