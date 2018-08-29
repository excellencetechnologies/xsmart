var express = require("express");
var router = express.Router();
var middleware = require("../middleware/authentication");
var dataValidation = require("../data_validation/validation");
var Device = require("../model/device");

router.post('/addDevice', [middleware.validateToken, middleware.checkForUniqueChip], async (req, res) => {
    let result = await dataValidation.validateDeviceData(req.checkBody, req.validationErrors, req.body);
    if (result instanceof Error) {
        res.status(400).json({ error: 1, message: "error during validating the device data" });
    } else {
        let newDevice = new Device({ chip_id: result.chip_id, user_id: req.id, meta: req.body.meta });
        newDevice.save((err, device) => {
            if (err) {
                res.status(500).json({ error: 1, message: "mongodb internel problem while adding the new device" });
            } else {
                res.status(200).json({ status: 1, message: "successfully inserted device", device: device });
            }
        });
    }
});

router.put("/updateDevice", [middleware.validateToken, middleware.checkChipId], (req, res) => {
    Device.findByIdAndUpdate(req.documentID, { $set: { user_id: req.body.owner_id, meta: req.body.meta } }, { new: true }, (err, obj) => {
        if (err) {
            res.status(500).json({ error: 1, message: "mongodb internel problem while updating the device" });
        } else {
            res.status(200).json({ status: 1, message: "updated successfully", data: obj });
        }
    });
});

router.delete("/deleteDevice", middleware.validateToken, (req, res) => {
    Device.findOneAndDelete({ chip_id: req.body.chip_id, user_id: req.id }, (err, obj) => {
        if (err) {
            res.status(500).json({ error: 1, message: "mongodb internel problem while deleting the device" });
        } else {
            if (obj != null) {
                res.status(200).json({ message: "successfully deleted", data: obj });
            } else {
                res.status(400).json({ error: 1, message: "you can not delete the device because the chip id and user id doest not matched" });
            }
        }
    })
});

router.get("/listDevice/:userID", (req, res) => {
    Device.find({ user_id: req.params.userID }, (err, obj) => {
        if (err) {
            res.status(500).json({ error: 1, message: "mongodb internel problem while retrieving the device" });
        } else {
            res.status(200).json({ status: 1, devices: obj });
        }
    })
})

module.exports = router;