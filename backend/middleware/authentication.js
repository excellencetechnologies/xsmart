var User = require("../model/user");
var jwt = require("jsonwebtoken");
var Device = require("../model/device");
const key = "thanos";

module.exports = {

    checkForAlreadyRegisterUser: (req, res, next) => {
        let body = req.body;
        User.findOne({ email: body.email }, (err, obj) => {
            if (err) {
                res.status(500).json({ error: 1, message: "mongo db internel problem while saving the finding the user" });
            } else {
                if (obj == null) {
                    next();
                } else {
                    res.status(200).json({ error: 1, message: "please provide unique email name " });
                }
            }
        })
    },

    validateToken: (req, res, next) => {
        const token = req.headers.token;
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                res.status(400).json({ error: 1, message: err.message });
            } else {
                req.id = decoded.id;
                next();
            }
        })
    },

    checkForAlreadyDeviceInserted: (req, res, next) => {
        Device.findOne({ chip_id: req.body.chip_id }, (err, obj) => {
            if (err) {
                res.status(500).json({ error: 1, message: "error during authentication for repeat action" });
            } else {
                if (obj == null) {
                    next();
                } else {
                    res.status(200).json({ error: 1, message: "please provide unique chip id" });
                }
            }
        })
    },

    checkChipId: (req, res, next) => {
        Device.findOne({ chip_id: req.body.chip_id }, (err, obj) => {
            if (err) {
                res.status(500).json({ error: 1, message: "error while checking for updating device" });
            } else {
                if (obj != null) {
                    req.documentID = obj._id;
                    next();
                } else {
                    res.status(400).json({ error: 1, message: "you can not update device because your chip id doest not exit " });
                }
            }
        });
    }

}