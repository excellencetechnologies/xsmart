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
        if (process.argv[2] != 2) {
            setInterval(() => {
                let ping = {
                    type: "device_ping",
                    WEBID: data.Device[process.argv[2]].WEBID,
                    version: data.Device[process.argv[2]].version,
                    chip: data.Device[process.argv[2]].chip,
                    PINS: data.Device[process.argv[2]].switches,
                };
                deviceWS.send(JSON.stringify(ping));
            }, 1000);
        } else {
            if ((new Date()).getHours() % 2 == 0) {
                setInterval(() => {
                    let ping = {
                        type: "device_ping",
                        WEBID: data.Device[process.argv[2]].WEBID,
                        version: data.Device[process.argv[2]].version,
                        chip: data.Device[process.argv[2]].chip,
                        PINS: data.Device[process.argv[2]].switches,
                    };
                    deviceWS.send(JSON.stringify(ping));
                }, 60 * 30 * 1000);
            } else {
                setInterval(() => {
                    let ping = {
                        type: "device_ping",
                        WEBID: data.Device[process.argv[2]].WEBID,
                        version: data.Device[process.argv[2]].version,
                        chip: data.Device[process.argv[2]].chip,
                        PINS: data.Device[process.argv[2]].switches,
                    };
                    deviceWS.send(JSON.stringify(ping));
                }, 1000);
            }
        }
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
        let switches = dbDevice.switches;
        console.log(switches);
        switches[device.pin - 1].status = ((switches[device.pin - 1].status == 0) ? 1 : 0);
        console.log(switches[device.pin - 1]);
        let devicePingSend = {
            type: "device_ping",
            WEBID: dbDevice.WEBID,
            version: dbDevice.version,
            chip: dbDevice.chip,
            PINS: switches
        };
        try {
            console.log(devicePingSend);
            deviceWS.send(JSON.stringify(devicePingSend));
        } catch (err) {
            console.log("error in sending data");
        }
    }
})

deviceWS.onclose = () => {
    console.log('connection closed');
}


