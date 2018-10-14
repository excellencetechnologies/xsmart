var express = require("express");
var router = express.Router();
var middleware = require("../middleware/authentication");
var dataValidation = require("../data_validation/validation");
var Device = require("../model/device");
var Card = require("../model/card");
var Attendance = require("../model/attendance");
router.get("/deleteTime", (req, res) => {
    Attendance.deleteMany({}, (err) => {
        res.json(err);
    });

});
router.post("/addTime", async (req, res) => {
    let keys = Object.keys(req.body);
    console.log(keys, "asdfasfasdf");
    if (keys[0]) {
        console.log(keys[0]);
        let lines = keys[0].split("\r");
        console.log(lines);
        lines.forEach(async element => {
            console.log(element);
            let data = element.split("=");
            console.log(data);
            if (data.length == 4) {
                let attendance = new Attendance;
                attendance.chip = data[0];
                attendance.emp_id = data[2];
                attendance.time = data[3];
                await attendance.save();
            }
        });
    }

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