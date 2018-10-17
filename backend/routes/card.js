var express = require("express");
var router = express.Router();
var request = require("request");
var middleware = require("../middleware/authentication");
var dataValidation = require("../data_validation/validation");
var Device = require("../model/device");
var Card = require("../model/card");
var User = require("../model/user");


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

                console.log({
                    url: "http://dev.hr.excellencetechnologies.in/hr/attendance/API_HR/api.php",
                    method: "POST",
                    json: {
                        "action": "employee_punch_time",
                        "secret_key": "a5e03eaf60684b64793f4e38f958b3e1",
                        // "user_id": req.params.data[2],
                        "user_id": 299,
                        "punch_time": data[3]
                    }
                })

                await request({
                    url: "http://dev.hr.excellencetechnologies.in/hr/attendance/API_HR/api.php",
                    method: "POST",
                    json: {
                        "action": "employee_punch_time",
                        "secret_key": "a5e03eaf60684b64793f4e38f958b3e1",
                        // "user_id": req.params.data[2],
                        "user_id": 299,
                        "punch_time": data[3]
                    }
                }, (err, r, body) => {

                    // console.log(err);
                    // console.log(r);
                    // console.log(body);

                })


            }
        })
    }
    res.json({});
});

router.get("/getAllCards", (req, res) => {
    Card.find({}, (err, obj) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(obj);
        }
    })
})

router.get("/validateKey/:key", (req, res) => {
    request({
        url: "http://dev.hr.excellencetechnologies.in/hr/attendance/API_HR/api.php",
        method: "POST",
        json: {
            "action": "get_enable_user",
            "secret_key": req.params.key
        }
    }, (err, r, body) => {
        if (!err && body) {
            res.json({});
        } else {
            res.status(500).json({});
        }
    })
});

router.post("/employeeData/:id/:emp_id", (req, res) => {
    User.findById(req.params.id, (err, obj) => {
        if (err) {
            res.status(500).json(err);
        } else {

            if (obj.meta && obj.meta.key) {

                request({
                    url: "http://dev.hr.excellencetechnologies.in/hr/attendance/API_HR/api.php",
                    method: "POST",
                    json: {
                        "action": "update_user_meta_data",
                        "secret_key": obj.meta.key,
                        "user_id": req.params.emp_id,
                        "data": req.body
                    }
                }, (err, r, body) => {

                    console.log(body);
                    if (err) {
                        res.status(500).json(err);
                    } else if (body.error !== 0) {
                        res.status(500).json(body.error);
                    } else {
                        res.json(response);
                    }
                })

            } else {
                res.status(500).json("hr system key not found");
            }

        }
    })

})

router.delete("/employeeData/:id/:emp_id", (req, res) => {
    User.findById(req.params.id, (err, obj) => {
        if (err) {
            res.status(500).json(err);
        } else {

            if (obj.meta && obj.meta.key) {

                request({
                    url: "http://dev.hr.excellencetechnologies.in/hr/attendance/API_HR/api.php",
                    method: "POST",
                    json: {
                        "action": "delete_user_meta_data",
                        "secret_key": obj.meta.key,
                        "user_id": req.params.emp_id,
                        "data": req.body
                    }
                }, (err, r, body) => {

                    console.log(body);
                    if (err) {
                        res.status(500).json(err);
                    } else if (body.error !== 0) {
                        res.status(500).json(body.error);
                    } else {
                        res.json(response);
                    }
                })

            } else {
                res.status(500).json("hr system key not found");
            }

        }
    })

})

router.get("/employeeData/:id/:emp_id", (req, res) => {
    User.findById(req.params.id, (err, obj) => {
        if (err) {
            res.status(500).json(err);
        } else {

            if (obj.meta && obj.meta.key) {

                request({
                    url: "http://dev.hr.excellencetechnologies.in/hr/attendance/API_HR/api.php",
                    method: "POST",
                    json: {
                        "action": "get_user_meta_data",
                        "secret_key": obj.meta.key,
                        "user_id": req.params.emp_id,
                        "workemail": req.body.workemail
                    }
                }, (err, r, body) => {

                    console.log(body);
                    if (err) {
                        res.status(500).json(err);
                    } else if (body.error !== 0) {
                        res.status(500).json(body.error);
                    } else {
                        res.json(response);
                    }
                })

            } else {
                res.status(500).json("hr system key not found");
            }

        }
    })

})

router.post("/addEmployeeData/:id", (req, res) => {
    User.findById(req.params.id, (err, obj) => {
        if (err) {
            res.status(500).json(err);
        } else {

            if (obj.meta && obj.meta.key) {

                request({
                    url: "http://dev.hr.excellencetechnologies.in/hr/attendance/API_HR/api.php",
                    method: "POST",
                    json: {
                        "action": "add_new_employee",
                        "secret_key": obj.meta.key,
                        "name": req.body.name,
                        "gender": req.body.gender,
                        "jobtitle": req.body.jobtitle
                    }
                }, (err, r, body) => {

                    console.log(body);
                    if (err) {
                        res.status(500).json(err);
                    } else if (body.error !== 0) {
                        res.status(500).json(body.error);
                    } else {
                        res.json(response);
                    }
                })

            } else {
                res.status(500).json("hr system key not found");
            }

        }
    })
});

router.get("/employeeData/:id", (req, res) => {


    User.findById(req.params.id, (err, obj) => {
        if (err) {
            res.status(500).json(err);
        } else {

            if (obj.meta && obj.meta.key) {

                request({
                    url: "http://dev.hr.excellencetechnologies.in/hr/attendance/API_HR/api.php",
                    method: "POST",
                    json: {
                        "action": "get_enable_user",
                        "secret_key": obj.meta.key
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

            } else {
                res.status(500).json("hr system key not found");
            }

        }
    })


})

module.exports = router;