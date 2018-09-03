async function validateDeviceData(checkBody, validationErrors, body) {
    checkBody('chip_id').notEmpty().withMessage("required chip id");
    let errors = validationErrors();
    if (errors) {
        return new Error("error : please provide chip id of the device");
    } else {
        return body;
    }
}

async function validateUserRegisterData(checkBody, validationErrors, body) {
    checkBody('name').notEmpty().withMessage("please provide name");
    checkBody("email").notEmpty().withMessage("please provide email id").isEmail().withMessage("please provide valid form of email");
    checkBody("password").notEmpty().withMessage("please provide password");
    let errors = validationErrors();
    if (errors) {
        let msg = "";
        errors.forEach((error, ) => {
            msg = msg + error.msg + " ";
        });
        return new Error(msg);
    } else {
        return body;
    }
}

async function validateLoginData(checkBody, validationErrors, body) {
    checkBody('email').notEmpty().withMessage("please provide email").isEmail().withMessage("please provide valid form of email");
    checkBody("password").notEmpty().withMessage("please provide password");
    let errors = validationErrors();
    if (errors) {
        let msg = "";
        errors.forEach((error, ) => {
            msg = msg + error.msg + " ";
        });
        return new Error(msg);
    } else {
        return body;
    }
}

module.exports = {
    validateDeviceData: validateDeviceData,
    validateUserRegisterData: validateUserRegisterData,
    validateLoginData: validateLoginData
}