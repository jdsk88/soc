const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
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
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

// io.on("connection", (socket) => {
//     console.log("New client connected");
//     if (interval) {
//         clearInterval(interval);
//     }
//     interval = setInterval(() => getTimeAndEmit(socket), 1000);
//     socket.on("disconnect", () => {
//         console.log("Client disconnected");
//         clearInterval(interval);
//     });
// });



const getApiAndEmit = socket => {
    
    nodejsWeatherApp.getWeather().then(val => {
        printWeather(val);
    });
    function printWeather(weather) { 
        // console.log(weather.name);
        const {name , sys , } =  weather;
        const { type , id , country , sunrise , sunset } = weather.sys
        // console.log( name );
        // console.log( type );
        
        // const response = [{name: name, type: type}];
        const response = weather;
        // Emitting a new message. Will be consumed by the client
        socket.emit("FromAPI",response)
        
        const time = new Date();
        const hh = time.getHours();
        const mm = time.getMinutes();
        const ss = time.getSeconds();
        const sendTime = hh + ":" + mm + ":" + ss;
        const getTime = () => {
        // console.log(hh + ":" + mm + ":" + ss )
        };
        socket.emit("FromTimeAPI", sendTime);
        // console.clear();
        // console.log(sendTime);
    };
}

server.listen(port, () => console.log(`Listening on port ${port}`));