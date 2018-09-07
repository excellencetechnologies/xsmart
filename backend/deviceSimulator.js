var WebSocket = require('ws');
var deviceWS = new WebSocket('http://localhost:9030');
var getDevice = require("./getDeviceData/data");
var data = require("./device_data/data");

deviceWS.onerror = (e) => {
    console.log("there is an error to open the connection with server socket");
}

deviceWS.onopen = () => {
    console.log("connection opend");
    try {
        setInterval(() => {
            let index = Math.floor((Math.random() * 3));
            let ping = {
                type: "device_ping",
                WEBID: "1234",
                version: "0.11",
                chip: data.Device[index].chip,
                PINS: data.Device[index].switches,
            };
            deviceWS.send(JSON.stringify(ping));
        }, 1000);
    } catch (err) {
        console.log("error in sending the data");
    }
}

deviceWS.on("message", async (msg) => {
    device = JSON.parse(msg);
    if (device.type == 'OK') {
        console.log(device);
    } else if (device.type == 'LOW' || device.type == 'HIGH') {
        console.log("low and high");
        let dbDevice = await getDevice.getChipDevice(device.chip);
        dbDevice.switches.forEach((obj) => {
            if (obj.pin == device.pin) {
                let devicePingSend = {
                    type: "device_ping",
                    WEBID: "1234",
                    version: "0.11",
                    chip: dbDevice.chip,
                    PINS: { pin: obj.pin, status: device.type == 'LOW' ? 0 : 1 }
                };
                try {
                    deviceWS.send(JSON.stringify(devicePingSend));
                } catch (err) {
                    console.log("error in sending data");
                }
            }
        })
    }
})

deviceWS.onclose = () => {
    console.log('connection closed');
}


