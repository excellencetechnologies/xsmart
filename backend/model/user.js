var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/chat');

const userSchema = new Schema({
    name: String,
    email: {type:String, unique:true},
    password: String,
    verified: { type: Boolean, default: true },
    social_type: { type: String, default: "app" },
    social_id: { type: String, default: "null" },
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);