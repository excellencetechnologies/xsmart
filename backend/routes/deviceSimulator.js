var express = require('express');
var router = express.Router();
var data = require("../device_data/data");
var getDevice = require("../getDeviceData/data");
router.get('/checkPing', (req, res) => {
    let ping = {};

    if(req.query.noPing){
        //if call route as checkPing?noPing it will not return anything
        //this is to simulate when device is not close to mobile app
        return;
    }

    if (req.query.access) { // if call route as checkPing?access it will return access device
        ping = {
            webid: data.Access.WEBID,
            chip: data.Access.chip,
            name: data.Access.name,
            type: data.Access.type
        };
    } else {
        let index = Math.floor((Math.random() * 3));
        ping = {
            webid: data.Device[index].WEBID,
            chip: data.Device[index].chip,
            name: data.Device[index].name,
            type: data.Device[index].type
        };
    }
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
            if (req.params.password == '123456789') {
                res.status(200).json({ status: 1, message: "password set ,you can access device", device: wifi });
            } else {
                res.status(400).json({ error: 1, message: "check your wifi password. correct password is 123456789" });
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
