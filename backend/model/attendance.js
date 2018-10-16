var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var attendanceSchema = new Schema({
    chip: { type: String, require: true, trim: true },
    emp_id: { type: String, require: true, trim: true },
    time: { type: String, require: true, default: Date.now },
    meta: { type: Schema.Types.Mixed },
}, {
    timestamps: true
});


module.exports = mongoose.model("Attendance", attendanceSchema);