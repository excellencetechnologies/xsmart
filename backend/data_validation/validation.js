async function validateDeviceData(checkBody, validationErrors, body) {
    checkBody('chip_id').notEmpty().withMessage("required chip id");
    let errors = validationErrors();
    if (errors) {
        return new Error("error : please provide chip id of the device");
    } else {
        return body;
    }

}

module.exports.validateDeviceData = validateDeviceData;