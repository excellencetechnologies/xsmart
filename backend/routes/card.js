var express = require("express");
var router = express.Router();
var middleware = require("../middleware/authentication");
var dataValidation = require("../data_validation/validation");
var Device = require("../model/device");
var Card = require("../model/card");
var Attendance = require("../model/attendance");

router.post("/addTime" , (req, res) => {
    console.log(req.body);

    //xSmart-1602506=b05b3f25=10=12:30:10-10/14/18
    res.json({});
})

router.get("/getAllCards", (req, res) => {
    Card.find({}, (err, obj) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(obj);
        }
    })
})

router.get("/getAllAttendance", (req, res) => {
    Attendance.find({}, (err, obj) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(obj);
        }
    })
});


module.exports = router;