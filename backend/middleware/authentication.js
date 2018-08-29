var User = require("../model/user");
var jwt = require("jsonwebtoken");
var Device = require("../model/device");
const key = "thanos";

module.exports = {

    checkForAlreadyRegisterUser: (req, res, next) => {
        let body = req.body;
        User.findOne({ email: body.email }, (err, obj) => {
            if (err) {
                res.status(500).json({ error: 1, message: "mongo db internel problem while finding the user" });
            } else {
                if (obj == null) {
                    next();
                } else {
                    res.status(200).json({ error: 1, message: "please provide unique email id " });
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

    checkForUniqueChip: (req, res, next) => {
        Device.findOne({ chip_id: req.body.chip_id }, (err, obj) => {
            if (err) {
                res.status(500).json({ error: 1, message: "mongodb internel problem while finding the device " });
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
        Device.findOne({ chip_id: req.body.chip_id, user_id: req.id }, (err, obj) => {
            if (err) {
                res.status(500).json({ error: 1, message: "mongodb internel problem while checking the chip id" });
            } else {
                if (obj != null) {
                    req.documentID = obj._id;
                    User.findById(req.body.owner_id, (err, obj) => {
                        if (err) {
                            res.status(500).json({ error: 1, message: "mongodb internel problem while checking the owner id in user db" });
                        } else {
                            if (obj != null) {
                                next();
                            } else {
                                res.status(200).json({ error: 1, message: "you can not update because owner id doest not exist in our user data base" })
                            }
                        }
                    })
                } else {
                    res.status(400).json({ error: 1, message: "you can not update the device because your chip id does not match with your user id " });
                }
            }
        });
    }

}