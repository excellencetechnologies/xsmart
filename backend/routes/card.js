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
    console.log(req.body, "asdfasfasdf");
    if (req.body.data) {
        let lines = req.body.data.split("\r\n");
        console.log(lines);
        lines.forEach(async element => {
            console.log(element);
            let data = element.split(";");
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

router.post("/getAttendance", (req, res) => {
    Attendance.find(req.body, (err, obj) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(obj);
        }
    })
})

router.get("/validateKey" , (req, res) => {
    request({
        url: "http://dev.hr.excellencetechnologies.in/hr/attendance/API_HR/api.php",
        method: "POST",
        json: {
            "action": "get_enable_user",
            "secret_key": req.params.key
        }
    }, (err, r, body) => {
        if (!err && body.error == 0) {
            res.json({});
        }else{
            res.status(500).json({});
        }
    })
})

router.get("/userData", (req, res) => {
    request({
        url: "http://dev.hr.excellencetechnologies.in/hr/attendance/API_HR/api.php",
        method: "POST",
        json: {
            "action": "get_enable_user",
            "secret_key": "640ce5ae7618062d23c94d7723916c16"
        }
    }, (err, r, body) => {
        let response = [];
        if (!err && body.error == 0) {
            body.data.forEach(emp => {
                response.push({
                    id: emp.id,
                    type: emp.type,
                    name: emp.name,
                    jobtitle: emp.jobtitle,
                    gender: emp.gender,
                    image: emp.image,
                    status: emp.status,
                    emp_id: emp.user_Id
                })
            });
        }
        if (err) {
            res.status(500).json(err);
        } else if (body.error !== 0) {
            res.status(500).json(body.error);
        } else {
            res.json(response);
        }
    })
})

module.exports = router;