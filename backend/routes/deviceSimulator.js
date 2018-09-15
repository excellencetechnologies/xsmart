var express = require('express');
var router = express.Router();
var data = require("../device_data/data");
var getDevice = require("../getDeviceData/data");
router.get('/checkPing', (req, res) => {
    let index = Math.floor((Math.random() * 3));
    let ping = {
        webid: "1234",
        chip: data.Device[index].chip,
        name: data.Device[index].name,
        type: data.Device[index].type
    };
    if (ping.name == null) {
        ping.name = "new-device";
        ping.isNew = true;
    } else {
        ping.isNew = false;
    }
    res.status(200).json({ status: 1, message: "OK", data: ping });
});

router.get('/scanWifi', (req, res) => {
    res.status(200).json({ data: data.Wifi });
});

router.get('/setWifiPassword/:ssid/:password', (req, res) => {
    data.Wifi.forEach((wifi) => {
        if (wifi.SSID == req.params.SSID) {
            if (req.params.password == 'ruchi') {
                res.status(200).json({ status: 1, message: "password set ,you can access device", device: wifi });
            } else {
                res.status(400).json({ error: 1, message: "check your wifi password" });
            }
        }
    });

});

router.get('/setDeviceNickName/:name/:chip', async (req, res) => {
    let result = await getDevice.getDevicePing(req.params.name, req.params.chip);
    if (result == null) {
        res.status(400).json({ error: 1, message: "not found" })
    } else {
        res.status(200).json({ status: 1, data: result });
    }
});

module.exports = router;
