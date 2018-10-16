var express = require("express");
var router = express.Router();
var middleware = require("../middleware/authentication");
var dataValidation = require("../data_validation/validation");
var Device = require("../model/device");

router.get("/listDevice", middleware.validateToken, (req, res) => {
    Device.find({ user_id: req.id }, (err, obj) => {
        if (err) {
            res.status(500).json("mongodb internel problem while retrieving the device");
        } else {
            res.status(200).json(obj);
        }
    })
})

router.get("/allDevices", (req, res) => {
    Device.find({}, (err, obj) => {
        if (err) {
            res.status(500).json("mongodb internel problem while retrieving the device");
        } else {
            res.status(200).json(obj);
        }
    })
})



module.exports = router;