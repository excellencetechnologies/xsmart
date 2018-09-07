var data = require("../device_data/data");

function getDevicePing(name, chip) {
    let index = 0;
    for (var device of data.Device) {
        index++;
        if (device.chip == chip) {
            device.name = name;
            return device;
        } else if (data.Device.length == index) {
            return null;
        }
    }
}

module.exports = {
    getDevicePing: getDevicePing
}