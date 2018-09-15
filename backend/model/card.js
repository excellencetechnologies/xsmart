var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cardSchema = new Schema({
    chip_id: { type: String, require: true, trim: true ,unique:true},
    card_id: { type: String, require: true, trim: true },
    meta: { type: Schema.Types.Mixed },
}, {
    timestamps: true
});


module.exports = mongoose.model("Card", cardSchema);