var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
    chip_id: { type: String, require: true, trim: true },
    user_id: { type: String, require: true, trim: true },
    meta: {
        name: { type: String, default: "null" },
        version: { type: String, default: "null" }
    },
}, {
    timestamps: true
});


module.exports = mongoose.model("Device", deviceSchema);