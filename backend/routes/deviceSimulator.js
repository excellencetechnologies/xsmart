var express = require('express');
var router = express.Router();
var data = require("../device_data/data");
var getDevice = require("../getDeviceData/data");
router.get('/', (req, res) => {
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
            type: data.Access.type,
            pins: data.Access.switches
        };
    } else {
        let index = Math.floor((Math.random() * 3));
        ping = {
            webid: data.Device[index].WEBID,
            chip: data.Device[index].chip,
            name: data.Device[index].name,
            type: data.Device[index].type,
            pins: data.Access.switches
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

router.get('/wifi', (req, res) => {
    if(req.query.noPing){
        return;
    }
    if(req.query.empty){
        res.status(200).json({});
        return;
    }
    res.status(200).json({ data: data.Wifi });
});

router.get('/wifisave', (req, res) => {
    if(req.query.noPing){
        return;
    }
    data.Wifi.forEach((wifi) => {
        res.status(200).json(wifi);
        // if (wifi.SSID == req.query.ssid) {
        //     if (req.query.password == '123456789') {
        //         res.status(200).json(wifi);
        //     } else {
        //         res.status(400).json( "check your wifi password. correct password is 123456789" );
        //     }
        // }
    });

});

router.get('/setnickname', async (req, res) => {
    if(req.query.noPing){
        return;
    }
    let result = await getDevice.getDevicePing(req.query.name, req.query.chip);
    if (result == null) {
        res.status(400).json("not found")
    } else {
        res.status(200).json(result );
    }
});

module.exports = router;
