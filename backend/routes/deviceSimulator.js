var express = require('express');
var router = express.Router();
var data = require("../device_data/data");
router.get('/checkPing',(req,res)=>{
    res.status(200).json({status:1,message:"OK", data:data.checkPing});
});
router.get('/scanWifi',(req,res)=>{
    res.status(200).json({status:1,message:"OK",data:data.Wifi});
});
router.get('/setWifiPassword/:ssid/:password',(req,res)=>{
    res.status(200).json({status:1,message:"ok",data:data.Wifi,})
});
router.get('/setDeviceNickName/:name',(req,res)=>{
    res.status(200).json({status:1,message:"ok",data:data.Device});
});
module.exports = router;