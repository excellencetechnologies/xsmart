var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
    chip: { type: String, require: true, trim: true ,unique:true},
    user_id: { type: String, require: true, trim: true },
    meta: { type: Schema.Types.Mixed },
}, {
    timestamps: true
});


module.exports = mongoose.model("Device", deviceSchema);