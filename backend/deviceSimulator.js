var WebSocket = require('ws');
var deviceWS = new WebSocket('http://5.9.144.226:9030');

const msg = {
    type: "device_ping",
    WEBID: "1234",
    version: "0.11",
    chip: 'chip1',
    PINS: [
        {
            pin: 1,
            status: 1
        },
        {
            pin: 2,
            status: 0
        },
        {
            pin: 3,
            status: 1
        }
    ]
}

deviceWS.on('open', () => {
    setInterval(() => {
        deviceWS.emit('message', msg);
    }, 1000);
});
