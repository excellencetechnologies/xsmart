var express = require("express");
var router = express.Router();
var middleware = require("../middleware/authentication");
var dataValidation = require("../data_validation/validation");
var Device = require("../model/device");


router.post('/addDevice', [middleware.validateToken, middleware.checkForRepeatAction], async(req, res) => {
    let body = req.body;
    body.user_id = req.id;
    let result = await dataValidation.validateDeviceData(req.checkBody, req.validationErrors, body)

    let newDevice = new Device(result);

    newDevice.save((err, device) => {
        if (err) {
            res.status(500).json({ error: 1, message: "error during saving the device" });
        } else {
            res.status(200).json({ status: 1, message: "successfully inserted device", device: device });
        }
    })

});

router.put("/updateDevice", [middleware.validateToken, middleware.checkChipId], (req, res) => {
    Device.findByIdAndUpdate(req.documentID, { $set: { user_id: req.body.owner_id } }, { new: true }, (err, obj) => {
        if (err) {
            res.status(500).json({ error: 1, message: "error during updating the user id of device" });
        } else {
            res.status(200).json({ status: 1, message: "updated successfully", data: obj });
        }
    });
})


router.delete("/deleteDevice", middleware.validateToken, (req, res) => {
    Device.findOneAndDelete({ chip_id: req.body.chip_id, user_id: req.id }, (err, obj) => {
        if (err) {
            res.status(500).json({ error: 1, message: "error during deleting the device" });
        } else {
            if (obj != null) {
                res.status(200).json({ message: "successfully deleted", data: obj });
            } else {
                res.status(400).json({ error: 1, message: "this chip id is not exist" });
            }
        }
    })
})

module.exports = router;