var express = require('express');
var router = express.Router();
let nodejsWeatherApp = require('nodejs-weather-app');

/* GET weather listing. */
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

router.get('/', function (req, res, next) {
  res.send("iSter Weather API");
});

router.get("/:CITY", (req, res) => {
  const { CITY } = req.params;

  nodejsWeatherApp.getWeather(`${CITY}`).then(val => {
    printWeather(val);
  });
  function printWeather(weather) {
    let message = `Temperature in ${weather.name} is ${weather.main.temp}°C`;
    // console.log(message);
    // console.log(weather);

    res.send(`${JSON.stringify(weather)}`);
  }

});

module.exports = router;