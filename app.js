const express = require("express");
const http = require("http");
const socketIo = require("socket.io");





let sensor = require('node-dht-sensor');
let sensorType = 22; // 11 for DHT11, 22 for DHT22 and AM2302
let sensorPin  = 18;  // The GPIO pin number for sensor signal
let nodejsWeatherApp = require('nodejs-weather-app');

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();

app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 2000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

const getApiAndEmit = socket => {
    

    sensor.read(sensorType,sensorPin, function(err, temperature, humidity){
        if (!err) {
            // console.log(`temp: ${temperature.toFixed(1)} °C`)
            // console.log(`humidity: ${humidity.toFixed(1)} %`)
            socket.emit("temperature",temperature.toFixed(1));
            socket.emit("humidity",humidity.toFixed(1));
      }})

    nodejsWeatherApp.getWeather().then(val => {
        printWeather(val);
    });
    function printWeather(weather) { 
        const response = weather;
        // Emitting a new message. Will be consumed by the client
        socket.emit("FromAPI",response)
    };
        
        const time = new Date();
        const hh = time.getHours();
        const mm = time.getMinutes();
        const ss = time.getSeconds();
        const sendTime = hh + ":" + mm + ":" + ss;
        const getTime = () => {
        };
        socket.emit("FromTimeAPI", sendTime);

}

server.listen(port, () => console.log(`Listening on port ${port}`));