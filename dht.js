var sensor = require('node-dht-sensor');
var sensorType = 22; // 11 for DHT11, 22 for DHT22 and AM2302
var sensorPin  = 18;  // The GPIO pin number for sensor signal

setInterval(() =>  sensor.read(sensorType,sensorPin, function(err, temperature, humidity){
    if (!err) {
        console.log(`temp: ${temperature.toFixed(1)} °C`)
        console.log(`humidity: ${humidity.toFixed(1)} %`)

    }
}), 2000)

