var data = require("../device_data/data");

function getDevicePing(name, chip) {
    let index = 0;
    for (let device of data.Device) {
        index++;
        if (device.chip == chip) {
            device.name = name;
            return device;
        } else if (data.Device.length == index) {
            return null;
        }
    }
}

function getChipDevice(chip){
    for(let device of data.Device){
        if(device.chip == chip){
            return device;
        }
    }
}

module.exports = {
    getDevicePing: getDevicePing,
    getChipDevice : getChipDevice
}