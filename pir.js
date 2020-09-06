var gpio = require('onoff').Gpio;
var pir = new gpio(2, 'in', 'both');
pir.watch(function(err, value) {
    if (value == 1) {
        sendMessage('Intruder alert');
    } else {
        sendMessage('Intruder gone');
    }
});
function sendMessage(message) {
    var currentTime = new Date();
    console.clear();
    console.log(currentTime.toTimeString().substring(0, 8), 1);
    console.log(message, 2);
}
