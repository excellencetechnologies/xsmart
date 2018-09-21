var express = require("express");
var router = express.Router();
var User = require("../model/user");
var middleware = require("../middleware/authentication");
var md5 = require("md5");
var jwt = require("jsonwebtoken");
var dataValidation = require("../data_validation/validation");


router.post("/register", middleware.checkForAlreadyRegisterUser, async (req, res) => {
    let result = await dataValidation.validateUserRegisterData(req.checkBody, req.validationErrors, req.body);
    if (result instanceof Error) {
        res.status(400).json(result.message);
    } else {
        let newUser = new User({ name: result.name, password: md5(result.password), email: result.email });
        newUser.save((err, obj) => {
            if (err) {
                res.status(500).json("mongodb internel problem while saving the user");
            } else {
                res.status(200).json(obj);
            }
        });
    }
});

router.post("/login", async (req, res) => {
    let result = await dataValidation.validateLoginData(req.checkBody, req.validationErrors, req.body);
    if (result instanceof Error) {
        res.status(400).json(result.message);
    } else {
        User.findOne({ email: result.email }, (err, obj) => {
            if (err) {
                res.status(500).json("mongodb internel problem while login the user");
            } else {
                if (obj != null) {
                    if (obj.password === md5(result.password)) {
                        const token = jwt.sign({ id: obj._id }, process.env.key, { expiresIn: "1h" })
                        obj.token = token;
                        res.status(200).json(obj);
                    } else {
                        res.status(400).json("your password is not matched");
                    }
                } else {
                    res.status(400).json("your email id is not matched");
                }
            }
        });
    }
});

module.exports = router;
