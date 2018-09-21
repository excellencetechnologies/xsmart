var express = require("express");
var router = express.Router();
var middleware = require("../middleware/authentication");
var dataValidation = require("../data_validation/validation");
var Device = require("../model/device");

router.post('/addDevice', [middleware.validateToken, middleware.checkForUniqueChip], async (req, res) => {
    let body = req.body;
    let result = await dataValidation.validateDeviceData(req.checkBody, req.validationErrors, body);
    if (result instanceof Error) {
        res.status(400).json(result.message);
    } else {
        let newDevice = new Device({ chip_id: result.chip_id, user_id: req.id, meta: body.meta });
        newDevice.save((err, device) => {
            if (err) {
                res.status(500).json("mongodb internel problem while adding the new device");
            } else {
                res.status(200).json(device);
            }
        });
    }
});

router.put("/updateDevice", [middleware.validateToken, middleware.checkChipId], (req, res) => {
    let body = req.body;
    Device.findByIdAndUpdate(req.documentID, { $set: { user_id: req.owner_id, meta: body.meta } }, { new: true }, (err, obj) => {
        if (err) {
            res.status(500).json("mongodb internel problem while updating the device");
        } else {
            res.status(200).json(obj);
        }
    });
});

router.delete("/deleteDevice", middleware.validateToken, (req, res) => {
    let body = req.body;
    Device.findOneAndDelete({ chip_id: body.chip_id, user_id: req.id }, (err, obj) => {
        if (err) {
            res.status(500).json("mongodb internel problem while deleting the device");
        } else {
            if (obj != null) {
                res.status(200).json(obj);
            } else {
                res.status(400).json("you can not delete the device because the chip id and user id doest not matched");
            }
        }
    })
});

router.get("/listDevice", middleware.validateToken, (req, res) => {
    Device.find({ user_id: req.id }, (err, obj) => {
        if (err) {
            res.status(500).json("mongodb internel problem while retrieving the device");
        } else {
            res.status(200).json(obj);
        }
    })
})

module.exports = router;