async function validateDeviceData(checkBody, validationErrors, body) {
    try{

    checkBody('chip_id').notEmpty().withMessage("required city");
    checkBody('user_id').notEmpty()
    
    let errors = validationErrors();
     
        return body
         
    }catch(err)
    {
        res.status(400).json({error:1,message:"error during validating the data"});
    }
}


module.exports.validateDeviceData = validateDeviceData;