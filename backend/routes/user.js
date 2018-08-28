var express = require("express");
var router = express.Router();
var User = require("../model/user");
var middleware = require("../middleware/authentication");
var md5 = require("md5");
var jwt = require("jsonwebtoken");
const key = "thanos";

router.post("/register", middleware.checkForAlreadyRegisterUser, (req, res) => {
    body = req.body;
    let newUser = new User({ name: body.name, password: md5(body.password), email: body.email });
    newUser.save((err, obj) => {
        if (err) {
            res.status(500).json({ error: 1, message: "mongodb internel problem while saving the user" });
        } else {
            res.status(200).json({ status: 1, message: "successfully created user", date: obj });
        }
    });
});

router.post("/login", (req, res) => {
    let body = req.body;
    User.findOne({ email: body.email, password: md5(body.password) }, (err, obj) => {
        if (err) {
            res.status(500).json({ error: 1, message: "mongodb internel problem while login the user" });
        } else {
            if (obj != null) {
                const token = jwt.sign({ id: obj._id }, key, { expiresIn: "1h" })
                res.status(200).json({ status: 1, message: "successfully login", data: obj, token: token });
            } else {
                res.status(400).json({ error: 1, message: "please check your detail" });
            }
        }
    });
});

module.exports = router;